// @flow

import { observable, flow, configure, action, computed, set } from 'mobx';
import notificationsApi from 'api/notifications.api';
import moment from 'moment';

configure({ enforceActions: 'observed' });

class NotificatorStore {
  @observable loading: boolean = false;
  @observable notificationsMap: any = new Map();
  @observable errors: any[] = [];

  @computed get unreadNotifications() {
    let arr: any = Array.from<any>(this.notificationsMap.values()) || [];
    arr = arr.filter(item => !item.readAt);
    return arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  @computed get unreadNotificationsCount() {
    return this.unreadNotifications.length || 0;
  }

  @computed get readNotifications() {
    let arr: any  = Array.from<any>(this.notificationsMap.values()) || [];
    arr = arr.filter(item => !!item.readAt);
    return arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  @computed get readNotificationsCount() {
    return this.readNotifications.length || 0;
  }

  @computed get totalNotificationsCount() {
    return this.unreadNotificationsCount + this.readNotificationsCount;
  }

  getUnreadNotifications = flow(function* fetch() {
    try {
      const params = {
        filter: {
          unread: true
        }
      };
      const { data } = yield notificationsApi.getAllNotifications(params);
      this.errors = [];
      data.forEach(notification => {
        this.notificationsMap.set(notification.id, notification);
      });
      return data;
    } catch (error) {
      this.errors = error.errors;
    }
  });

  getNotifications = flow(function* fetch(fetchMore: ?boolean) {
    this.loading = true;
    try {
      const params = {
        filter: {
          unread: false
        },
        page: {
          offset: fetchMore ? this.totalNotificationsCount : 0,
          limit: 40
        }
      };
      const { data } = yield notificationsApi.getAllNotifications(params);
      this.errors = [];
      data.forEach(notification => {
        this.notificationsMap.set(notification.id, notification);
      });
      this.loading = false;
      return data;
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  });

  readAllNotifications = flow(function* read() {
    try {
      const { data: notification } = yield notificationsApi.readAllNotifications();

      this.errors = [];
      return notification;
    } catch (error) {
      this.errors = error.errors;
    }
  });

  readNotification = flow(function* read(notification: any) {
    try {
      yield notificationsApi.readNotification(notification.id);
      set(notification, 'readAt', moment().format('YYYY-MM-DD HH:mm'));
      this.errors = [];
      return notification;
    } catch (error) {
      this.errors = error.errors;
    }
  });

  @action.bound
  removeNotification(notification: any) {
    try {
      this.notificationsMap.delete(notification.id);
    } catch (error) {
      this.errors = error.errors;
    }
  };

}

export default new NotificatorStore();
