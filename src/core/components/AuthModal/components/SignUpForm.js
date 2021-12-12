// @flow

import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from 'components/Button';
import RoundedButton from 'components/RoundedButton';
import GoogleLoginButton from 'components/GoogleLoginButton';
import { DEFAULT_LOGGED_USER_ROUTE } from 'helpers/consts';
import { IconEmail } from 'styles/icons';

import * as S from '../styles';

const SignUpForm = ({ toLogin, onClose, disableLogin, redirectActiveUser }: any) => {
  const history = useHistory();

  const handleSignUpWithEmail = () => {
    onClose();
    history.push('/sign-up');
  };

  const handleRedirectByUserState = (user: any) => {
    if (user.state === 'active') {
      history.replace(redirectActiveUser || DEFAULT_LOGGED_USER_ROUTE);
    } else if (user.state === 'pending') {
      history.replace('/sign-up/last');
    }
  };

  const handleSignUpWithGoogle = (user: any) => {
    onClose();
    handleRedirectByUserState(user);
  };

  return (
    <S.Form>
      <S.AuthWrap>
        <GoogleLoginButton onSuccess={handleSignUpWithGoogle}>
          Continue with Google
        </GoogleLoginButton>
      </S.AuthWrap>

      <S.Text>or</S.Text>

      <RoundedButton secondaryBlack extended onClick={handleSignUpWithEmail}>
        <IconEmail />
        Continue with Email
      </RoundedButton>

      {!disableLogin && <p><span>Already have an account? </span>
        <Button transparent text onClick={toLogin}>
          Log In
        </Button>
      </p>}
    </S.Form>
  );
};

export default SignUpForm;
