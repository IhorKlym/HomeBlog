// @flow
import React, { useEffect, useState } from 'react';
import Avatar from 'components/Avatar';
import { useHistory } from 'react-router-dom';
import { getUserName, formatTimeToLocal } from 'helpers/methods';
import TextFormatted from 'components/TextFormatted';
import stores from 'core/stores';

import * as S from './styles';

type Props = {
  conversation: any,
  active?: boolean,
  unread?:boolean
}

const ConversationListItem = ({ conversation, active, unread }: Props) => {
  const { sessionStore: { currentUser } } = stores;
  const { id, participants = [], message, createdAt } = conversation;
  const history = useHistory();
  const otherParticipants = participants.filter(participant => participant.user.id !== (currentUser || {}).id);
  const [participantsList, setParticipantsList] = useState('');

  useEffect(() => {
    const list = otherParticipants.reduce((str, participant, i) => {
      const { user } = participant;
      return `${str}${i === 0 ? '' : ', '}${getUserName(user)}`;
    }, '');
    setParticipantsList(list);
  }, [otherParticipants.length]);

  return (
    <S.Conversation
      active={active}
      unread={unread}
      onClick={() => history.push(`/messenger/${id}`)}
    >
      <S.Inner>
        <S.AvatarWrap>
          <Avatar rounded cover user={otherParticipants.length ? otherParticipants[0].user : currentUser} />
        </S.AvatarWrap>
        <S.InfoCol>
          <S.Head>
            <S.Title>
              {participantsList || 'Me'}
            </S.Title>
            <S.Time>
              {formatTimeToLocal(message ? message.createdAt : createdAt)}
            </S.Time>
          </S.Head>
          <S.Message>
            {message ? <TextFormatted highlight={['hashtags', 'mentions']} text={message.body} /> : 'No messages yet'}
          </S.Message>
        </S.InfoCol>
      </S.Inner>
    </S.Conversation>
  );
};

ConversationListItem.defaultProps = {
  active: false,
  unread: false
};

export default ConversationListItem;
