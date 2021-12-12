// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import ScreenPage from 'components/ScreenPage';
import AuthModal from 'components/AuthModal';
import RoundedButton from 'components/RoundedButton';
import { primary } from 'styles/colors';

import * as S from './styles';

const LandingScreen = () => (
  <ScreenPage
    withTopBar
    withHeader headerProps={{ backgroundColor: primary, darkMode: true }}
    withTheme theme="SYSTEM"
    style={{ backgroundColor: primary }}
  >
    <S.Wrap>
      <S.TitleWrap>
        <h1>We Know... Do You?</h1>
        <h3>Coming soon...</h3>
      </S.TitleWrap>
      <S.ButtonsWrap>
        <AuthModal
          signUpTitle={<S.ModalTitle>
            Sign up now to be the first <br /> to find out when we launch
          </S.ModalTitle>}
          disableLogin
          renderToggler={({ handleOpenSignUp }) => (
            <RoundedButton sm transparentWhite onClick={handleOpenSignUp}>
              Sign Up
            </RoundedButton>
          )}
          redirectActiveUser='/sign-up/success'
        />
      </S.ButtonsWrap>
      <S.Footer>
        <Link to='/terms-and-conditions'>
          Terms and Conditions
        </Link>
        <Link to='/privacy-and-policy'>
          Privacy and Policy
        </Link>
      </S.Footer>
    </S.Wrap>
  </ScreenPage>
);

export default observer(LandingScreen);
