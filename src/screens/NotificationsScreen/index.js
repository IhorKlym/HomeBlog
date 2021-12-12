// @flow
import React from 'react';
import { observer } from 'mobx-react';

import ScreenPage from 'components/ScreenPage';
import Notificator from 'components/Notificator';

import * as S from './styles';

const NotificationsScreen = () => (
  <ScreenPage withHeader withFooter>
    <S.Wrap>
      <Notificator />
    </S.Wrap>
  </ScreenPage>
);

export default observer(NotificationsScreen);
