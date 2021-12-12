// @flow

import { observable, action, flow, configure } from 'mobx';
import userApi from 'api/users.api';
import type { UserProfile } from 'helpers/types';

configure({ enforceActions: 'observed' });

class ConnectionsScreenStore {
  @observable loading: boolean = false;
  @observable user: UserProfile | any = null;
  @observable errors: [] = [];

  @action.bound
  clearStore() {
    this.errors = [];
    this.user = null;
  }

  getProfile = flow(function* fetch(userId: string) {
    this.loading = true;
    try {
      const request = userApi.getUser(userId);
      const { data } = yield request;

      this.loading = false;
      this.errors = [];
      this.user = data;
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  })
}

export default new ConnectionsScreenStore();
