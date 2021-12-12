// @flow

import { observable, action, configure, runInAction } from 'mobx';
import { setToken } from 'helpers/token';
import usersApi from 'api/users.api';
import Validate from 'services/validation';

const fieldsToValidate = {
  email: 'email',
  password: 'presence'
};

configure({ enforceActions: 'observed' });

type user = {
  email?: string,
  password?: string
}

class LoginStore {
  @observable loading: boolean = false;
  @observable user: user = {};
  @observable formTouched: boolean = false;
  @observable validationErrors: any = {};
  @observable errors: [] = [];
  @observable isValid: boolean = false;

  @action.bound
  validateForm() {
    if (this.formTouched) {
      const { isValid, errors } = Validate(this.user, fieldsToValidate);
      this.isValid = isValid;
      this.validationErrors = errors || {};
    }
  }

  @action.bound
  handleChange({ target: { name, value } }: { target: HTMLInputElement }) {
    this.user[name] = value;
    this.validateForm();
  }

  @action.bound
  login() {
    return new Promise<void>( async (resolve, reject) => {
      this.loading = true;
      this.formTouched = true;

      const { isValid, errors } = Validate(this.user, fieldsToValidate);

      try {
        if (!isValid) throw(errors);

        const { data } = await usersApi.login({ ...this.user });

        runInAction(() => {
          const tokenSession = data.token.toString();
          setToken(tokenSession);

          this.loading = false;
          this.formTouched = false;
          this.validationErrors = {};
          this.errors = [];
        });
        resolve(data);
      } catch (error) {
        runInAction(() => {
          this.validationErrors = errors || {};
          this.errors = error.errors;
          this.loading = false;
        });
        reject();
      }
    });
  };
}

export default new LoginStore();
