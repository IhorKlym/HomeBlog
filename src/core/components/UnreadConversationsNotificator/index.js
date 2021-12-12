// @flow

import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import { formatTimeToLocal, getUserName } from 'helpers/methods';

import DropDown from 'components/DropDown';
import Avatar from 'components/Avatar';
import TextFormatted from 'components/TextFormatted';
import stores from 'core/stores';
import * as S from './styles';

const { UNREAD_MESSAGES_FETCH_INTERVAL } = process.env;
const fetchInterval = parseInt(UNREAD_MESSAGES_FETCH_INTERVAL || 0, 10);

const UnreadConversationsNotificator = () => {
  const { messengerStore, sessionStore: { currentUser } } = stores;
  const { unreadConversations } = messengerStore;
  const timeoutRef = useRef(null);

  const getParticipantsList = (participants) => (participants || []).reduce((str, participant, i) => {
    const { user } = participant;
    return `${str}${i === 0 ? '' : ', '}${getUserName(user)}`;
  }, '');

  useEffect(() => {
    messengerStore.getUnreadConversations();
    if (fetchInterval) {
      timeoutRef.current = setInterval(() => {
        messengerStore.getUnreadConversations();
      }, fetchInterval);
      return () => {
        if (timeoutRef.current !== null) clearInterval(timeoutRef.current);
      };
    }
  }, []);

  return (
    <DropDown notification
      forceRedirectOnClick
      label='Conversations'
      notifications={unreadConversations.length}
      hideList={!unreadConversations.length}
      redirectTo='/messenger'
    >
      {unreadConversations.length ?
        <NavLink activeClassName="active" className="nav-item" to='/messenger' exact><S.Link>View all conversation</S.Link></NavLink>
        :
        []}

      {unreadConversations.length ?
        unreadConversations.slice(0, 5).map(conv => {
          const otherParticipants = conv.participants.filter(participant => participant.user.id !== (currentUser || {}).id);
          return (
            <NavLink key={conv.id} className="nav-item"  activeClassName="active" to={`/messenger/${conv.id}`} exact onClick={e => e.stopPropagation()}>
              <S.Wrap>
                <S.UserCard>
                  <Avatar rounded size={40} user={otherParticipants.length ? otherParticipants[0].user : currentUser} />
                  <S.UserWrap>
                    <span>{getParticipantsList(otherParticipants)}</span>
                    <S.Time>{formatTimeToLocal(conv.message.createdAt)}</S.Time>
                  </S.UserWrap>
                </S.UserCard>
                <S.MessageText>{conv.message ? <TextFormatted highlight={['hashtags', 'mentions']} text={conv.message.body} /> : 'new message'}</S.MessageText>
              </S.Wrap>
            </NavLink>
          );
        })
        :
        []}
    </DropDown>
  );
};

export default observer(UnreadConversationsNotificator);
