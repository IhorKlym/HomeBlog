// @flow

import React from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import Preloader from 'components/Preloader';
import RoundedButton from 'components/RoundedButton';
import GoogleLogo from 'static/img/google_logo.svg';
import stores from 'core/stores';
import { DEFAULT_LOGGED_USER_ROUTE } from 'helpers/consts';

import store from './store';

const { GOOGLE_APP_ID } = process.env;

type Props = {
  children: any,
  handleLogin?: any,
  onSuccess?: any
};

const GoogleLoginButton = ({ children, handleLogin, onSuccess }: Props) => {
  const { sessionStore: { getCurrentUser } } = stores;
  const { loading, loginWithGoogle } = store;
  const history = useHistory();

  const handleGoogleLogin = async (params: any) => {
    if (handleLogin) {
      handleLogin(params);
    } else {
      const data = await loginWithGoogle(params);
      if (data) {
        getCurrentUser().then((user) => {
          if (onSuccess) {
            onSuccess(user);
          } else if (user.state === 'active') {
            history.replace(DEFAULT_LOGGED_USER_ROUTE);
          } else if (user.state === 'pending') {
            history.replace('/sign-up/last');
          }
        });
      }
    }
  };

  return (
    <GoogleLogin
      clientId={GOOGLE_APP_ID}
      // clientId="7128566919-jt4lls6i9s4f4jidgnbumk64qqr1c8r3.apps.googleusercontent.com" // FOR LOCAL DEVELOPMENT ONLY ! provides access from localhost
      onSuccess={handleGoogleLogin}
      cookiePolicy='single_host_origin'
      scope='profile email https://www.googleapis.com/auth/contacts.readonly'
      render={renderProps => (
        <>
          <RoundedButton extended secondaryBlack onClick={renderProps.onClick}>
            <img src={GoogleLogo} alt="google"/>
            {children || 'SIGN UP WITH GOOGLE'}
          </RoundedButton>
          {loading && <Preloader position="fixed" backdrop/>}
        </>
      )}
    />
  );
};

GoogleLoginButton.defaultProps = {
  handleLogin: null,
  onSuccess: null
};

export default observer(GoogleLoginButton);
