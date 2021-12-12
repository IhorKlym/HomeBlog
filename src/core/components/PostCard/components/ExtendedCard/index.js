// @flow

import React, { useState, useRef, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { IconChat, IconTrash, IconEditProf } from 'styles/icons';
import TextFormatted from 'components/TextFormatted';
import PostReply from 'components/PostReply';
import TagList from 'components/TagList';
import Gallery from 'components/Gallery';
import Button from 'components/Button';
import Preloader from 'components/Preloader';
import ShareInSystem from 'components/ShareInSystem';
import DirectMessageButton from 'components/DirectMessageButton';
import NewReplyField from 'components/NewReplyField';
import ConfirmModal from 'components/ConfirmModal';
import { formatTimeToLocal, getUserName, getConnectionLevel, redirectToUser, hasSomeParentTheClass } from 'helpers/methods';
import { findTheme } from 'helpers/skins';
import stores from 'core/stores';
import type { Post } from 'helpers/types';
import useWindowSize from 'hooks/windowSize';

import store from '../../store';
import * as S from './styles';

type Props = {
  post: Post,
  reposted?: boolean,
  theme?: any,
  background?: any,
  onGalleryLoaded?: any,
  afterPostDeleted?: any
}

const PostExtendedCard = ({ reposted, post, theme: providedTheme, background, onGalleryLoaded, afterPostDeleted, ...restProps }: Props) => {
  const { id, content, createdAt, tagList, isFollowed, photos = [], videos = [], user, replies = [], repliesCount, repost, repostReply, authorVisibility, isMy } = post;
  const { dictionariesStore, sessionStore: { currentUser, isUserLoggedIn }, helperStore } = stores;
  const { loadingMap } = store;
  const loading = Boolean(loadingMap[id]);
  const isCurrentUserPost = isMy || (user && `${user.id}` === `${(currentUser || {}).id}`);
  const currentTags = dictionariesStore.tags.filter(tag => (tagList || []).includes(tag.name));
  const contentRef = useRef();
  const [hasExtraContent, setHasExtraContent] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [actionDropdownOpen, setActionDropdownOpen] = useState(false);
  const [confirmData, setConfirmData] = useState(null);
  const history = useHistory();
  const album = [...photos, ...videos];
  const theme = providedTheme || (user && user.skin && user.skin.id) || null;
  const currentTheme = findTheme(theme || null);
  const isAnonymousPost = authorVisibility === 'anonymous';

  const windowSize = useWindowSize();
  const mobileDevice = windowSize.width < 768;

  const userDegree = getConnectionLevel(user);
  const DegreeIcon = userDegree.icon;

  const checkRequireLogin = (e: ?any) => {
    if (e) e.stopPropagation();
    if (!isUserLoggedIn) {
      helperStore.setShowLoginModal(true);
      return true;
    }
  };

  const redirectToPost = (ev: any) => {
    ev.stopPropagation();
    if (hasSomeParentTheClass(ev.target, 'mention')) return;
    history.push(`/posts/${id}`);
  };

  const handleReplyToPost = async (reply: any) => {
    await store.replyToPost({ ...reply, post });
  };

  const handleFollowPost = () => {
    store.followPost({ post });
  };

  const handleLoadMoreReplies = e => {
    e.stopPropagation();
    store.loadMoreReplies({ post, limit: 5 });
  };

  const handleEditPost = () => {
    helperStore.setCreatePostOptions({ post });
  };

  const handleDeletePost = () => {
    setConfirmData({
      text: 'Are you sure you want to delete your post?',
      onCancel: () => setConfirmData(null),
      onConfirm: async () => {
        setConfirmData(null);
        await store.deletePost({ post });
        if (afterPostDeleted) afterPostDeleted(post);
      }
    });
  };

  const handleEditReply = async (reply: any) => {
    await store.editReply({ ...reply, post });
  };

  const handleDeleteReply = (reply: any) => {
    setConfirmData({
      text: 'Are you sure you want to delete your comment?',
      onCancel: () => setConfirmData(null),
      onConfirm: () => {
        setConfirmData(null);
        store.deleteReply({ post, reply });
      }
    });
  };

  useLayoutEffect(() => {
    const contentEl = (contentRef.current && (contentRef.current.children || [])[0]) || null;
    if (contentEl) {
      setTimeout(() => {
        const { height } = contentEl.getBoundingClientRect();
        const nowHasExtraContent = height > 150;
        if (hasExtraContent !== nowHasExtraContent) setHasExtraContent(nowHasExtraContent);
      }, 0);
    }
  }, [contentRef.current, windowSize.width]);

  return (
    <S.Wrap {...restProps} theme={theme} onClick={checkRequireLogin} actionsDisabled={!isUserLoggedIn}>
      <S.Content
        background={background || currentTheme.bgColor}
        onClick={redirectToPost}
      >
        <S.Main>
          <S.Head>
            <S.Avatar rounded user={user} />

            <S.HeadItem>
              <S.Author onClick={e => { e.stopPropagation(); redirectToUser(history, user); }} hasHover={user}>
                {(!isAnonymousPost && !user) ? 'Someone asked' : getUserName(user)} {!isCurrentUserPost && <DegreeIcon />}
              </S.Author>

              <S.Date>{createdAt ? formatTimeToLocal(createdAt) : ''}</S.Date>
            </S.HeadItem>

            <S.HeadItem>
              {(isUserLoggedIn && !reposted) && <S.Actions onClick={e => { e.stopPropagation(); }}>
                {mobileDevice ? (
                  <S.ActionsDropdown isOpen={actionDropdownOpen}>
                    <S.ActionsButton onClick={e => { e.stopPropagation(); setActionDropdownOpen(!actionDropdownOpen); }}>
                      <span />
                      <span />
                      <span />
                    </S.ActionsButton>

                    <S.ActionsContent>
                      {!isCurrentUserPost &&
                        <S.ActionsControl onClick={handleFollowPost}>
                          <span>{isFollowed ? 'Unfollow post' : 'Follow post'}</span>
                        </S.ActionsControl>}

                      <S.ActionsControlMobile>
                        <ShareInSystem mobile share repost={!isCurrentUserPost} data={{ post }} />
                      </S.ActionsControlMobile>

                      {!isCurrentUserPost &&
                        <S.ActionsControl>
                          <DirectMessageButton color user={user}>
                            Message
                          </DirectMessageButton>
                        </S.ActionsControl>}

                      {isCurrentUserPost &&
                        <S.ActionsControl onClick={handleEditPost}>
                          <S.ActionsControlText>
                            Edit Post
                          </S.ActionsControlText>
                        </S.ActionsControl>}

                      {isCurrentUserPost &&
                        <S.ActionsControl onClick={handleDeletePost}>
                          <S.ActionsControlText>
                            Delete Post
                          </S.ActionsControlText>
                        </S.ActionsControl>}

                    </S.ActionsContent>
                  </S.ActionsDropdown>
                ) : (
                  <>
                    <S.ActionsControl>
                      <ShareInSystem share repost={!isCurrentUserPost} data={{ post }} />
                    </S.ActionsControl>

                    {!isCurrentUserPost ?
                      <>
                        {!!user && <S.ActionsControl>
                          <DirectMessageButton user={user}>
                            <IconChat />
                          </DirectMessageButton>
                        </S.ActionsControl>}

                        <S.ActionsControl onClick={handleFollowPost}>
                          {isFollowed ? 'Unfollow post' : 'Follow post'}
                        </S.ActionsControl>
                      </>
                      :
                      <>
                        <S.ActionsControl onClick={handleEditPost}>
                          <IconEditProf />
                        </S.ActionsControl>

                        <S.ActionsControl onClick={handleDeletePost}>
                          <IconTrash />
                        </S.ActionsControl>
                      </>}
                  </>
                )}
              </S.Actions>}
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

              {!reposted && <TagList allowOverflow isLinks tags={currentTags} onClick={e => { e.stopPropagation(); }} />}
            </S.MainItem>

            {!!album.length && !mobileDevice ? (
              <S.MainImg>
                <Gallery album={album} onPreviewLoaded={onGalleryLoaded} />
              </S.MainImg>
            ) : null}
          </S.MainContent>

          {!!repost && <S.RepostRow>
            <PostExtendedCard
              reposted
              post={{ ...repost, replies: repostReply ? [repostReply] : [] }}
              theme={(repost.user && repost.user.skin && repost.user.skin.id) || null}
            />
          </S.RepostRow>}
        </S.Main>

        <S.WrapPostReply>
          {replies.map(reply => (
            <PostReply
              key={reply.id}
              post={post}
              reply={reply}
              reposted={reposted}
              theme={theme}
              handleEditReply={handleEditReply}
              handleDeleteReply={handleDeleteReply}
            />
          ))}
        </S.WrapPostReply>

        {!reposted && repliesCount > replies.length && (
          <S.MoreRepliesBtn theme={theme}>
            <Button xss transparent onClick={handleLoadMoreReplies}>
              View {repliesCount - replies.length} more responses
            </Button>
          </S.MoreRepliesBtn>
        )}

        {(isUserLoggedIn && !reposted) && <S.Footer>
          {!replies.length && <S.TextWrap>This user is looking for advice, write a response to help them out!</S.TextWrap>}
          <NewReplyField
            big={!replies.length}
            size={40}
            highlight={['hashtags', 'mentions']}
            placeholder="Write a response..."
            onReply={handleReplyToPost}
          />
        </S.Footer>}
      </S.Content>

      {loading && <Preloader position="absolute" backdrop />}

      <ConfirmModal data={confirmData} />
    </S.Wrap>
  );
};

PostExtendedCard.defaultProps = {
  reposted: false,
  theme: null,
  background: null,
  onGalleryLoaded: null,
  afterPostDeleted: null
};

export default observer(PostExtendedCard);
