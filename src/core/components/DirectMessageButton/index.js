// @flow
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import Button from 'components/Button/styles';
import { IconEmail } from 'styles/icons';
import Preloader from 'components/Preloader';

import stores from 'core/stores';

import * as S from './styles';

type Props = {
  user: any,
  children?: any,
  color: boolean
};

const DirectMessageButton = ({ user, children, color }: Props) => {
  const [loading, setLoading] = useState(false);
  const { messengerStore } = stores;
  const history = useHistory();

  const handleSendMessage = async () => {
    setLoading(true);
    const participants = [user];
    let [conversation] = await messengerStore.findConversationsByParticipants(participants, true);
    if (!conversation) {
      conversation = await messengerStore.createConversation('', participants);
    }
    setLoading(false);
    history.push(`/messenger/${conversation.id}`);
  };

  return (
    <S.Wrap textColor={color}>
      <S.Button onClick={handleSendMessage}>
        {children || <Button text><IconEmail /> Message</Button>}
      </S.Button>

      {loading && <Preloader size={16} />}
    </S.Wrap>
  );
};

DirectMessageButton.defaultProps = {
  children: null
};

export default observer(DirectMessageButton);
