// @flow
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { observer } from 'mobx-react';

import ScreenPage from 'components/ScreenPage';
import Container from 'components/Container';
import Preloader from 'components/Preloader';
import InviteFriendModal from 'components/InviteFriendModal';

import { IconLocation, IconEditProf, IconChat } from 'styles/icons';
import BrushedText from 'components/BrushedText';
import PostCard from 'components/PostCard';
import Button from 'components/Button';
import CreatePostButton from 'components/CreatePostButton';
import SuggestedConnections from 'components/SuggestedConnections';
import DirectMessageButton from 'components/DirectMessageButton';
import NoPost from 'components/NoPost';
import useWindowSize from 'hooks/windowSize';

import stores from 'core/stores';
import { getUserName, getConnectionLevel, isUserPrivate, countToText } from 'helpers/methods';
import { findTheme } from 'helpers/skins';
import { whiteSecondary } from 'styles/colors';

import ConnectButton from './components/ConnectButton';
import FollowButton from './components/FollowButton';

import store from './store';
import * as S from './styles';

const ProfileScreen = () => {
  const history = useHistory();
  const { userId } = useParams();
  const { sessionStore: { currentUser }, helperStore: { appEvent } } = stores;
  const { user, posts, page, totalPostsCount, loading, itemsCountOnPage } = store;

  const [isOpenBio, setOpenBio] = useState(false);

  const isConnection = (userId && userId !== (currentUser || {}).id);
  const isPrivate = isConnection && isUserPrivate(user);
  const theme = (user && user.skin && user.skin.id ) || null;
  const currentTheme = findTheme(theme || null);
  const windowSize = useWindowSize();
  const userDegree = getConnectionLevel(user);
  const DegreeIcon = userDegree.icon;

  const fetchActivityData = (fetchMore: ?boolean) => {
    if (!fetchMore) store.clearPosts();
    store.fetchActivity(fetchMore, userId);
  };

  const loadMore = () => {
    store.loadMorePosts();
    if (totalPostsCount && (totalPostsCount - posts.length) <= itemsCountOnPage * 2) {
      fetchActivityData(true);
    }
  };

  const appEventHandler = () => {
    const { type, payload } = appEvent;
    if ((type === 'CONNECTIONS:DISCONNECT' || type === 'REQUEST:ACCEPT') && (!isConnection || userId === payload.target.id)) {
      store.getProfile(userId);
    }
  };

  useEffect(() => {
    store.getProfile(userId);
    fetchActivityData();
    return store.clearStore;
  }, [userId]);

  useEffect(() => {
    if (appEvent) appEventHandler();
  }, [appEvent]);

  const showUserData = user && user.state === 'active';
  return (
    <ScreenPage withHeader withFooter withTopBar withTheme theme={theme}>
      <S.Wrap>
        <Container>
          {showUserData && <S.InfoRow>
            <S.InfoCol left>
              {!isConnection ?
                <>
                  <Button text baseline onClick={() => history.push('/edit-profile')}>
                    <IconEditProf/> Edit Profile
                  </Button>
                  <InviteFriendModal />
                </>
                :
                (windowSize.width > 768) && (
                  <>
                    {user.visibility === 'public' && <FollowButton user={user} />}
                    <DirectMessageButton user={user} >
                      <IconChat /> Message
                    </DirectMessageButton>
                  </>)}
            </S.InfoCol>

            <S.InfoCol center>

              {(windowSize.width < 768) && isConnection && (user.levelOfConnect !== 1) && (
                <S.NetworkRow>
                  {userDegree.text}
                </S.NetworkRow>)}

              {(windowSize.width > 768) && isConnection && (
                <S.NetworkRow>
                  {userDegree.text} |
                  <Button text transparent
                    onClick={() => history.push(`/users/${userId}/mutual-connections`)}
                  >
                    {countToText((user && user.mutualConnectionsCount) || 0, 'mutual connection')}
                  </Button>
                </S.NetworkRow>)}

              <S.Avatar rounded user={user} />

              <S.UserName>
                <BrushedText color={currentTheme.patternBg}>
                  {user.levelOfConnect === 1 && <DegreeIcon />} {getUserName(user)}
                </BrushedText>
              </S.UserName>

              {!isPrivate &&
                <S.InfoContact>
                  {(windowSize.width > 768) && (
                    <Button text transparent
                      onClick={() => history.push(isConnection ? `/users/${userId}/connections` : '/me/connections')}
                    >
                      {countToText(user.connectionsCount || 0, 'Connection')}
                    </Button>)}
                  {user.location && <S.UserLocation>
                    <IconLocation/>
                    {user.city}, {user.country}
                  </S.UserLocation>}
                </S.InfoContact>}

              <S.MobileRow flexEnd={user.visibility === 'public'}>
                {(windowSize.width < 768) && (
                  <S.NetworkMobileRow>
                    {!isPrivate &&
                      <Button text transparent
                        onClick={() => history.push(isConnection ? `/users/${userId}/connections` : '/me/connections')}
                      >
                        {countToText(user.connectionsCount || 0, 'Connection')}
                      </Button>}
                    {isConnection &&
                      <Button text transparent
                        onClick={() => history.push(`/users/${userId}/mutual-connections`)}
                      >
                        {countToText((user && user.mutualConnectionsCount) || 0, 'mutual connection')}
                      </Button>}
                  </S.NetworkMobileRow>)}

                {(windowSize.width < 768) && isConnection && (
                  <S.ActionMobile>
                    <DirectMessageButton user={user} >
                      <IconChat />
                    </DirectMessageButton>
                    {user.visibility === 'public' && <FollowButton hasMargin={!!user.bio} user={user} />}
                  </S.ActionMobile>)}
              </S.MobileRow>

              {!isPrivate &&
                <S.UserBio isOpen={isOpenBio}>
                  {!!user.bio && <S.UserBioButton onClick={() => setOpenBio(!isOpenBio)}>
                    Read Bio
                  </S.UserBioButton>}

                  <S.UserBioContent>
                    {user.bio || ''}
                  </S.UserBioContent>
                </S.UserBio>}
            </S.InfoCol>

            <S.InfoCol right>
              {!isConnection ?
                <CreatePostButton />
                :
                <ConnectButton user={user} />}
            </S.InfoCol>
          </S.InfoRow>}

          {(showUserData && !isConnection) && <SuggestedConnections />}

          {showUserData && <S.PostsList>
            {isPrivate &&
              <NoPost
                text={<>This Account is Private <br/> Connect to see profile content. </>}
                isMy={!isConnection} color={currentTheme.borderColor}
              />}

            {(!isPrivate || !!posts.length) &&
              <InfiniteScroll
                pageStart={page}
                loadMore={loadMore}
                hasMore={!loading.posts && totalPostsCount > posts.length}
              >
                {loading.posts && <Preloader position="relative" />}
                {!loading.posts && <>
                  {(posts.length ? posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      background={whiteSecondary}
                      afterPostDeleted={store.afterPostDeleted}
                    />
                  ))
                    :
                    <NoPost
                      text={user ? '' : 'User/Object doesn\'t exist!'}
                      isMy={!isConnection} color={currentTheme.borderColor}
                    />
                  )}
                </>}
              </InfiniteScroll>}
          </S.PostsList>}
        </Container>
      </S.Wrap>
    </ScreenPage>
  );
};

ProfileScreen.defaultProps = {
  isConnection: false
};

export default observer(ProfileScreen);
