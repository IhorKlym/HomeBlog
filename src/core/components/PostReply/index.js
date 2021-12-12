// @flow

import React, { useState, useRef, useLayoutEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import Button from 'components/Button';
import Gallery from 'components/Gallery';
import TextFormatted from 'components/TextFormatted';
import ShareInSystem from 'components/ShareInSystem';
import DirectMessageButton from 'components/DirectMessageButton';
import NewReplyField from 'components/NewReplyField';
import { formatTimeToLocal, getConnectionLevel, getUserName, redirectToUser } from 'helpers/methods';
import useWindowSize from 'hooks/windowSize';
import { findTheme } from 'helpers/skins';
import type { Reply } from 'helpers/types';
import { IconChat, IconTrash, IconEditProf } from 'styles/icons';
import stores from 'core/stores';

import * as S from './styles';

type Props = {
  reply: Reply,
  post: any,
  reposted?: boolean,
  theme?: any,
  themeUser?: boolean,
  attachmentCard?: boolean,
  handleDeleteReply?: any,
  handleEditReply?: any
}

const PostReply = ({ reposted, reply, post, theme, themeUser, attachmentCard, handleDeleteReply, handleEditReply }: Props) => {
  const { sessionStore: { currentUser } } = stores;
  const history = useHistory();
  const { user, photos = [], videos = [], isMy } = reply;
  const album = [...photos, ...videos];
  const userDegree = getConnectionLevel(user);
  const DegreeIcon = userDegree.icon;
  const isCurrentUser = isMy || (user && `${user.id}` === `${(currentUser || {}).id}`);
  const windowSize = useWindowSize();
  const contentRef = useRef();
  const [hasExtraContent, setHasExtraContent] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const themeId = (user && user.skin && user.skin.id) || null;
  const currentTheme = findTheme(themeId || null);

  const handleEdit = async (edited: any) => {
    if (handleEditReply) await handleEditReply(edited);
    setEditMode(false);
  };

  useLayoutEffect(() => {
    const contentEl = (contentRef.current && (contentRef.current.children || [])[0]) || null;
    if (contentEl) {
      setTimeout(() => {
        const { height } = contentEl.getBoundingClientRect();
        const nowHasExtraContent = height > 60;
        if (hasExtraContent !== nowHasExtraContent) setHasExtraContent(nowHasExtraContent);
      }, 0);
    }
  }, [contentRef.current, windowSize.width]);

  return (
    <S.Reply attachmentCard={attachmentCard} themeUser={themeUser} theme={themeUser ? currentTheme : theme} onClick={e => e.stopPropagation()}>
      <S.Head>
        <S.Avatar onClick={e => { e.stopPropagation(); redirectToUser(history, user); }} rounded user={user} />

        {!editMode && <>
          <S.HeadItem>
            <S.Author onClick={e => { e.stopPropagation(); redirectToUser(history, user); }} hasHover={user}>
              {getUserName(user)} {!isCurrentUser && <DegreeIcon />}
            </S.Author>

            <S.Date>{reply.createdAt ? formatTimeToLocal(reply.createdAt) : ''}</S.Date>
          </S.HeadItem>

          <S.HeadItem>
            {!reposted && <S.Actions onClick={e => { e.stopPropagation(); }}>

              <ShareInSystem share repost={!isCurrentUser} data={{ post, reply }} />

              {isCurrentUser ?
                <>
                  {!!handleEditReply && <S.ActionButton onClick={() => setEditMode(true)}>
                    <IconEditProf />
                  </S.ActionButton>}

                  {!!handleDeleteReply && <S.ActionButton onClick={() => handleDeleteReply(reply)}>
                    <IconTrash />
                  </S.ActionButton>}
                </>
                :
                <>
                  {!!user && <S.ActionButton>
                    <DirectMessageButton user={user}>
                      <IconChat />
                    </DirectMessageButton>
                  </S.ActionButton>}
                </>}
            </S.Actions>}
          </S.HeadItem>
        </>}
      </S.Head>

      {!editMode ?
        <>
          <S.Text ref={contentRef} shrinked={!showFullContent}>
            <TextFormatted highlight={['hashtags', 'mentions']} text={reply.content} />
          </S.Text>

          {hasExtraContent &&
            <S.ReadMoreBtnWrap open={showFullContent}>
              <Button text onClick={(e) => { e.stopPropagation(); setShowFullContent(!showFullContent); }}>
                {showFullContent ? 'Show less' : 'Read more'}
              </Button>
            </S.ReadMoreBtnWrap>}

          {!!album.length && (
            <S.MainImg>
              <Gallery album={album} />
            </S.MainImg>
          )}
        </>
        :
        <NewReplyField
          size={40}
          editReply={{ reply, post }}
          highlight={['hashtags', 'mentions']}
          placeholder="Write a response..."
          onCancelEdit={() => setEditMode(false)}
          onReply={handleEdit}
        />}
    </S.Reply>
  );
};

PostReply.defaultProps = {
  reposted: false,
  themeUser: false,
  theme: null,
  attachmentCard: false,
  handleEditReply: null,
  handleDeleteReply: null
};

export default observer(PostReply);
