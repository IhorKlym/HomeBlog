// @flow

import { observable, action, configure, flow } from 'mobx';
import usersApi from 'api/users.api';
import profileApi from 'api/profile.api';
import Validate from 'services/validation';
import toaster from 'services/toaster';
import type { UserProfile } from 'helpers/types';

const fieldsToValidate = {
  firstName: {
    format: {
      pattern: /^(?!\s*$).+/,
      message: 'First Name length should be 2 or more symbols'
    },
    length: {
      minimum: 2,
      message: 'First Name length should be 2 or more symbols'
    }
  },
  lastName: {
    format: {
      pattern: /^(?!\s*$).+/,
      message: 'Last Name length should be 2 or more symbols'
    },
    length: {
      minimum: 2,
      message: 'Last Name length should be 2 or more symbols'
    }
  },
  businessName: {
    format: {
      pattern: /^(?!\s*$).+/,
      message: 'Business Name length should be 2 or more symbols'
    },
    length: {
      minimum: 2,
      message: 'Business Name length should be 2 or more symbols'
    }
  },
  bio: {
    format: {
      pattern: /^$|^((?!\s*$)(.|\n)+){1,350}/,
      message: '350 character limit'
    }
  },
  location: 'presence',
  skin: 'presence'
};

const fieldsToValidateCredentials = {
  currentPassword: 'presence',
  password: 'password',
  passwordConfirmation: 'confirm_password'
};

type credentials = {
  currentPassword?: string,
  password?: string,
  passwordConfirmation?: string
}

configure({ enforceActions: 'observed' });

class EditProfileStore {
  @observable loading: boolean = false;
  @observable user: UserProfile = {};
  @observable credentials: credentials = {};
  @observable validationErrors: any = {};
  @observable errors: [] = [];
  @observable isValid: boolean = false;

  @action.bound
  validateForm() {
    const { isValid, errors } = Validate(this.user, fieldsToValidate);
    this.isValid = isValid;
    this.validationErrors = errors || {};
  }

  @action.bound
  handleChangeCredentials({ target: { name, value } }: { target: HTMLInputElement }) {
    this.credentials[name] = value;
    this.validateForm();
  }

  @action.bound
  handleChange({ target: { name, value } }: { target: HTMLInputElement }) {
    this.user[name] = value;
    this.validateForm();
  }

  @action.bound
  handleChangeOption({ name, value } : { name: string, value: any }) {
    this.user[name] = value;
    this.validateForm();
  }

  @action
  handleChangeAddress(location: any) {
    this.user = { ...this.user, ...location };
    this.validateForm();
  }

  @action.bound
  async handleChangeAvatar(file: any, data: any) {
    if (file) this.user.avatarUrl = file.src;
    if (data) this.user.avatarData = data.imageData;
    this.validateForm();
  }

  getProfile = flow(function* fetch() {
    this.loading = true;
    try {
      const { data } = yield usersApi.getCurrentUser();
      this.loading = false;
      this.errors = [];
      if (data) this.user = data;
      return data;

    } catch (error) {
      this.loading = false;
      this.errors = error.errors;
    }
  });

  saveProfile = flow(function* fetch() {
    this.loading = true;
    const { password, passwordConfirmation } = this.credentials;
    const changePass = (password || passwordConfirmation);

    let { isValid, errors } = Validate(this.user, fieldsToValidate);
    if (changePass) {
      const changePassValid = Validate(this.credentials, fieldsToValidateCredentials);
      if (!changePassValid.isValid) {
        isValid = false;
        errors = { ...errors, ...changePassValid.errors };
      }
    }

    try {
      if (!isValid) throw(errors);

      const { data } = yield profileApi.updateProfile({ ...this.user });
      if (changePass) {
        yield usersApi.changePass({ ...this.credentials });
        toaster.updated('You have successfully changed password.', {}, 'success');
      }
      this.loading = false;
      this.isValid = false;
      this.validationErrors = {};
      this.credentials = {};
      this.errors = [];
      return data;

    } catch (error) {
      this.loading = false;
      this.validationErrors = errors || {};
      this.errors = error.errors;
    }
  });
}

export default new EditProfileStore();
