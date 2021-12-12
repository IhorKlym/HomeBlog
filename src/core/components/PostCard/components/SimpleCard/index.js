// @flow

import React, { useState, useRef, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import TextFormatted from 'components/TextFormatted';
import Gallery from 'components/Gallery';
import Button from 'components/Button';
import RoundedButton from 'components/RoundedButton';
import Preloader from 'components/Preloader';
import { getUserName, redirectToUser, hasSomeParentTheClass } from 'helpers/methods';
import { findTheme } from 'helpers/skins';
import type { Post } from 'helpers/types';

import store from '../../store';
import * as S from './styles';

type Props = {
  post: Post,
  theme?: any,
  background?: any,
  onGalleryLoaded?: any,
  beforeRedirectAction?: any
}

const PostSimpleCard = ({ post, theme: providedTheme, background, onGalleryLoaded, beforeRedirectAction, ...restProps }: Props) => {
  const { id, content, isFollowed, photos, videos, user, repliesCount, authorVisibility } = post;
  const { loadingMap } = store;
  const loading = Boolean(loadingMap[id]);
  const history = useHistory();
  const contentRef = useRef();
  const [hasExtraContent, setHasExtraContent] = useState(false);
  const album = [...photos, ...videos];
  const theme = providedTheme || (user && user.skin && user.skin.id) || null;
  const currentTheme = findTheme(theme || null);
  const isAnonymousPost = authorVisibility === 'anonymous';

  const redirectToAuthor = (ev: any) => {
    ev.stopPropagation();
    if (beforeRedirectAction) beforeRedirectAction();
    redirectToUser(history, user);
  };

  const redirectToPost = (ev: any) => {
    if (beforeRedirectAction) beforeRedirectAction();
    if (hasSomeParentTheClass(ev.target, 'mention')) return;
    history.push(`/posts/${id}`);
  };

  const handleFollowPost = (ev: any) => {
    ev.stopPropagation();
    store.followPost({ post });
  };

  useLayoutEffect(() => {
    const contentEl = (contentRef.current && (contentRef.current.children || [])[0]) || null;
    if (contentEl) {
      setTimeout(() => {
        const { height } = contentEl.getBoundingClientRect();
        const nowHasExtraContent = height > 120;
        if (hasExtraContent !== nowHasExtraContent) setHasExtraContent(nowHasExtraContent);
      }, 0);
    }
  }, [contentRef.current]);

  return (
    <S.Wrap {...restProps} theme={theme}>
      <S.Content
        background={background || currentTheme.bgColor}
        onClick={redirectToPost}
      >
        <S.Avatar rounded user={user} />

        <S.Author onClick={redirectToAuthor} hasHover={user}>
          {(!isAnonymousPost && !user) ? 'Someone asked' : getUserName(user)}
        </S.Author>

        <S.FollowButton>
          <Button xs transparent text onClick={handleFollowPost}>
            {isFollowed ? 'Unfollow' : 'Follow'}
          </Button>
        </S.FollowButton>

        <S.Text ref={contentRef}>
          <TextFormatted highlight={['hashtags', 'mentions']} text={content} />
        </S.Text>
        {hasExtraContent &&
        <S.ReadMoreBtnWrap>
          <Button text>
            Read more
          </Button>
        </S.ReadMoreBtnWrap>}

        {!!album.length &&
          <S.MainImg>
            <Gallery album={album} onPreviewLoaded={onGalleryLoaded} />
          </S.MainImg>}

        <RoundedButton xs transparent>
          {repliesCount ? `${repliesCount} Replies` : 'Reply'}
        </RoundedButton>
      </S.Content>

      {loading && <Preloader position="absolute" backdrop />}
    </S.Wrap>
  );
};

PostSimpleCard.defaultProps = {
  theme: null,
  background: null,
  onGalleryLoaded: null,
  beforeRedirectAction: null
};

export default observer(PostSimpleCard);
