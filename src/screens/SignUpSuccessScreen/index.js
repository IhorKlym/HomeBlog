// @flow

import React from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';

import ScreenPage from 'components/ScreenPage';
import Logo from 'components/Logo';
import Avatar from 'components/Avatar';
import CreatePostButton from 'components/CreatePostButton';
import RoundedButton from 'components/RoundedButton';
import BrushedText from 'components/BrushedText';

import stores from 'core/stores';
import { getUserName, parseStrBoolean } from 'helpers/methods';
import { findTheme } from 'helpers/skins';
import { DEFAULT_LOGGED_USER_ROUTE } from 'helpers/consts';

import * as S from './styles';

const { LANDING_MODE_ENABLED } = process.env;

const SignUpSuccessScreen = () => {
  const { sessionStore: { currentUser } } = stores;
  const history = useHistory();

  const userTheme = (currentUser && currentUser.skin && currentUser.skin.id) || null;
  const currentTheme = findTheme(userTheme);

  const handleStartExploring = () => {
    history.replace(DEFAULT_LOGGED_USER_ROUTE);
  };

  return (
    <ScreenPage>
      <S.Wrap theme={userTheme}>
        <S.Container>
          <Logo
            white={false}
          />

          <h3>Thanks,
            <BrushedText
              color={currentTheme.borderColor}>
              {getUserName(currentUser, false, true)}!
            </BrushedText>
          </h3>

          <Avatar rounded size={160} user={currentUser} />

          {parseStrBoolean(LANDING_MODE_ENABLED) ?
            <>
              <p>Now you’re in the know... stay tuned for launch!</p>
              <S.ButtonWrap />
            </>
            :
            <>
              <p>You’re ready to begin exploring and giving advice on WeKnow. Is there a question you’d like to ask right away?</p>

              <S.ButtonWrap>
                <RoundedButton md secondaryBlue onClick={handleStartExploring}>
                  Start Exploring
                </RoundedButton>

                <CreatePostButton onSuccess={() => history.replace('/me')} />
              </S.ButtonWrap>
            </>}

        </S.Container>
      </S.Wrap>
    </ScreenPage>
  );
};

export default observer(SignUpSuccessScreen);
