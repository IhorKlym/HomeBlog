// @flow

import { observable, action, configure, runInAction } from 'mobx';
import usersApi from 'api/users.api';
import Validate from 'services/validation';

const fieldsToValidateCredentials = {
  password: 'password',
  passwordConfirmation: 'confirm_password'
};

configure({ enforceActions: 'observed' });

type credentials = {
  password?: string,
  passwordConfirmation?: string,
  resetPasswordToken?: string
}

class NewPasswordStore {
  @observable loading: boolean = false;
  @observable credentials: credentials = {};
  @observable formTouched: boolean = false;
  @observable validationErrors: any = {};
  @observable errors: [] = [];
  @observable isValid: boolean = false;

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
  updatePassword(token: string) {
    return new Promise<void>( async (resolve, reject) => {
      this.loading = true;
      this.formTouched = true;
      this.credentials.resetPasswordToken = token;

      const { isValid, errors } = Validate(this.credentials, fieldsToValidateCredentials);

      try {
        if (!isValid) throw(errors);

        await usersApi.updatePass({ ...this.credentials });

        runInAction(() => {
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

export default new NewPasswordStore();
