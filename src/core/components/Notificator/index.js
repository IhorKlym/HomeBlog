// @flow

import React, { useRef, useState, useEffect, Fragment } from 'react';
import { observer } from 'mobx-react';

import InfiniteScroll from 'react-infinite-scroller';
import Container from 'components/Container';
import Notification from 'components/Notification';
import DropDown from 'components/DropDown';
import Preloader from 'components/Preloader';
import stores from 'core/stores';

import * as S from './styles';

const { UNREAD_NOTIFICATIONS_FETCH_INTERVAL } = process.env;
const fetchInterval = parseInt(UNREAD_NOTIFICATIONS_FETCH_INTERVAL || 0, 10);

type Props = {
  inDropDown?: boolean
};

const getNotificationPriority = (notification: any) => {
  if (notification.notifyType === 'requests::send') return 2;
  if (!notification.readAt) return 1;
  return 0;
};

const sortNotifications = (a: any, b: any) => {
  const priorutiA = getNotificationPriority(a);
  const priorutiB = getNotificationPriority(b);
  if (priorutiB === priorutiA) return new Date(b.createdAt) - new Date(a.createdAt);
  return priorutiB - priorutiA;
};

const Notificator = (props: Props) => {
  const { inDropDown } = props;
  const { notificatorStore } = stores;
  const { unreadNotifications, loading, readNotifications, unreadNotificationsCount, totalNotificationsCount } = notificatorStore;
  const timeoutRef = useRef(null);
  const scrollParentRef = useRef(null);
  const [hasMore, setHasMore] = useState(false);
  const allNotifications = [...unreadNotifications, ...readNotifications].sort(sortNotifications);

  const fetchNotifications = async (fetchMore?: boolean) => {
    setHasMore(false);
    const data = await notificatorStore.getNotifications(fetchMore);
    if (data.length) setHasMore(true);
  };

  const handleLoadMoreNotifications = () => {
    fetchNotifications(true);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (inDropDown && fetchInterval) {
      notificatorStore.getUnreadNotifications();
      timeoutRef.current = setInterval(() => {
        notificatorStore.getUnreadNotifications();
      }, fetchInterval);
      return () => {
        if (timeoutRef.current !== null) clearInterval(timeoutRef.current);
      };
    }
  }, [inDropDown]);

  const renderNotificationsList = () => {
    let connectionRequestsTitleShowed = false;
    let notificationsTitleShowed = false;
    return allNotifications.map(notification => {
      let title;
      if (notification.notifyType === 'requests::send') {
        if (!connectionRequestsTitleShowed) {
          title = 'Connection Requests';
          connectionRequestsTitleShowed = true;
        }
      } else if (!notificationsTitleShowed) {
        title = 'Notifications';
        notificationsTitleShowed = true;
      }
      return <Fragment key={notification.id}>
        {!!title && <S.NotificationTitle className="notif-title no-border nav-item">{title}</S.NotificationTitle>}
        <Notification nav notification={notification} />
      </Fragment>;
    });
  };

  return inDropDown ?
    <DropDown notification
      forceRedirectOnClick
      label='Notifications'
      notifications={unreadNotifications.length}
      redirectTo='/notifications'
    >
      {renderNotificationsList()}
    </DropDown>

    :

    <Container>
      <h3>Notifications ({unreadNotificationsCount})</h3>

      <S.List ref={scrollParentRef}>
        <InfiniteScroll
          loadMore={handleLoadMoreNotifications}
          hasMore={!loading && hasMore}
          useWindow={false}
          getScrollParent={() => scrollParentRef.current}
        >
          {renderNotificationsList()}

          {!totalNotificationsCount &&
            <S.NoDataWrap>
              <h6>Nothing to show</h6>
            </S.NoDataWrap>}
        </InfiniteScroll>
      </S.List>

      {loading && <Preloader position="fixed" backdrop />}
    </Container>;
};

Notificator.defaultProps = {
  inDropDown: false
};

export default observer(Notificator);
