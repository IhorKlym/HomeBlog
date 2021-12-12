// @flow

import React, { useRef, useState } from 'react';
import { observer } from 'mobx-react';

import Header from 'components/Header';
import Preloader from 'components/Preloader';
import Footer from 'components/Footer';
import GlobalSearchBar from 'components/GlobalSearchBar';
import { findTheme } from 'helpers/skins';
import { useScrollPosition } from 'hooks/scrollPosition';

import stores from 'core/stores';

import { zindexs } from 'styles/variables';
import * as S from './styles';

type Props = {
  withHeader?: boolean,
  withFooter?: boolean,
  headerProps?: any,
  withTheme?: boolean,
  withTopBar?: boolean,
  progress?: any,
  theme?: any,
  loading?: boolean,
  children: any
};

const ScreenPage = (props: Props) => {
  const { withHeader, withFooter, headerProps, withTheme, withTopBar, progress, theme, loading, children, ...rest } = props;
  const {
    sessionStore: { currentUser },
    helperStore: { showGlobalSearchBar }
  } = stores;
  const [scrolled, setScrolled] = useState(false);
  const wrap = useRef();

  const userTheme = (currentUser && currentUser.skin && currentUser.skin.id) || null;
  const currentTheme = findTheme(theme || userTheme);

  useScrollPosition(
    ({ currPos }) => {
      const isScrolled = currPos.top < -20;
      if (!scrolled && isScrolled) setScrolled(true);
      else if (scrolled && !isScrolled) setScrolled(false);
    },
    [wrap, scrolled],
    wrap
  );

  return (
    <S.PageWrap {...rest}
      ref={wrap}
      withHeader={withHeader}
      withTopBar={withTopBar}
      withSearch={showGlobalSearchBar}
      theme={withTheme ? currentTheme : null}
    >
      <S.AppBar>
        {showGlobalSearchBar && <GlobalSearchBar />}

        {withTopBar && <S.ProgressBar progress={progress || 100} theme={currentTheme} />}

        {withHeader && <Header {...headerProps} scrolled={scrolled} theme={withTheme ? currentTheme : null} />}
      </S.AppBar>

      {children}

      {withFooter && <Footer />}

      {loading && <Preloader position="fixed" backdrop zIndex={zindexs.modal} />}
    </S.PageWrap>
  );
};

ScreenPage.defaultProps = {
  withHeader: false,
  withFooter: false,
  headerProps: {},
  withTheme: false,
  withTopBar: false,
  theme: null,
  loading: false,
  progress: 0
};

export default observer(ScreenPage);
