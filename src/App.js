// @flow

import React, { useEffect, useState } from 'react';
import { BrowserRouter, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';

import MainRouter from 'routes/MainRouter';
import LandingRouter from 'routes/LandingRouter';
import GalleryModal from 'components/GalleryModal';
import CreatePostModal from 'components/CreatePostModal';
import Preloader from 'components/Preloader';
import HashtagSearchView from 'components/HashtagSearchView';

import stores from 'core/stores';
import { hasToken } from 'helpers/token';
import { parseStrBoolean, hasSomeParentTheClass } from 'helpers/methods';

const { LANDING_MODE_ENABLED } = process.env;

const UseHistory = ({ children }: any) => {
  const history = useHistory();
  const [searchHashtag, setSearchHashtag] = useState(null);

  const handleDocumentClick = (ev: any) => {
    const { target = {} } = ev;
    const mention = hasSomeParentTheClass(target, 'mention');
    if (mention) {
      const denotationChar = mention.getAttribute('data-denotation-char');
      if (hasSomeParentTheClass(mention, 'quill-editor') || !denotationChar) return;
      ev.stopPropagation();
      if (denotationChar === '@') {
        history.push(`/users/${mention.dataset.id}`);
      } else {
        setSearchHashtag(`${denotationChar}${mention.dataset.value}`);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    const bodyToggleClass = () => {
      if (document.body) document.body.classList.toggle('modal-open', !!searchHashtag);
    };

    bodyToggleClass();

    return bodyToggleClass();
  }, [!!searchHashtag]);

  return <>
    {children}

    {!!searchHashtag && <HashtagSearchView hashtag={searchHashtag} handleClose={() => setSearchHashtag(null)} />}
  </>;
};

const App = () => {
  const {
    connectionsStore,
    sessionStore: { loading, currentUser, getCurrentUser },
    dictionariesStore: { fetchTags }
  } = stores;
  const [pendingFetchUser, setPendingFetchUser] = useState(hasToken() && !currentUser);

  useEffect(() => {
    fetchTags();

    if (hasToken()) {
      getCurrentUser();
    }
  }, []);

  useEffect(() => {
    setPendingFetchUser(hasToken() && !currentUser);
    if (currentUser) connectionsStore.fetchUsersMentions();
  }, [currentUser]);

  if (pendingFetchUser) return <Preloader/>;

  return (
    <BrowserRouter>
      <UseHistory>
        {parseStrBoolean(LANDING_MODE_ENABLED) ? <LandingRouter/> : <MainRouter />}

        <GalleryModal />
        <CreatePostModal />

        {loading && <Preloader position="fixed" backdrop />}
      </UseHistory>
    </BrowserRouter>
  );
};

export default observer(App);
