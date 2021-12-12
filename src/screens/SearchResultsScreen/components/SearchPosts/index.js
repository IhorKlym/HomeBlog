// @flow
import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react';
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import StackGrid from 'react-stack-grid';
import useWindowSize from 'hooks/windowSize';
import qs from 'qs';

import PostCard from 'components/PostCard';
import { whitePrimary } from 'styles/colors';

import store from './store';

import * as S from './styles';

const SearchPosts = () => {
  const { search } = useLocation();
  const { page, loading, totalFetchedCount, posts, itemsCountOnPage, lastFiltersChange } = store;
  const { query, tab } = qs.parse(search, { ignoreQueryPrefix: true });
  const windowSize = useWindowSize();
  const [columnWidth, setColumnWidth] = useState('33.33%');
  const gridRef = useRef(null);
  const fetchPromiseRef = useRef(null);

  const searchPosts = (fetchMore: ?boolean) => {
    if (!fetchMore) store.clearPosts();
    if (!query) return;
    const filter = {
      ...store.getSerializedFilters(),
      q: query
    };
    if (fetchPromiseRef.current && !fetchMore) fetchPromiseRef.current.cancel();
    fetchPromiseRef.current = store.searchPosts(filter, fetchMore);
  };

  const handleLoadMorePosts = () => {
    store.loadMorePosts();
    if (totalFetchedCount && (totalFetchedCount - posts.length) <= itemsCountOnPage * 2) {
      searchPosts(true);
    }
  };

  const refreshGridLayout = (timeout: ?any) => {
    const refresh = () => {
      if (gridRef.current) gridRef.current.updateLayout();
    };
    if (timeout) setTimeout(refresh, timeout);
    else refresh();
  };

  useEffect(() => {
    searchPosts();
  }, [query, lastFiltersChange]);

  useEffect(() => {
    let colW = '100%';
    if (windowSize.width >= 680) colW = '50%';
    if (windowSize.width >= 988) colW = '33.33%';
    if (columnWidth !== colW) setColumnWidth(colW);
  }, [windowSize]);

  useEffect(() => {
    refreshGridLayout(10);
  }, [posts, tab]);

  return (
    <S.Wrap>
      <InfiniteScroll
        pageStart={page}
        loadMore={handleLoadMorePosts}
        hasMore={!loading && totalFetchedCount > posts.length}
      >
        {!loading && <>
          {(posts.length ?
            <StackGrid
              gridRef={ref => { gridRef.current = ref; }}
              columnWidth={columnWidth}
              itemComponent="div"
              gutterWidth={10}
              gutterHeight={10}
            >
              {posts.map((post) => (
                <PostCard
                  simple
                  key={post.id}
                  post={post}
                  background={whitePrimary}
                  onGalleryLoaded={() => refreshGridLayout(10)}
                />
              ))}
            </StackGrid>
            :
            <S.NoData>
              No results
            </S.NoData>
          )}
        </>}
      </InfiniteScroll>
    </S.Wrap>
  );
};

export default observer(SearchPosts);
