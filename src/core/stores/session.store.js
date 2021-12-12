// @flow

import { observable, action, configure, runInAction, computed } from 'mobx';
import userApi from 'api/users.api';
import { redirectToAuth } from 'helpers/auth';
import { checkFrontBuildVersion } from 'helpers/methods';

configure({ enforceActions: 'observed' });

class SessionStore {
  @observable currentUser = null;
  @observable loading: boolean = false;
  @observable errors: any = [];
  @computed get isUserLoggedIn() { return !!this.currentUser; }

  @action.bound
  getCurrentUser() {
    return new Promise<void>(async (resolve, reject) => {
      this.loading = true;
      try {

        const { data } = await userApi.getCurrentUser();

        runInAction(() => {
          this.loading = false;
          this.setCurrentUser(data);
          if (data.frontVersion) checkFrontBuildVersion(data.frontVersion);
          resolve(data);
        });

      } catch (error) {
        runInAction(() => {
          this.loading = false;
          this.errors = error.errors;
          reject();
        });
      }
    });
  }

  @action.bound
  setCurrentUser(user: any) {
    if (user) {
      this.currentUser = user;
    }
  }

  @action.bound
  async logOutUser() {
    try {
      
      redirectToAuth();

      runInAction(() => {
        this.currentUser = null;
      });
    } catch (error) {
      runInAction(() => {
        this.errors = error.errors;
      });
    }
  }
}

export default new SessionStore();
