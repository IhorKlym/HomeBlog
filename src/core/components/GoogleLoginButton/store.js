// @flow

import { observable, action, configure, runInAction } from 'mobx';
import { setToken } from 'helpers/token';
import { keysCamelToSnake } from 'helpers/methods';
import usersApi from 'api/users.api';

configure({ enforceActions: 'observed' });

class GoogleLoginStore {
  @observable loading: boolean = false;
  @observable errors: [] = [];

  @action.bound
  loginWithGoogle(requestData: any) {
    return new Promise<void>( async (resolve, reject) => {
      this.loading = true;
      try {
        const { data } = await usersApi.signUpSocial('google', keysCamelToSnake(requestData));

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
        reject();
      }
    });
  };
}

export default new GoogleLoginStore();
