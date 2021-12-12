import React, { useEffect } from 'react';
import qs from 'qs';
import InfiniteScroll from 'react-infinite-scroller';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import UserCard from 'components/UserCard';
import { gray } from 'styles/colors';

import store from './store';
import * as S from './styles';

const SearchPeople = () => {
  const { search } = useLocation();
  const { query } = qs.parse(search, { ignoreQueryPrefix: true });

  const { loading, users, totalFetchedCount, page, itemsCountOnPage, lastFiltersChange } = store;

  const fetchUsers = (fetchMore: ?boolean) => {
    if (!fetchMore) store.clearUsers();
    if (query) {
      const filter = {
        ...store.getSerializedFilters(),
        q: query
      };
      store.searchUsers({ filter, fetchMore });
    }
  };

  const handleLoadMore = () => {
    store.loadMoreUsers();
    if (totalFetchedCount && (totalFetchedCount - users.length) <= itemsCountOnPage * 2) {
      fetchUsers(true);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [query, lastFiltersChange]);

  return (
    <S.Wrap>
      <S.Content>
        <InfiniteScroll
          pageStart={page}
          loadMore={handleLoadMore}
          hasMore={!loading && totalFetchedCount > users.length}
        >
          {!loading && <>
            {(users.length ?
              users.map((user) => (
                <UserCard xs key={user.id} user={user} className='user-card' withActions divider={gray} />
              ))
              :
              <S.NoData>
                No results
              </S.NoData>
            )}
          </>}
        </InfiniteScroll>
      </S.Content>
    </S.Wrap>
  );
};

export default observer(SearchPeople);
