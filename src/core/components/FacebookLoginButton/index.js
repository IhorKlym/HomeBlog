// @flow

import React from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Preloader from 'components/Preloader';
import Button from 'components/Button';
import stores from 'core/stores';
import { DEFAULT_LOGGED_USER_ROUTE } from 'helpers/consts';

import store from './store';

const { FACEBOOK_APP_ID } = process.env;

type Props = {
  children: any
};

const FacebookLoginButton = ({ children }: Props) => {
  const { sessionStore: { getCurrentUser } } = stores;
  const history = useHistory();
  const { loading, loginWithFacebook } = store;

  const handleFacebookLogin = async (params: any) => {
    const data = await loginWithFacebook(params);
    if (data) {
      getCurrentUser().then((user) => {
        if (user.state === 'active') {
          history.replace(DEFAULT_LOGGED_USER_ROUTE);
        } else if (user.state === 'pending') {
          history.replace('/sign-up/1');
        }
      });
    }
  };

  return (
    <FacebookLogin
      appId={FACEBOOK_APP_ID}
      callback={handleFacebookLogin}
      render={renderProps => (
        <>
          <Button fb extended onClick={renderProps.onClick}>
            {children || 'SIGN UP WITH FACEBOOK'}
          </Button>
          {loading && <Preloader position="fixed" backdrop/>}
        </>
      )}
    />
  );
};

export default observer(FacebookLoginButton);
