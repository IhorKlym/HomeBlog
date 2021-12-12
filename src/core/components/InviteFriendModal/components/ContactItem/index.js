import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import Avatar from 'components/Avatar';
import RoundedButton from 'components/RoundedButton';
import Preloader from 'components/Preloader';
import stores from 'core/stores';
import { getUserName } from 'helpers/methods';

import * as S from '../../styles';

const ContactItem = ({ contact, sendInvite }: Props) => {
  const [loading, setLoading] = useState(false);
  const [invitationType, setInvitationType] = useState('');
  const { connectionsStore } = stores;
  const history = useHistory();

  const handleInvite = () => {
    setLoading(true);
    sendInvite(contact.email).then(() => {
      setInvitationType('sent_email_invite');
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleAction = (action, nextType) => {
    setLoading(true);
    action({ id: contact.userId, type: 'users' }).then(() => {
      setInvitationType(nextType);
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    setInvitationType(contact.invitationType);
  }, [contact.invitationType]);

  return (
    <S.Contact key={contact.id}>
      {!contact.userId ?
        <span>{contact.email}</span>
        :
        <>
          <S.ContactAvatar onClick={() => history.push(`/users/${contact.userId}`)}>
            <Avatar cover user={{ ...contact, avatarUrl: contact.image }} />
          </S.ContactAvatar>

          <S.ContactInfo>
            <span>{getUserName(contact)}</span>
            <span>{contact.email}</span>
          </S.ContactInfo>
        </>}

      {invitationType === 'not_in_system' &&
        <RoundedButton md primary onClick={handleInvite}>
          Invite
        </RoundedButton>}

      {invitationType === 'sent_email_invite' &&
        <RoundedButton md primary disabled>
          Invitation Sent!
        </RoundedButton>}

      {invitationType === 'connected' &&
        <RoundedButton md primary disabled>
          Connected
        </RoundedButton>}

      {invitationType === 'friend_requests' &&
        <div>
          <RoundedButton md primary onClick={() => handleAction(connectionsStore.acceptRequest, 'connected')}>Accept</RoundedButton>
          <RoundedButton md primary onClick={() => handleAction(connectionsStore.declineRequest, '')}>Decline</RoundedButton>
        </div>}

      {invitationType === 'sent_requests' &&
        <RoundedButton md primary disabled>
          Request sent!
        </RoundedButton>}

      {invitationType === 'can_requests' &&
        <RoundedButton md primary onClick={() => handleAction(connectionsStore.createRequest, 'sent_requests')}>
          Connect
        </RoundedButton>}

      {loading && <Preloader backdrop size={36} />}
    </S.Contact>
  );
};

export default observer(ContactItem);
