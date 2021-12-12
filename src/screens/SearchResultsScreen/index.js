// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';

import ScreenPage from 'components/ScreenPage';
import Container from 'components/Container';
import BrushedText from 'components/BrushedText';
import { findTheme } from 'helpers/skins';
import { IconBack } from 'styles/icons';

import stores from 'core/stores';

import Filters from './components/Filters';

import SearchPeople from './components/SearchPeople';
import peoplesStore from './components/SearchPeople/store';

import SearchPosts from './components/SearchPosts';
import postsStore from './components/SearchPosts/store';

import * as S from './styles';

const SearchResultsScreen = () => {
  const { sessionStore: { currentUser } } = stores;
  const { search } = useLocation();
  const history = useHistory();
  const loading = (peoplesStore.loading || postsStore.loading);

  const searchParams = qs.parse(search, { ignoreQueryPrefix: true });
  const isProfiles = searchParams.tab === 'profiles';

  const theme = (currentUser && currentUser.skin && currentUser.skin.id) || null;
  const currentTheme = findTheme(theme || null);

  const handleOpenTab = (newTab: string) => {
    const newParams = { ...searchParams, tab: newTab };
    const newSearch = qs.stringify(newParams, { ignoreQueryPrefix: true });
    history.replace(`/search?${newSearch}`);
  };

  return (
    <ScreenPage withHeader headerProps={{ allowCreatePost: true }} loading={loading}>
      <S.Wrap>
        <S.TopBar>
          <Container>
            <S.BackButton text transparent
              onClick={() => history.goBack()}
            >
              <IconBack /> Back
            </S.BackButton>
            <S.Title>
              Search results for <BrushedText color={currentTheme.borderColor}>
                {searchParams.query}
              </BrushedText>
            </S.Title>
          </Container>
        </S.TopBar>

        <S.Content>
          <Container>
            <S.Tabs>
              <S.Tab active={!isProfiles} onClick={() => handleOpenTab('posts')}>
                Posts <span>({postsStore.totalCount})</span>
              </S.Tab>

              <S.Tab active={isProfiles} onClick={() => handleOpenTab('profiles')}>
                Profiles <span>({peoplesStore.totalCount})</span>
              </S.Tab>
            </S.Tabs>

            <Filters />

            <S.TabConent active={!isProfiles}>
              <SearchPosts />
            </S.TabConent>
            
            <S.TabConent active={isProfiles}>
              <SearchPeople />
            </S.TabConent>
          </Container>
        </S.Content>
      </S.Wrap>
    </ScreenPage>
  );
};

export default observer(SearchResultsScreen);
