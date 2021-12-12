// @flow

import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';

import RoundedButton from 'components/RoundedButton';
import stores from 'core/stores';
import { IconArrowRight, IconClose } from 'styles/icons';

import * as S from './styles';

type Props = {
  placeholder?: string,
  themeSearch?: string
}

const GlobalSearchBar = ({ placeholder, themeSearch }: Props) => {
  const [searchStr, setSearchStr] = useState('');
  const { helperStore: { setShowGlobalSearchBar } } = stores;
  const history = useHistory();
  const { pathname, search } = useLocation();
  let searchQuery = '';
  if (pathname === '/search') {
    const searchParams = qs.parse(search, { ignoreQueryPrefix: true }) || {};
    searchQuery = searchParams.query || '';
  }

  useEffect(() => {
    if (searchQuery && searchQuery !== searchStr) setSearchStr(searchQuery);
  }, [searchQuery]);

  const handleSearch = () => {
    let searchParams = {};
    if (pathname === '/search' && search) {
      searchParams = qs.parse(search, { ignoreQueryPrefix: true }) || {};
    }
    searchParams.query = searchStr;
    setShowGlobalSearchBar(false);
    history.push(`/search?${qs.stringify(searchParams)}`);
  };

  const handleClose = () => {
    setShowGlobalSearchBar(false);
  };

  const handleInputKeyPress = (e: any) => {
    if (e && e.key === 'Enter') handleSearch();
  };

  return (
    <S.Wrap theme={themeSearch}>
      <S.Container>
        <S.Search
          autoFocus
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
          placeholder={placeholder || 'Search anything'}
          onKeyPress={handleInputKeyPress}
        />

        {themeSearch === 'nav' ? (
          <S.IcSearch />
        ) : (
          <>
            <RoundedButton xs secondary onClick={handleSearch}>
              <IconArrowRight />
            </RoundedButton>

            <RoundedButton xs primary onClick={handleClose}>
              <IconClose />
            </RoundedButton>
          </>
        )}
      </S.Container>
    </S.Wrap>
  );
};

GlobalSearchBar.defaultProps = {
  placeholder: '',
  themeSearch: ''
};

export default GlobalSearchBar;
