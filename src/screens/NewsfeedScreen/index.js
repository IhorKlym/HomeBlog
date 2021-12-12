// @flow
import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react';
import { useLocation, useHistory } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import qs from 'qs';

import ScreenPage from 'components/ScreenPage';
import Search from 'components/Search';
import Container from 'components/Container';
import PostCard from 'components/PostCard';
import NoPost from 'components/NoPost';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import { LEVEL_FILTERS } from 'helpers/consts';
import Tag from 'components/Tag';
import Preloader from 'components/Preloader';
import stores from 'core/stores';
import { white } from 'styles/colors';

import * as S from './styles';
import store from './store';

const NewsfeedScreen = () => {
  const location = useLocation();
  const history = useHistory();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { tagList: queryTagList } = query;

  const { dictionariesStore: { tags }, sessionStore: { isUserLoggedIn, currentUser }, helperStore } = stores;
  const { loading, page, totalPostsCount, posts, itemsCountOnPage, filters = {}, lastFiltersChange } = store;
  const { search = '', tagList = [] } = filters;
  const [showFilters, setShowFilters] = useState(false);
  const filtersCount = store.getFiltersCount();
  const fetchPromiseRef = useRef(null);

  const fetchNewsfeedData = (fetchMore: ?boolean) => {
    if (fetchPromiseRef.current && !fetchMore) fetchPromiseRef.current.cancel();
    fetchPromiseRef.current = store.fetchNewsfeed(fetchMore);
  };

  const loadMorePosts = () => {
    store.loadMorePosts();
    if (totalPostsCount && (totalPostsCount - posts.length) <= itemsCountOnPage * 2) {
      fetchNewsfeedData(true);
    }
  };

  const checkRequireLogin = () => {
    if (!isUserLoggedIn) {
      helperStore.setShowLoginModal(true);
      return true;
    }
  };

  const handleToggleTag = (tag: any) => {
    if (checkRequireLogin()) return;
    store.toggleFilterOption({ name: 'tagList', option: tag.name });
  };

  const handleSearch = (e: any) => {
    if (checkRequireLogin()) return;
    store.handleFilterChange({ name: 'search', value: e.target.value });
  };

  const handleToggleFilter = () => {
    if (checkRequireLogin()) return;
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    fetchNewsfeedData();
  }, [lastFiltersChange]);

  useEffect(() => {
    store.clearPosts();
    fetchNewsfeedData();
  }, [currentUser]);

  useEffect(() => {
    if (queryTagList && tagList.join(',') !== queryTagList) {
      store.handleFilterChange({ name: 'tagList', value: queryTagList.split(',') });
    }
  }, [queryTagList]);

  useEffect(() => {
    if (tagList.join(',') !== queryTagList) {
      const updatedParams = { ...query, tagList: tagList.join(',') };
      const updatedQuery = qs.stringify(updatedParams, { ignoreQueryPrefix: true });
      history.push(`${location.pathname}?${updatedQuery}`);
    }
  }, [tagList]);

  return (
    <ScreenPage withHeader headerProps={{ allowCreatePost: true }} withFooter>
      <S.Wrap>
        <S.TagsWrap>
          <S.TagList>
            {tags.map(tag => {
              const active = !tagList.length || tagList.includes(tag.name);
              return (
                <Tag boxed key={tag.id}
                  active={active}
                  tag={tag}
                  onTagClick={() => handleToggleTag(tag)}
                />
              );
            })}
          </S.TagList>
        </S.TagsWrap>

        <Container>
          <S.Filters>
            <S.FiltersHeader>
              <S.Search>
                <Search
                  name="search"
                  value={search}
                  onChange={handleSearch}
                  debaunceTimeout={800}
                  placeholder="Search"
                  onClick={checkRequireLogin}
                />
              </S.Search>

              <S.FiltersToggleWrap>
                {!!filtersCount &&
                  <Button text transparent onClick={store.clearFilters}>
                    Clear All
                  </Button>}

                <Button text transparent onClick={handleToggleFilter}>
                  Filters {filtersCount ? `(${filtersCount})` : ''} {showFilters ? <span className="active"></span>  : <span></span>}
                </Button>
              </S.FiltersToggleWrap>
            </S.FiltersHeader>

            <S.FiltersWrap isOpen={showFilters}>

              <S.FiltersRow>
                <S.FiltersCol grow={3}>
                  <S.ColTitle>
                    Degree of Separation
                  </S.ColTitle>

                  <S.FiltersBlock>
                    {LEVEL_FILTERS.map(item => (
                      <S.FilterItem key={item.value}>
                        <Checkbox
                          color={white}
                          title={item.label}
                          name="connectionLevels"
                          value={filters.connectionLevels}
                          checked={store.filterHasOption({ name: 'connectionLevels', option: item.value })}
                          onChange={() => store.toggleFilterOption({ name: 'connectionLevels', option: item.value })}
                        />
                      </S.FilterItem>
                    ))}
                  </S.FiltersBlock>
                </S.FiltersCol>

                <S.FiltersCol grow={2}>
                  <S.ColTitle>
                    Other
                  </S.ColTitle>

                  <S.FiltersBlock>
                    <S.FilterItem>
                      <Checkbox
                        color={white}
                        title="Posts I’m following"
                        name="followed"
                        checked={filters.followed}
                        onChange={() => store.handleFilterChange({ name: 'followed', value: !filters.followed })}
                      />

                      <Checkbox
                        color={white}
                        title="Unanswered questions"
                        name="unanswered"
                        checked={filters.unanswered}
                        onChange={() => store.handleFilterChange({ name: 'unanswered', value: !filters.unanswered })}
                      />
                    </S.FilterItem>
                  </S.FiltersBlock>
                </S.FiltersCol>
              </S.FiltersRow>
            </S.FiltersWrap>
          </S.Filters>

          <InfiniteScroll
            pageStart={page}
            loadMore={loadMorePosts}
            hasMore={!loading && totalPostsCount > posts.length}
          >
            {loading && <Preloader position="relative" />}
            {!loading && <>
              {(posts.length ? posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                />
              ))
                :
                <NoPost color='transparent' text='Nothing to show yet, be the first to create a post!' />
              )}
            </>}
          </InfiniteScroll>
        </Container>
      </S.Wrap>
    </ScreenPage>
  );
};

export default observer(NewsfeedScreen);
