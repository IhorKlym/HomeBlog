// @flow

import React, { useRef } from 'react';
import { observer } from 'mobx-react';
import { Link, useHistory } from 'react-router-dom';

import Input from 'components/Input';
import Button from 'components/Button';
import RoundedButton from 'components/RoundedButton';
import GoogleLoginButton from 'components/GoogleLoginButton';
import Preloader from 'components/Preloader';
import stores from 'core/stores';
import { DEFAULT_LOGGED_USER_ROUTE } from 'helpers/consts';

import * as S from '../styles';
import store from '../login.store';

const LoginForm = ({ toSignUp, onClose, disableSignUP, redirectActiveUser }: any) => {
  const { sessionStore: { getCurrentUser } } = stores;
  const { login, user, handleChange, validationErrors, loading } = store;
  const history = useHistory();
  const formSubmittedRef = useRef(false);

  const handleRedirectByUserState = (savedUser: any) => {
    if (savedUser.state === 'active') {
      history.replace(redirectActiveUser || DEFAULT_LOGGED_USER_ROUTE);
    } else if (savedUser.state === 'pending') {
      history.replace('/sign-up/last');
    }
  };

  const handleLoginWithGoogle = (savedUser: any) => {
    onClose();
    handleRedirectByUserState(savedUser);
  };

  const handleSubmit = () => {
    if (formSubmittedRef.current) return;
    formSubmittedRef.current = true;
    login().then(() => {
      getCurrentUser().then((savedUser) => {
        onClose();
        handleRedirectByUserState(savedUser);
      });
    }).finally(() => {
      formSubmittedRef.current = false;
    });
  };

  const handleInputKeyPress = (e: any) => {
    if (e && e.key === 'Enter') handleSubmit();
  };

  return (
    <S.Form>
      <S.AuthWrap>
        <S.AuthItem>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={user.email}
            onChange={handleChange}
            error={validationErrors.email}
            onKeyPress={handleInputKeyPress}
          />
        </S.AuthItem>

        <S.AuthItem>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            defaultValue={user.password}
            onChange={handleChange}
            error={validationErrors.password}
            onKeyPress={handleInputKeyPress}
          />
        </S.AuthItem>
      </S.AuthWrap>

      <S.Text>or</S.Text>

      <S.ButtonWrap>
        <GoogleLoginButton onSuccess={handleLoginWithGoogle}>
          Login with Google
        </GoogleLoginButton>
      </S.ButtonWrap>

      <RoundedButton primary extended onClick={handleSubmit}>
        Log In
      </RoundedButton>

      <Link to="/forgot-password">Forgot Password?</Link>

      {!disableSignUP && <p><span>Don’t have an account? </span>
        <Button transparent text onClick={toSignUp}>
           Sign Up
        </Button>
      </p>}

      {loading && <Preloader position="fixed" backdrop/>}
    </S.Form>
  );
};

export default observer(LoginForm);
