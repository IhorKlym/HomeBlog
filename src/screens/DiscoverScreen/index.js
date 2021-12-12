// @flow

import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react';
import StackGrid from 'react-stack-grid';
import useWindowSize from 'hooks/windowSize';

import ScreenPage from 'components/ScreenPage';
import Container from 'components/Container';
import TagCard from 'components/TagCard';
import HashtagCard from 'components/HashtagCard';
import PostCollectionCard from 'components/PostCollectionCard';
import PostCollectionView from 'components/PostCollectionView';
import StatsCard from 'components/StatsCard';
import Preloader from 'components/Preloader';
import store from './store';

import * as S from './styles';

const DiscoverScreen = () => {
  const { loading, data } = store;
  const windowSize = useWindowSize();
  const [columnWidth, setColumnWidth] = useState('33.33%');
  const [showPostCollection, setShowPostCollection] = useState(null);
  const gridRef = useRef(null);

  const fetchDiscoverData = (fetchMore?: boolean) => {
    store.fetchDiscoverData(fetchMore);
  };

  const getRendererByType = (item: any) => {
    switch (item.type) {
    case 'tags':
      return <TagCard key={item.id} data={item} />;

    case 'hashtags':
      return <HashtagCard key={item.id} data={item} />;

    case 'system_tags':
      return (
        <PostCollectionCard
          key={item.id}
          data={item}
          onClick={() => setShowPostCollection(item)}
        />
      );

    case 'stats':
      return <StatsCard key={item.id} data={item} />;

    default:
      return null;
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
    let colW = '100%';
    if (windowSize.width >= 680) colW = '50%';
    if (windowSize.width >= 988) colW = '33.33%';
    if (columnWidth !== colW) setColumnWidth(colW);
  }, [windowSize]);

  useEffect(() => {
    refreshGridLayout(10);
  }, [data.length]);

  useEffect(() => {
    fetchDiscoverData();
  }, []);

  return (
    <ScreenPage withHeader headerProps={{ allowCreatePost: true }} withFooter>
      <S.Wrap>
        <Container>
          {data.length ?
            <StackGrid
              gridRef={ref => { gridRef.current = ref; }}
              columnWidth={columnWidth}
              itemComponent="div"
              gutterWidth={10}
              gutterHeight={10}
            >
              {data.map((item: any) => getRendererByType(item))}
            </StackGrid>
            :
            <S.NoData>
              Nothing to show
            </S.NoData>}
        </Container>
      </S.Wrap>

      {!!showPostCollection && <PostCollectionView data={showPostCollection} handleClose={() => setShowPostCollection(null)} />}
      {loading && <Preloader position="fixed" backdrop />}
    </ScreenPage>
  );
};

export default observer(DiscoverScreen);
