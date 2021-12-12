// @flow

import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroller';
import StackGrid from 'react-stack-grid';
import useWindowSize from 'hooks/windowSize';

import PostCard from 'components/PostCard';
import Preloader from 'components/Preloader';
import { whitePrimary } from 'styles/colors';

import store from './store';
import * as S from './styles';

type Props = {
  hashtag: any,
  handleClose: () => any
};

const HashtagSearchView = ({ hashtag, handleClose, ...props }: Props) => {
  const windowSize = useWindowSize();
  const [columnWidth, setColumnWidth] = useState('33.33%');
  const gridRef = useRef(null);
  const { page, loading, totalCount, totalFetchedCount, posts, itemsCountOnPage } = store;

  const refreshGridLayout = (timeout: ?any) => {
    const refresh = () => {
      if (gridRef.current) gridRef.current.updateLayout();
    };
    if (timeout) setTimeout(refresh, timeout);
    else refresh();
  };

  const fetchPosts = (fetchMore: ?boolean) => {
    if (!fetchMore) store.clearPosts();
    store.fetchPosts(hashtag, fetchMore);
  };

  const handleLoadMorePosts = () => {
    store.loadMorePosts();
    if (totalFetchedCount && (totalFetchedCount - posts.length) <= itemsCountOnPage * 2) {
      fetchPosts(true);
    }
  };

  useEffect(() => {
    let colW = '100%';
    if (windowSize.width >= 680) colW = '50%';
    if (windowSize.width >= 988) colW = '33.33%';
    if (columnWidth !== colW) setColumnWidth(colW);
  }, [windowSize]);

  useEffect(() => {
    refreshGridLayout(10);
  }, [posts.length]);

  useEffect(() => {
    fetchPosts();
  }, [hashtag]);

  return (
    <S.Wrap {...props}>
      <S.Container>
        <S.Head>
          <S.Name>{hashtag}</S.Name>
          {!loading && <S.Posts>{totalCount} posts</S.Posts>}
        </S.Head>

        <S.PostsList>
          <InfiniteScroll
            pageStart={page}
            loadMore={handleLoadMorePosts}
            hasMore={!loading && totalCount > posts.length}
          >
            {!!posts.length &&
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
                    beforeRedirectAction={handleClose}
                  />
                ))}
              </StackGrid>}
          </InfiniteScroll>
        </S.PostsList>

      </S.Container>
      <S.Close onClick={handleClose} />

      {loading && <Preloader position="fixed" />}
    </S.Wrap>
  );
};

export default observer(HashtagSearchView);
