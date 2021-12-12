// @flow

import React, { useEffect, useRef, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { observer } from 'mobx-react';
import Label from 'components/Label';
import Avatar from 'components/Avatar';
import { getUserName } from 'helpers/methods';
import stores from 'core/stores';

import ReactQuill, { Quill } from 'react-quill';
import QuillMention from 'quill-mention';
import 'react-quill/dist/quill.snow.css';

import * as S from './styles';

Quill.register('modules/mentions', QuillMention);

type Props = {
  value: string,
  onChange: (html: any, pureText: any) => any,
  onKeyDown?: any | (evt: any) => any,
  onKeyUp?: any | (evt: any) => any,
  placeholder?: string,
  label?: string,
  className?: string,
  error?: ?string,
  size?: any,
  big?: boolean
}

const TextFieldFormatted = (props: Props) => {
  const { label, className, error, placeholder, value, onChange, onKeyDown, onKeyUp, size, big, ...rest } = props;
  const { connectionsStore: { usersMentions } } = stores;
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const reactQuillRef = useRef(null);
  const mentionSuggestions = useRef([]);
  const keyPressedSelectMention = useRef(false);
  const shiftPressed = useRef(false);
  const hashtagSuggestion = useRef(null);
  const isHashtagMentionInserting = useRef(false);
  const wrapRef = useRef();

  const refreshComponent = () => {
    setLastRefresh(new Date());
  };

  const deleteKeyboardListeners = () => {
    if (!reactQuillRef.current) return;
    const editor = reactQuillRef.current.getEditor();
    const keyboardModule = editor.getModule('keyboard');
    keyboardModule.bindings[13].forEach(handler => {
      if (Object.prototype.hasOwnProperty.call(handler, 'shiftKey')) {
        handler.shiftKey = true;  // eslint-disable-line no-param-reassign
      }
    });
  };

  const getMentionsSource = (searchTerm, renderList, mentionChar) => {
    if (mentionChar === '#') {
      const hashtag = { id: searchTerm, mentionType: 'hashtags', denotationChar: mentionChar, value: searchTerm };
      renderList(searchTerm ? [hashtag] : []);
      if (searchTerm) {
        hashtagSuggestion.current = hashtag;
        refreshComponent();
      }
    } else {
      const matchedPeople = mentionSuggestions.current.filter(item => (
        item.value.toLowerCase().includes(searchTerm.toLowerCase())
      ));
      renderList(matchedPeople);
    }
  };

  const handleSelectMentions = (item, insertItem) => {
    if (item && item.denotationChar === '@') {
      keyPressedSelectMention.current = true;
      insertItem(item);
    }
  };

  const handleCloseMentionsList = () => {
    if (!hashtagSuggestion.current || !reactQuillRef.current) return;
    const { value: hashtag } = hashtagSuggestion.current;
    if (hashtag && hashtag.length > 1) {
      const editor = reactQuillRef.current.getEditor();
      const mentionModule = editor.getModule('mention');
      if (!isHashtagMentionInserting.current) {
        isHashtagMentionInserting.current = true;
        mentionModule.insertItem(hashtagSuggestion.current);
        setTimeout(() => { isHashtagMentionInserting.current = false; }, 10);
      }
    }
    hashtagSuggestion.current = null;
    refreshComponent();
  };

  const renderUserMentionItem = (item: any) => renderToString(
    <S.Suggestion>
      <S.SuggestionAvatar>
        <Avatar user={item} rounded cover />
      </S.SuggestionAvatar>
      <S.SuggestionText>
        {item.value}
      </S.SuggestionText>
    </S.Suggestion>
  );

  const renderHashtagMentionItem = (item: any) => renderToString(
    <S.Suggestion>
      <S.SuggestionText>
        #{item.value}
      </S.SuggestionText>
    </S.Suggestion>
  );

  const renderMentionItem = (item: any) => {
    if (item.mentionType === 'users') return renderUserMentionItem(item);
    return renderHashtagMentionItem(item);
  };

  const [defaultModules] = useState({
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
    mention: {
      allowedChars: /^[A-Za-z0-9ÅÄÖåäö]*$/,
      mentionDenotationChars: ['@', '#'],
      isolateCharacter: true,
      source: getMentionsSource,
      onSelect: handleSelectMentions,
      renderItem: renderMentionItem,
      onClose: handleCloseMentionsList
    }
  });
  const [defaultFormats] = useState(['bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'mention']);

  const handleScrollToActiveSuggestion = () => {
    if (!(reactQuillRef.current && reactQuillRef.current.editingArea)) return;
    const mentionsList = reactQuillRef.current.editingArea.querySelector('.ql-mention-list');
    if (mentionsList) {
      const itemHeight = (mentionsList.children[0] && mentionsList.children[0].clientHeight) || 0;
      const activeItemIdx = mentionsList.querySelector('.selected').getAttribute('data-index');
      mentionsList.scrollTop = Math.max(0, itemHeight * (activeItemIdx - 0.5));
    }
  };

  const handleKeyDown = (ev: any) => {
    const { key } = ev.nativeEvent;
    if (key === 'Shift') shiftPressed.current = true;
    if (key === 'Enter') {
      if (keyPressedSelectMention.current) {
        ev.nativeEvent.preventDefault();
        keyPressedSelectMention.current = false;
        return;
      }
      if (shiftPressed.current) return;
    }
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      handleScrollToActiveSuggestion();
    }
    keyPressedSelectMention.current = false;
    if (onKeyDown) onKeyDown(ev);
  };

  const handleKeyUp = (ev: any) => {
    const { key } = ev.nativeEvent;
    if (key === 'Shift') shiftPressed.current = false;
    if (onKeyUp) onKeyUp(ev);
  };

  const handleChange = (newValue: any, delta: any, source: any, editor: any) => {
    let text = editor.getText();
    if (newValue && newValue.includes('class="mention"')) text += ' __HAS_MENTION__';
    onChange(newValue, text);
  };

  const handlePaste = (ev: any) => {
    const paste = (ev.clipboardData || window.clipboardData).getData('text/plain');
    const selection = window.getSelection();
    if (!selection.rangeCount) return false;
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(paste));
    ev.preventDefault();
  };

  useEffect(() => {
    mentionSuggestions.current = usersMentions.map(item => ({ ...item, mentionType: 'users', value: getUserName(item) }));
  }, [usersMentions.length]);

  useEffect(() => {
    if (wrapRef.current) wrapRef.current.addEventListener('paste', handlePaste);
    return () => {
      if (wrapRef.current) wrapRef.current.removeEventListener('paste', handlePaste);
    };
  }, [wrapRef.current]);

  useEffect(() => {
    if (placeholder && reactQuillRef.current) {
      reactQuillRef.current.editor.root.dataset.placeholder = placeholder;
    }
  }, [placeholder]);

  useEffect(() => {
    deleteKeyboardListeners();
  }, [reactQuillRef.current]);

  return (
    <S.Wrap ref={wrapRef}
      className={className}
      size={size}
      hideSuggestionList={!!hashtagSuggestion.current}
      data-last-refresh={lastRefresh}
    >
      {label && <Label>{label}</Label>}

      <ReactQuill {...rest}
        ref={reactQuillRef}
        className='quill-editor'
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        modules={defaultModules}
        formats={defaultFormats}
        placeholder={placeholder}
      />

      {error && <S.Error>{error}</S.Error>}
    </S.Wrap>
  );
};

TextFieldFormatted.defaultProps = {
  placeholder: '',
  label: '',
  className: '',
  error: '',
  size: '',
  big: false,
  onKeyDown: null,
  onKeyUp: null
};

export default observer(TextFieldFormatted);
