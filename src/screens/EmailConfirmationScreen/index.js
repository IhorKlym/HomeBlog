// @flow

import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';
import qs from 'qs';

import ScreenPage from 'components/ScreenPage';
import Preloader from 'components/Preloader';
import Logo from 'components/Logo';

import stores from 'core/stores';
import * as S from './styles';
import store from './store';

type Props = {
  ...RouteComponentProps
}

const EmailConfirmationScreen = (props: Props) => {

  const { loading, confirmEmail } = store;
  const { sessionStore: { getCurrentUser } } = stores;
  const { location: { search } } = props;
  const query = qs.parse(search, { ignoreQueryPrefix: true });
  const confirmationToken = query.confirmation_token;

  useEffect(() => {
    if (confirmationToken) {
      confirmEmail({ confirmationToken }).then(async () => {
        await getCurrentUser();
        props.history.replace('/sign-up/1');
      });
    }
  }, [confirmationToken]);

  return (
    <ScreenPage>
      <S.Wrap>
        <S.Container>
          <S.Item>
            <p>Confirming your account...</p>
          </S.Item>
          <Logo url='/' />
        </S.Container>
        {loading && <Preloader position="fixed" backdrop/>}
      </S.Wrap>
    </ScreenPage>
  );
};

export default observer(EmailConfirmationScreen);
