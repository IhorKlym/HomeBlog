import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import Avatar from 'components/Avatar';
import RoundedButton from 'components/RoundedButton';
import Preloader from 'components/Preloader';
import ConfirmModal from 'components/ConfirmModal';
import stores from 'core/stores';
import { getUserName, redirectToUser, getConnectionLevel, isUserPrivate, countToText } from 'helpers/methods';

import * as S from './styles';

type Props = {
  user: any,
  onActionPerformed?: (any) => any,
  xs?: boolean,
  withActions?: boolean,
  isConnection?: boolean
};

const UserCard = ({ user, xs, withActions, isConnection, onActionPerformed, ...props }: Props) => {
  const [loading, setLoading] = useState(false);
  const [confirmData, setConfirmData] = useState(null);
  const { connectionsStore, sessionStore: { currentUser } } = stores;
  const history = useHistory();
  const isCurrentUser = (user && user.id === currentUser.id);

  const handleRequestAction = (action) => {
    setLoading(true);
    connectionsStore[action](user).then((resp) => {
      if (onActionPerformed) onActionPerformed(resp);
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleDisconnect = () => {
    setConfirmData({
      text: `Are you sure that you want to delete ${getUserName(user)} from your connections?`,
      onCancel: () => setConfirmData(null),
      onConfirm: () => {
        setConfirmData(null);
        handleRequestAction('disconnect');
      }
    });
  };

  const userDegree = getConnectionLevel(user);
  const DegreeIcon = userDegree.icon;
  const isPrivate = !isConnection && isUserPrivate(user);

  return (
    <S.UserCard {...props} xs={xs} onClick={e => { e.stopPropagation(); redirectToUser(history, user); }}>
      <S.InfoCol xs={xs}>
        <S.AvatarCol xs={xs}>
          <Avatar rounded cover user={user} />
        </S.AvatarCol>

        <S.UserInfo>
          <S.UserName>
            {getUserName(user)}
            {!isConnection && !isCurrentUser && <DegreeIcon />}
          </S.UserName>
          {!isPrivate && <S.UserDesc>
            {countToText(user.connectionsCount || 0, 'connection')}
          </S.UserDesc>}
        </S.UserInfo>
      </S.InfoCol>

      {withActions && !isCurrentUser &&
        <S.Controls onClick={e => e.stopPropagation()}>
          {user.levelOfConnect !== 1 && !user.isSendRequest && !user.isReceiveRequest && <>
            <S.TooltipWrap>
              <RoundedButton xs transparent onClick={() => handleRequestAction('createRequest')}>Connect</RoundedButton>
              {!user.isSendRequest && <S.Tooltip> Add this person to your network.</S.Tooltip>}
            </S.TooltipWrap>
          </>}
          {user.levelOfConnect !== 1 && user.isReceiveRequest && <>
            <RoundedButton xs transparent onClick={() => handleRequestAction('acceptRequest')}>Accept</RoundedButton>
            <RoundedButton xs transparent onClick={() => handleRequestAction('declineRequest')}>Decline</RoundedButton>
          </>}
          {user.levelOfConnect !== 1 && user.isSendRequest && <>
            <RoundedButton xs transparent disabled>Request sent!</RoundedButton>
          </>}
          {user.levelOfConnect === 1 && <>
            <RoundedButton xs transparent onClick={handleDisconnect}>Disconnect</RoundedButton>
            <ConfirmModal data={confirmData} />
          </>}
          {user.visibility === 'public' &&
            <S.TooltipWrap>
              <RoundedButton xs primary onClick={() => handleRequestAction('followUser')}>
                {user.isFollowed ? 'Unfollow' : 'Follow'}
              </RoundedButton>
              {!user.isFollowed && <S.Tooltip>
                This person is public. You can click follow to see their content without connecting to their network.
              </S.Tooltip>}
            </S.TooltipWrap>}
        </S.Controls>}

      {loading && <Preloader backdrop size={36} />}
    </S.UserCard>
  );
};

UserCard.defaultProps = {
  xs: false,
  withActions: false,
  onActionPerformed: () => {},
  isConnection: false
};

export default observer(UserCard);
