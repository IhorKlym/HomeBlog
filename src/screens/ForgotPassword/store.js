// @flow

import { observable, action, configure, runInAction } from 'mobx';
import usersApi from 'api/users.api';
import Validate from 'services/validation';

const fieldsToValidateCredentials = {
  email: 'email'
};

configure({ enforceActions: 'observed' });

type credentials = {
  email?: string
}

class ForgotPasswordStore {
  @observable loading: boolean = false;
  @observable credentials: credentials = {};
  @observable formTouched: boolean = false;
  @observable validationErrors: any = {};
  @observable errors: [] = [];
  @observable isValid: boolean = false;
  @observable showMessage: boolean = false;

  @action.bound
  validateForm() {
    if (this.formTouched) {
      const { isValid, errors } = Validate(this.credentials, fieldsToValidateCredentials);
      this.isValid = isValid;
      this.validationErrors = errors || {};
    }
  }

  @action.bound
  handleChangeCredentials({ target: { name, value } }: { target: HTMLInputElement }) {
    this.credentials[name] = value;
    this.validateForm();
  }

  @action.bound
  resetPassword() {
    return new Promise<void>( async (resolve, reject) => {
      this.loading = true;
      this.formTouched = true;

      const { isValid, errors } = Validate(this.credentials, fieldsToValidateCredentials);

      try {
        if (!isValid) throw(errors);

        await usersApi.resetPass({ ...this.credentials });

        runInAction(() => {
          this.showMessage = true;
          this.loading = false;
          this.formTouched = false;
          this.validationErrors = {};
          this.errors = [];
        });
        resolve();
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

export default new ForgotPasswordStore();
