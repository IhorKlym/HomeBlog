// @flow
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { observer } from 'mobx-react';
import { useParams, useHistory } from 'react-router-dom';

import ScreenPage from 'components/ScreenPage';
import Container from 'components/Container';
import Preloader from 'components/Preloader';
import UserCard from 'components/UserCard';
import Search from 'components/Search';
import InviteFriendModal from 'components/InviteFriendModal';
import SuggestedConnections from 'components/SuggestedConnections';
import stores from 'core/stores';
import { IconBack } from 'styles/icons';
import { getUserName, countToText } from 'helpers/methods';
import { findTheme } from 'helpers/skins';

import store from './store';
import * as S from './styles';

const ConnectionsScreen = () => {
  const {
    connectionsStore,
    sessionStore: { currentUser, getCurrentUser },
    helperStore: { appEvent }
  } = stores;
  const history = useHistory();
  const { pendingRequests } = connectionsStore;
  const { userId, connectionType } = useParams();

  const isCurrentUser = !userId || userId === currentUser.id;
  const user = isCurrentUser ? currentUser : store.user;
  const userName = user ? getUserName(user, false, true) : user;

  const [title, setTitle] = useState('Connections');
  const [connections, setConnections] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const theme = (currentUser && currentUser.skin && currentUser.skin.id )|| null;
  const currentTheme = findTheme(theme);
  const isMyConnections = (isCurrentUser && connectionType === 'connections');
  const isMutualConnections = connectionType === 'mutual-connections';
  const isSuggestedConnections = connectionType === 'suggested-connections';

  let connectionsTotalCount: number = connections.length || 0;
  if (user) connectionsTotalCount = user[isMutualConnections ? 'mutualConnectionsCount' : 'connectionsCount'] || 0;

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const fetchData = async (fetchMore?: boolean) => {
    setLoading(true);
    const limit = 20;
    const pendingRequestParams = {};
    const params: any = {
      sort: '-created_at',
      page: {
        offset: fetchMore ? connections.length : 0,
        limit
      }
    };
    if (search) {
      const filter = { q: search };
      params.filter = filter;
      pendingRequestParams.filter = filter;
    }
    let data;
    if (isMyConnections) {
      if (!fetchMore) connectionsStore.getPendingRequests(pendingRequestParams);
      data = await connectionsStore.getMyConnections(params);
    } else if (!isCurrentUser && connectionType === 'connections') {
      data = await connectionsStore.getUserConnections(userId, params);
    } else if (isMutualConnections) {
      data = await connectionsStore.getMutualConnections(userId, params);
    } else if (isSuggestedConnections) {
      data = await connectionsStore.getSuggestedConnections(params);
    }
    data = data || [];
    setConnections(fetchMore ? [...connections, ...data] : data);
    setHasMore(data.length === limit);
    setLoading(false);
  };

  const handleLoadMore = () => {
    setHasMore(false);
    fetchData(true);
  };

  useEffect(() => {
    if (isCurrentUser) getCurrentUser();
    else store.getProfile(userId);
    return store.clearStore;
  }, [userId, isCurrentUser]);

  useEffect(() => {
    fetchData();
  }, [userId, connectionType, search]);

  useEffect(() => {
    let t = 'Connections';
    if (isCurrentUser) t = 'Your Connections';
    if (isMutualConnections) t = 'Mutual Connections';
    else if (isSuggestedConnections) t = 'People You May Know';
    setTitle(t);
  }, [connectionType]);

  const appEventHandler = () => {
    const { type, payload } = appEvent;
    if ((type === 'CONNECTIONS:DISCONNECT' || type === 'REQUEST:ACCEPT') && (isCurrentUser || userId === payload.target.id)) {
      fetchData();
    }
  };

  useEffect(() => {
    if (appEvent) appEventHandler();
  }, [appEvent]);

  return (
    <ScreenPage withHeader withTopBar withFooter withTheme theme={theme}>
      <S.Wrap>
        <Container>
          <S.PageHeader>
            <S.CancelButton text transparent
              onClick={() => history.push(isCurrentUser ? '/me' : `/users/${userId}`)}
            >
              <IconBack /> {isCurrentUser ? 'Back to your profile' : `Back to ${userName} profile`}
            </S.CancelButton>

            {(isMyConnections || isSuggestedConnections) ? <InviteFriendModal /> : ''}
          </S.PageHeader>

          <S.TitleWrap>
            <h2>{title}</h2>
            {!isSuggestedConnections && <p>{countToText(connectionsTotalCount, 'Connection')}</p>}
          </S.TitleWrap>

          <S.PageBody>
            <S.PageCol />

            <S.PageCol grow={3}>
              <S.SearchBlock>
                <Search
                  name="search"
                  value={search}
                  onChange={handleChangeSearch}
                  debaunceTimeout={300}
                  placeholder={isCurrentUser ? 'Search your connections' : `Search ${userName}’s  connections`}
                />
              </S.SearchBlock>

              <InfiniteScroll
                loadMore={handleLoadMore}
                hasMore={!loading && hasMore}
              >
                {(!!pendingRequests.length && isMyConnections) && <S.PendingList borderColor={currentTheme.borderColor}>
                  <h4>Pending Requests</h4>
                  <S.UserWrap>
                    {pendingRequests.map((request) => {
                      const { userSource, userTarget } = request;
                      if (!userSource || !userTarget) return '';
                      const requestedUser = (currentUser.id === userSource.id) ? userTarget : userSource;
                      return (
                        <UserCard key={request.id}
                          isConnection
                          withActions
                          xs
                          user={requestedUser}
                          className='user-card'
                          divider={currentTheme.borderColor}
                        />
                      );
                    })}
                  </S.UserWrap>
                </S.PendingList>}

                <S.UserWrap>
                  {connections.length ?
                    connections.map(connection => (
                      <UserCard key={connection.id}
                        isConnection={isMyConnections}
                        user={connection}
                        withActions
                        xs
                        className='user-card'
                        divider={currentTheme.borderColor}
                      />
                    ))
                    :
                    <S.NoFriendsWrap>
                      <h6>Nothing to show</h6>
                    </S.NoFriendsWrap>}
                </S.UserWrap>
              </InfiniteScroll>
            </S.PageCol>

            <S.PageCol grow={isMyConnections ? 1.5 : 1}>
              {isMyConnections && <SuggestedConnections col border />}
            </S.PageCol>
          </S.PageBody>
        </Container>

        {(loading || store.loading) && <Preloader position="fixed" backdrop />}
      </S.Wrap>
    </ScreenPage>
  );
};

export default observer(ConnectionsScreen);
