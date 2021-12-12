// @flow

import React from 'react';
import { observer } from 'mobx-react';

import ScreenPage from 'components/ScreenPage';
import Logo from 'components/Logo';

import * as S from './styles';

const EmailConfirmationSentScreen = () => (
  <ScreenPage>
    <S.Wrap>
      <S.Container>
        <S.Item>
          <p>Thanks for signing up! <br /> We can’t wait to have you as a WeKnow Member. <br /> Please check your e-mail to confirm your address to get started</p>
        </S.Item>
        <Logo url='/' />
      </S.Container>
    </S.Wrap>
  </ScreenPage>
);

export default observer(EmailConfirmationSentScreen);
