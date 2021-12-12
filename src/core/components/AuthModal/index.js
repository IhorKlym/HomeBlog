// @flow

import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import RoundedButton from 'components/RoundedButton';
import Modal from 'components/Modal';
import stores from 'core/stores';

import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import * as S from './styles';

type Props = {
  disableLogin?: boolean,
  disableSignUP?: boolean,
  loginTitle?: any,
  signUpTitle?: any,
  mode?: any,
  renderToggler?: any | (params: any) => any,
  redirectActiveUser?: any | string
};

const AuthModal = (props: Props) => {
  const { mode: providedMode, disableLogin, disableSignUP, renderToggler, loginTitle, signUpTitle, redirectActiveUser, ...rest } = props;
  const [mode, setMode] = useState(providedMode || (!disableSignUP ? 'login' : 'sign-up'));
  const { helperStore } = stores;
  const { showLoginModal } = helperStore;

  const handleOpenLogin = () => {
    setMode('login');
    helperStore.setShowLoginModal(true);
  };

  const handleOpenSignUp = () => {
    setMode('signup');
    helperStore.setShowLoginModal(true);
  };

  const handleClose = () => {
    helperStore.setShowLoginModal(false);
  };

  useEffect(() => {
    if (providedMode) {
      helperStore.setShowLoginModal(true);
      setMode(providedMode);
    }
  }, [providedMode]);

  return (
    <>
      {renderToggler ?
        renderToggler({ handleOpenLogin, handleOpenSignUp })
        :
        <S.AuthButtons>
          <RoundedButton xs secondaryBlue onClick={handleOpenLogin}>
            Log in
          </RoundedButton>
          <RoundedButton xs primary onClick={handleOpenSignUp}>
            Sign Up
          </RoundedButton>
        </S.AuthButtons>}

      <Modal {...rest}
        header={mode === 'login' ? loginTitle : signUpTitle}
        open={showLoginModal}
        auth
        md
        onClose={() => helperStore.setShowLoginModal(false)}
      >
        {mode === 'login' && !disableLogin && <>
          <LoginForm
            disableSignUP={disableSignUP}
            toSignUp={() => setMode('signup')}
            onClose={handleClose}
            redirectActiveUser={redirectActiveUser}
          />
        </>}
        {mode === 'signup' && !disableSignUP && <>
          <SignUpForm
            disableLogin={disableLogin}
            toLogin={() => setMode('login')}
            onClose={handleClose}
            redirectActiveUser={redirectActiveUser}
          />
        </>}
      </Modal>
    </>
  );
};

AuthModal.defaultProps = {
  disableLogin: false,
  disableSignUP: false,
  loginTitle: 'Login',
  signUpTitle: 'Sign Up',
  mode: null,
  renderToggler: null,
  redirectActiveUser: null
};

export default observer(AuthModal);
