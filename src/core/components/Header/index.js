// @flow

import React from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import qs from 'qs';

import Logo from 'components/Logo';
import CreatePostButton from 'components/CreatePostButton';
import AuthModal from 'components/AuthModal';
import stores from 'core/stores';
import { IconSearchMagnifier } from 'styles/icons';
import useWindowSize from 'hooks/windowSize';
import { parseStrBoolean } from 'helpers/methods';

import newsfeedStore from 'screens/NewsfeedScreen/store';
import HeaderNavigation from './components/HeaderNavigation';

import * as S from './styles';

const { LANDING_MODE_ENABLED } = process.env;

type Props = {
  theme?: any,
  darkMode?: boolean,
  allowCreatePost?: boolean
};

const Header = (props: Props) => {
  const { allowCreatePost, darkMode, ...restProps } = props;
  const {
    sessionStore: { isUserLoggedIn },
    helperStore: { showGlobalSearchBar, setShowGlobalSearchBar }
  } = stores;
  const { search } = useLocation();
  const windowSize = useWindowSize();
  const { authMethod } = qs.parse(search, { ignoreQueryPrefix: true });

  return (
    <S.HeaderWrapper {...restProps} darkMode={darkMode}>
      <S.Header>
        <Logo white={darkMode} onClick={newsfeedStore.clearFilters} />

        {parseStrBoolean(LANDING_MODE_ENABLED) ?
          <S.RightCol />
          :
          <>
            {!isUserLoggedIn ?
              <AuthModal mode={authMethod} />
              :
              <S.RightCol>
                <HeaderNavigation
                  setShowSearchBar={setShowGlobalSearchBar}
                />

                {allowCreatePost && windowSize.width > 768 && <S.WrapCreatePost><CreatePostButton /></S.WrapCreatePost>}

                <S.Search marginBig={!allowCreatePost} onClick={() => setShowGlobalSearchBar(!showGlobalSearchBar)}>
                  <IconSearchMagnifier />
                </S.Search>
              </S.RightCol>}
          </>}
      </S.Header>
    </S.HeaderWrapper>
  );
};

Header.defaultProps = {
  theme: null,
  darkMode: false,
  allowCreatePost: false
};

export default observer(Header);
