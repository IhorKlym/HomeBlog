// @flow

import { observable, action, configure, runInAction } from 'mobx';
import { setToken } from 'helpers/token';
import usersApi from 'api/users.api';

configure({ enforceActions: 'observed' });

class EmailConfirmationStore {
  @observable loading: boolean = false;
  @observable errors: [] = [];

  @action.bound
  confirmEmail(params: any) {
    return new Promise<void>( async (resolve, reject) => {
      this.loading = true;

      try {
        const { data } = await usersApi.confirmEmail(params);

        runInAction(() => {
          const tokenSession = data.token.toString();
          setToken(tokenSession);

          this.loading = false;
          this.errors = [];
        });
        resolve(data);
      } catch (error) {
        runInAction(() => {
          this.errors = error.errors;
          this.loading = false;
        });
        reject(error);
      }
    });
  };
}

export default new EmailConfirmationStore();
