// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import ScreenPage from 'components/ScreenPage';
import Container from 'components/Container';

import useWindowSize from 'hooks/windowSize';
import ConversationsList from './components/ConversationsList';
import Messenger from './components/Messenger';

import * as S from './styles';

const MessengerScreen = () => {
  const { conversationId } = useParams();
  const windowSize = useWindowSize();
  const mobileDeviсe = windowSize.width < 768;

  return (
    <ScreenPage withHeader withFooter={!mobileDeviсe}>
      <S.Wrap>
        <Container>
          <S.Body>
            <S.ConversationsCol>
              <ConversationsList />
            </S.ConversationsCol>

            <S.MessengerCol
              visibilityMobile={conversationId}
            >
              {conversationId ?
                <Messenger />
                :
                <S.EmptyMessenger>
                  <p>Nothing to show</p>
                  <p>Create your first conversation</p>
                </S.EmptyMessenger>}
            </S.MessengerCol>
          </S.Body>
        </Container>
      </S.Wrap>
    </ScreenPage>
  );
};

export default observer(MessengerScreen);
