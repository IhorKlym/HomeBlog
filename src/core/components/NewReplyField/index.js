// @flow

import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import RoundedButton from 'components/RoundedButton';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import FileUploader from 'components/FileUploader';
import { IconVideo, IconPhoto } from 'styles/icons';
import { generateUUID, hasSomeParentTheClass } from 'helpers/methods';
import { PROFILE_VISIBILITIES } from 'helpers/consts';
import stores from 'core/stores';
import useWindowSize from 'hooks/windowSize';

import Store from './store';
import * as S from './styles';

type Props = {
  onReply: (reply: any) => any,
  big?: boolean,
  editReply?: any,
  onCancelEdit?: () => any
};

const NewReplyField = (props: Props) => {
  const { current: store } = useRef(new Store());
  const fieldId = useRef(`new-reply_${generateUUID()}`);
  const { sessionStore: { currentUser } } = stores;
  const { onReply, big, editReply, onCancelEdit, ...otherProps } = props;
  const [expanded, setExpanded] = useState(false);
  const editMode = !!editReply;
  const { reply, uploadingFiles, deletedMedia } = store;
  const { content, visibility, authorVisibility, photos = [], videos = [] } = reply;
  const album = [...photos, ...videos];
  const contentRef = useRef('');
  const contentTextRef = useRef('');
  const formSubmittedRef = useRef(false);
  const profileVisibilitiesOptions = PROFILE_VISIBILITIES.map(opt => ({ value: opt.value, label: opt.visibleFor }));
  const windowSize = useWindowSize();

  const handleChangeNewReply = (html: any, pureText: any) => {
    contentRef.current = html;
    contentTextRef.current = pureText;
    store.handleChangeOption({ name: 'content', value: html });
    store.handleChangeOption({ name: 'contentText', value: pureText });
  };

  const adjustVisibilityToUserProfile = () => {
    if (currentUser && currentUser.visibility) {
      store.setDefaultVisibility(currentUser.visibility);
      store.handleChangeOption({ name: 'visibility', value: currentUser.visibility });
    }
  };

  const handleUploadImages = (e) => {
    const { files } = e.target;
    store.uploadFiles(files, 'image');
    e.target.value = null;
  };

  const handleUploadVideos = (e) => {
    const { files } = e.target;
    store.uploadFiles(files, 'video');
    e.target.value = null;
  };

  const renderFileUploaders = () => (
    <S.ButtonWrap>
      <S.UploadFile>
        <Button file>
          <label htmlFor="createPostImgUpload">
            <IconPhoto />
            <input multiple
              type="file"
              accept="image/*"
              id="createPostImgUpload"
              onChange={handleUploadImages}
            />
          </label>
        </Button>

        <Button file>
          <label htmlFor="createPostVideoUpload">
            <IconVideo />
            <input multiple
              type="file"
              accept="video/*"
              id="createPostVideoUpload"
              onChange={handleUploadVideos}
            />
          </label>
        </Button>
      </S.UploadFile>
    </S.ButtonWrap>
  );

  const handleReply = async () => {
    const currentReply = store.getCurrentReplyData();
    const replyContent = contentRef.current || currentReply.content || '';
    const replyContentText = contentTextRef.current || currentReply.contentText || '';
    if (formSubmittedRef.current || !(replyContentText && replyContentText.trim())) return;
    formSubmittedRef.current = true;
    if (onReply) await onReply({ ...currentReply, content: replyContent });
    store.setReplyData(null);
    setExpanded(false);
    handleChangeNewReply('');
    formSubmittedRef.current = false;
  };

  const handleReplyKeyDown = e => {
    setExpanded(true);
    if (e.nativeEvent.key === 'Enter') {
      e.nativeEvent.preventDefault();
      handleReply();
    }
  };

  const handleFocus = (ev: any) => {
    ev.stopPropagation();
    setExpanded(true);
  };

  const handleBlur = (ev: any) => {
    const { target = {} } = ev;
    if (hasSomeParentTheClass(target, fieldId.current) || hasSomeParentTheClass(target, 'select__menu-list')) return;
    setExpanded(false);
  };

  const handleCancel = (ev: any) => {
    ev.stopPropagation();
    setExpanded(false);
    if (onCancelEdit) onCancelEdit();
  };

  useEffect(() => {
    adjustVisibilityToUserProfile();
  }, [currentUser]);

  useEffect(() => {
    store.setReplyData((editReply && editReply.reply) || null);
  }, [editReply]);

  useEffect(() => {
    document.addEventListener('click', handleBlur);
    return () => document.removeEventListener('click', handleBlur);
  }, []);

  return (
    <S.Wrap
      className={`${fieldId.current} response-wrap`}
      borderRad={big || expanded || editMode}
      expanded={expanded || editMode}
      onClick={handleFocus}
    >
      <S.TextFieldFormatted
        {...otherProps}
        value={content}
        onChange={handleChangeNewReply}
        onKeyDown={handleReplyKeyDown}
        big={big || expanded || editMode}
      />

      {(windowSize.width < 768) && (expanded || editMode) && renderFileUploaders()}

      {(expanded || editMode) && <>

        <S.Settings className='settings-wrap'>

          {(!!uploadingFiles.length || !!album.length) &&
            <S.UploadingFiles>
              {album.filter(media => !deletedMedia.includes(media)).map((media) => {
                const isVideo = media.type === 'videos';
                return (
                  <FileUploader
                    key={media.id}
                    backdrop={false}
                    file={{
                      ...media,
                      uploaded: true,
                      fileType: !isVideo ? 'image' : 'video',
                      src: !isVideo ? media.url : media.videoUrl
                    }}
                    onDelete={() => store.handleDeleteMedia(media)}
                  />
                );
              })}
              {uploadingFiles.map((file) => (
                <FileUploader key={file.id}
                  backdrop
                  file={file}
                  onSuccessUpload={result => store.handleFileUploaded(file.id, result)}
                  onDelete={() => store.handleDeleteFile(file.id)}
                />
              ))}
            </S.UploadingFiles>}

          {(windowSize.width > 768) && renderFileUploaders()}

          <S.Select
            label="Who can see my response:"
            primary
            fulltext
            isSearchable={false}
            name="visibility"
            placeholder="Visibility"
            options={profileVisibilitiesOptions}
            value={visibility ? profileVisibilitiesOptions.find(t => t.value === visibility) : ''}
            onChange={item => store.handleChangeOption({ name: 'visibility', value: item.value })}
          />

          <Checkbox
            name="type"
            title="Post Anonymously"
            checked={authorVisibility === 'anonymous'}
            onChange={() => store.handleChangeOption({ name: 'authorVisibility', value: authorVisibility === 'public' ? 'anonymous' : 'public' })}
          />

        </S.Settings>

        <S.Controls>
          <S.PostButton>
            <RoundedButton secondary xs onClick={handleCancel}>
              Cancel
            </RoundedButton>
          </S.PostButton>

          <S.PostButton>
            <RoundedButton primary xs onClick={handleReply}>
              {editMode ? 'Save' : 'Send'}
            </RoundedButton>
          </S.PostButton>
        </S.Controls>
      </>}
    </S.Wrap>
  );
};

NewReplyField.defaultProps = {
  big: false,
  editReply: null,
  onCancelEdit: () => { }
};

export default observer(NewReplyField);
