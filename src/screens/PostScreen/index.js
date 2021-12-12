// @flow
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

import ScreenPage from 'components/ScreenPage';
import Gallery from 'components/Gallery';
import TextFormatted from 'components/TextFormatted';
import Preloader from 'components/Preloader';
import PostReply from 'components/PostReply';
import PostCard from 'components/PostCard';
import Button from 'components/Button';
import NewReplyField from 'components/NewReplyField';
import DirectMessageButton from 'components/DirectMessageButton';
import ConfirmModal from 'components/ConfirmModal';
import ShareInSystem from 'components/ShareInSystem';

import useWindowSize from 'hooks/windowSize';
import stores from 'core/stores';
import { IconBack, IconChat, IconTrash, IconEditProf } from 'styles/icons';
import { formatTimeToLocal, getUserName, redirectToUser, getConnectionLevel } from 'helpers/methods';
import { findTheme } from 'helpers/skins';

import store from './store';
import * as S from './styles';

const PostScreen = () => {
  const { followPost, post, loading, errors } = store;
  const { id, content, createdAt, tagList, isFollowed, photos, videos, user, replies = [], repliesCount, repost, repostReply, authorVisibility, isMy } = post;
  const { dictionariesStore, sessionStore: { currentUser }, helperStore } = stores;
  const showError = (!(post && post.id) && errors && errors[0]);

  const history = useHistory();
  const { postId } = useParams();
  const windowSize = useWindowSize();
  const smallScreen = windowSize.width < 1260;
  const isCurrentUserPost = isMy || (user && `${user.id}` === `${(currentUser || {}).id}`);
  const album = photos && videos ? [...photos, ...videos] : [];
  const userDegree = getConnectionLevel(user);
  const DegreeIcon = userDegree.icon;
  const currentTags = dictionariesStore.tags.filter(tag => (tagList || []).includes(tag.name));
  const theme = (user && user.skin && user.skin.id ) || null;
  const currentTheme = findTheme(theme || null);
  const isAnonymousPost = authorVisibility === 'anonymous';

  const [actionDropdownOpen, setActionDropdownOpen] = useState(false);
  const [commentFieldOpen, setCommentFieldOpen] = useState(false);
  const [confirmData, setConfirmData] = useState(null);

  const handleReplyToPost = async (reply: any) => {
    await store.replyToPost({ ...reply, post });
    setCommentFieldOpen(false);
  };

  const goBack = () => {
    history.goBack();
  };

  const handleLoadMoreReplies = e => {
    e.stopPropagation();
    store.loadMoreReplies({ post, limit: 10 });
  };

  useEffect(() => {
    store.getPost(postId);
    return store.clearStore;
  }, [postId]);

  const handleFollowPost = () => {
    followPost({ post });
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
        goBack();
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

  return (
    <ScreenPage withHeader withFooter>
      {loading ? <Preloader position="fixed" backdrop /> : (
        <S.Wrap theme={currentTheme}>
          <S.Container>
            <S.Head>
              <S.BackButton secondaryBlack onClick={goBack}>
                <IconBack /> Back
              </S.BackButton>

              {!showError && <>
                <S.Person>
                  <S.Avatar rounded user={user} />
                  <S.Author onClick={e => { e.stopPropagation(); redirectToUser(history, user); }} hasHover={user}>
                    {(!isAnonymousPost && !user) ? 'Someone asked' : getUserName(user)} {!isCurrentUserPost && <DegreeIcon />}
                  </S.Author>
                  <S.Date>{createdAt ? formatTimeToLocal(createdAt) : ''}</S.Date>
                </S.Person>

                <S.Action onClick={e => { e.stopPropagation(); }}>
                  {smallScreen ? (
                    <S.ActionsDropdown isOpen={actionDropdownOpen}>
                      <S.ActionsButton onClick={() => setActionDropdownOpen(!actionDropdownOpen)}>
                        <span />
                        <span />
                        <span />
                      </S.ActionsButton>

                      <S.ActionsContent>
                        {!isCurrentUserPost && <S.ActionsControl onClick={handleFollowPost}>
                          <span>{isFollowed ? 'Unfollow post' :  'Follow post'}</span>
                        </S.ActionsControl>}

                        <S.ActionsControlMobile>
                          <ShareInSystem mobile share repost={!isCurrentUserPost} data={id ? { post } : {}}/>
                        </S.ActionsControlMobile>

                        {!isCurrentUserPost && !!user && <S.ActionsControl>
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
                      <S.ActionsLink>
                        <S.ShareInSystem share repost={!isCurrentUserPost} data={id ? { post } : {}}/>
                      </S.ActionsLink>

                      {!isCurrentUserPost ?
                        <>
                          {!!user && <S.ActionsLink>
                            <DirectMessageButton user={user}>
                              <IconChat />
                            </DirectMessageButton>
                          </S.ActionsLink>}

                          <S.ActionsLink secondary onClick={handleFollowPost}>
                            <span>{isFollowed ? 'Unfollow post' :  'Follow post'} Post</span>
                          </S.ActionsLink>
                        </>
                        :
                        <>
                          <S.ActionsLink onClick={handleEditPost}>
                            <IconEditProf />
                          </S.ActionsLink>

                          <S.ActionsLink onClick={handleDeletePost}>
                            <IconTrash />
                          </S.ActionsLink>
                        </>}
                    </>
                  )}
                </S.Action>
              </>}
            </S.Head>

            {!showError ?
              <>
                <S.Content>
                  {!!album.length && <S.ContentImg>
                    <Gallery album={album} />
                  </S.ContentImg>}

                  <S.ContentBlock center={!album.length}>
                    {content && (
                      <S.ContentText>
                        <TextFormatted highlight={['hashtags', 'mentions']} text={content} />
                      </S.ContentText>)}

                    {currentTags && (
                      <S.TagList
                        allowOverflow
                        isLinks
                        tags={currentTags}
                        onClick={e => { e.stopPropagation(); }}
                      />
                    )}
                  </S.ContentBlock>
                </S.Content>

                {!!repost && <S.RepostRow>
                  <PostCard reposted post={{ ...repost, replies: repostReply ? [repostReply] : [] }} />
                </S.RepostRow>}

                <S.RepliesList>
                  {replies.map(reply => (
                    <PostReply
                      key={reply.id}
                      post={post}
                      reply={reply}
                      handleEditReply={handleEditReply}
                      handleDeleteReply={handleDeleteReply}
                      themeUser
                    />
                  ))}

                  {repliesCount > replies.length && (
                    <S.MoreRepliesBtn theme={theme}>
                      <Button xss transparent onClick={handleLoadMoreReplies}>
                        View {repliesCount - replies.length} more responses
                      </Button>
                    </S.MoreRepliesBtn>
                  )}
                </S.RepliesList>

                <S.Footer isOpen={commentFieldOpen} theme={currentTheme}>
                  <NewReplyField
                    fontSize={16}
                    highlight={['hashtags', 'mentions']}
                    placeholder="Write a response..."
                    onReply={handleReplyToPost}
                    size={80}
                  />
                </S.Footer>
              </>
              :
              <S.Error>
                {errors[0].detail}
              </S.Error>}
          </S.Container>
        </S.Wrap>
      )}

      <ConfirmModal data={confirmData} />
    </ScreenPage>
  );
};

export default observer(PostScreen);
