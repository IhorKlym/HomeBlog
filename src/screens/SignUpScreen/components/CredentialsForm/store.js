// @flow

import { observable, action, configure, runInAction } from 'mobx';
import usersApi from 'api/users.api';
import Validate from 'services/validation';

const fieldsToValidateCredentials = {
  email: 'email',
  password: 'password'
};

configure({ enforceActions: 'observed' });

type credentials = {
  email?: string,
  password?: string
}

class CredentialsFormStore {
  @observable loading: boolean = false;
  @observable credentials: credentials = {};
  @observable validationErrors: any = {};
  @observable errors: [] = [];
  @observable isValid: boolean = false;

  @action.bound
  validateForm() {
    const { isValid, errors } = Validate(this.credentials, fieldsToValidateCredentials);
    this.isValid = isValid;
    this.validationErrors = errors || {};
  }

  @action.bound
  handleChangeCredentials({ target: { name, value } }: { target: HTMLInputElement }) {
    this.credentials[name] = value;
    this.validateForm();
  }

  @action.bound
  signUp() {
    return new Promise<void>( async (resolve, reject) => {
      this.loading = true;

      const { isValid, errors } = Validate(this.credentials, fieldsToValidateCredentials);

      try {
        if (!isValid) throw(errors);

        const { data } = await usersApi.signUp({ ...this.credentials });

        runInAction(() => {
          this.loading = false;
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

export default new CredentialsFormStore();
