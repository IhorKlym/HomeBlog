// @flow

import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import Avatar from 'components/Avatar';
import stores from 'core/stores';
import RoundedButton from 'components/RoundedButton';
import Preloader from 'components/Preloader';
import TextFormatted from 'components/TextFormatted';
import { getTimeAgoLocal, getUserName, redirectToUser } from 'helpers/methods';

import * as S from './styles';

type Props = {
  notification: any
};

const Notification = (props: Props) => {
  const { notificatorStore, connectionsStore } = stores;
  const { notification, ...restProps } = props;
  const { actor, target, message, createdAt, notifyType, readAt } = notification;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const isUnread = !readAt;

  const handleClickNotification = async (e) => {
    if (isUnread) {
      e.preventDefault();
      e.stopPropagation();
      await notificatorStore.readNotification(notification);
      notificatorStore.getUnreadNotifications();
    }
  };

  const handleRequestAction = (e: any, action: any) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    action(actor)
      .finally(() => {
        setLoading(false);
        notificatorStore.removeNotification(notification);
      });
  };

  const redirectToActor = (e) => {
    if (!isUnread) {
      e.preventDefault();
      e.stopPropagation();
    }
    redirectToUser(history, actor);
  };

  const renderNotificationBody = () => {
    const [notifyGroup, notifyAction] = notifyType.split('::');
    switch (notifyGroup) {
    case 'requests':
      return (
        notifyAction === 'accept' ?
          <S.Title>
            {message} <S.Link onClick={redirectToActor}> {getUserName(actor)}</S.Link>
          </S.Title>
          :
          <S.Title>
            <S.Link onClick={redirectToActor}> {getUserName(actor)}</S.Link> {message}
          </S.Title>
      );

    case 'posts':
      return (
        notifyAction === 'tagging' ?
          <S.Title>
            <S.Link onClick={redirectToActor}>{getUserName(actor)}</S.Link> has been tagged you in post {!!target && <S.Link onClick={() => history.push(`/posts/${target.id}`)}>
              &quot;<TextFormatted highlight={['hashtags', 'mentions']} text={target.content || ''} maxLength={20} />&quot;
            </S.Link>}.
          </S.Title>
          :
          <S.Title>
            New answer for post {!!target && <S.Link onClick={() => history.push(`/posts/${target.id}`)}>
              &quot;<TextFormatted highlight={['hashtags', 'mentions']} text={target.content || ''} maxLength={20} />&quot;
            </S.Link>} was submitted by <S.Link onClick={redirectToActor}>{getUserName(actor)}</S.Link>.
          </S.Title>
      );

    default:
    }
  };

  const renderActions = () => {
    switch (notifyType) {
    case 'requests::send':
      return ((actor && actor.levelOfConnect !== 1 && actor.isReceiveRequest && target && target.state === 'requested') && <S.Actions>
        <RoundedButton xs text transparent onClick={(e) => handleRequestAction(e, connectionsStore.acceptRequest)}>
          Accept
        </RoundedButton>
        <RoundedButton xs text transparent onClick={(e) => handleRequestAction(e, connectionsStore.declineRequest)}>
          Decline
        </RoundedButton>
      </S.Actions>);

    default:
    }
  };

  return (
    <S.Notification {...restProps}
      className="notification"
      unread={isUnread}
      onClick={handleClickNotification}
    >
      <S.AvatarWrap onClick={redirectToActor}>
        <Avatar rounded cover user={actor} />
      </S.AvatarWrap>
      <S.Content>
        {renderNotificationBody()}
        <S.Time>
          {getTimeAgoLocal(createdAt)}
        </S.Time>
      </S.Content>
      {renderActions()}

      {loading && <Preloader backdrop size={36} />}
    </S.Notification>
  );
};

export default observer(Notification);
