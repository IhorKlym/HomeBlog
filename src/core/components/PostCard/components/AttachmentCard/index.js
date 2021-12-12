// @flow

import React, { useState, useLayoutEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import TextFormatted from 'components/TextFormatted';
import PostReply from 'components/PostReply';
import Gallery from 'components/Gallery';
import Button from 'components/Button';
import Preloader from 'components/Preloader';
import { formatTimeToLocal, getUserName, getConnectionLevel, redirectToUser } from 'helpers/methods';
import { findTheme } from 'helpers/skins';
import stores from 'core/stores';
import type { Post } from 'helpers/types';
import useWindowSize from 'hooks/windowSize';

import store from '../../store';
import * as S from './styles';

type Props = {
  post: Post,
  theme?: any,
  background?: any,
  onGalleryLoaded?: any,
  onDelete?: any
}

const PostAttachmentCard = ({ post, theme: providedTheme, background, onGalleryLoaded, onDelete, ...restProps }: Props) => {
  const { id, content, createdAt, photos = [], videos = [], user, replies = [], authorVisibility, isMy } = post;
  const { sessionStore: { currentUser } } = stores;
  const { loadingMap } = store;
  const loading = Boolean(loadingMap[id]);
  const isCurrentUserPost = isMy || (user && `${user.id}` === `${(currentUser || {}).id}`);
  const history = useHistory();
  const album = [...photos, ...videos];
  const theme = providedTheme || (user && user.skin && user.skin.id ) || null;
  const currentTheme = findTheme(theme || null);
  const isDeleted = user && user.profileType === 'system';
  const isAnonymousPost = authorVisibility === 'anonymous';
  const [hasExtraContent, setHasExtraContent] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const contentRef = useRef();

  const windowSize = useWindowSize();
  const mobileDevice = windowSize.width < 768;

  const userDegree = getConnectionLevel(user);
  const DegreeIcon = userDegree.icon;

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
    <S.Wrap {...restProps} theme={theme}>
      <S.Content
        background={background || currentTheme.bgColor}
        onClick={() => history.push(`/posts/${id}`)}
      >
        {!isDeleted ? 
          <>
            <S.Main>
              <S.Head>
                <S.Avatar rounded user={user} />

                <S.HeadItem>
                  <S.Author onClick={e => { e.stopPropagation(); redirectToUser(history, user); }}>
                    {(!isAnonymousPost && !user) ? 'Someone asked' : getUserName(user)}  {!isCurrentUserPost && <DegreeIcon />}
                  </S.Author>

                  <S.Date>{createdAt ? formatTimeToLocal(createdAt) : ''}</S.Date>
                </S.HeadItem>
              </S.Head>

              <S.MainContent>
                <S.MainItem>
                  <S.Text ref={contentRef} shrinked={!showFullContent}>
                    <TextFormatted highlight={['hashtags', 'mentions']} text={content} />
                  </S.Text>
                  {hasExtraContent &&
                    <S.ReadMoreBtnWrap open={showFullContent}>
                      <Button text onClick={(e) => { e.stopPropagation(); setShowFullContent(!showFullContent); }}>
                        {showFullContent ? 'Show less' : 'Read more'}
                      </Button>
                    </S.ReadMoreBtnWrap>}

                  {!!album.length && mobileDevice ? (
                    <S.MainImg>
                      <Gallery album={album} />
                    </S.MainImg>
                  ) : null}
                </S.MainItem>

                {!!album.length && !mobileDevice ? (
                  <S.MainImg>
                    <Gallery album={album} onPreviewLoaded={onGalleryLoaded} />
                  </S.MainImg>
                ) : null}
              </S.MainContent>
            </S.Main>

            <S.WrapPostReply>
              {replies.map(reply => (
                <PostReply
                  attachmentCard
                  key={reply.id}
                  post={post}
                  reply={reply}
                  theme={theme}
                />
              ))}
            </S.WrapPostReply>
          </>
          :
          <S.DeletedInfo>
            Original Post was deleted by author.
          </S.DeletedInfo>}
      </S.Content>

      {!!onDelete && <S.DeleteBtn text transparent onClick={onDelete}>
        х
      </S.DeleteBtn>}

      {loading && <Preloader position="absolute" backdrop />}
    </S.Wrap>
  );
};

PostAttachmentCard.defaultProps = {
  theme: null,
  background: null,
  onGalleryLoaded: null,
  onDelete: null
};

export default observer(PostAttachmentCard);
