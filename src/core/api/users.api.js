// @flow

import qs from 'qs';
import Api from './ApiBase';

const defaultParams = {
  include: 'skin'
};

class UserApi extends Api {
  serializerType = 'users';

  serializerOptions = {
    attributes: [
      'email',
      'currentPassword',
      'password',
      'passwordConfirmation',
      'confirmationToken',
      'resetPasswordToken',
      'state',
      'accessToken',
      'provider',
      'socialData'
    ]
  };

  getCurrentUser = async () => {
    const encodedValues = qs.stringify(defaultParams, { encodeValuesOnly: true });
    const json = await this.request(`me?${encodedValues}`);
    const data = await this.deserialize(json);

    return { data };
  };

  signUp = async (credentials: {}) => {
    const body = await this.serialize(credentials);
    const json = await this.request('users', { body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

  signUpSocial = async (provider: any, socialData: any) => {
    const body = await this.serialize({ provider, socialData });
    const json = await this.request('users/socials', { body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

  confirmEmail = async (credentials: {}) => {
    const body = await this.serialize(credentials);
    const json = await this.request('users/confirmation', { body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

  login = async (user: {}) => {
    const body = await this.serialize(user);
    const json = await this.request('users/login', { body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

  resetPass = async (credentials: {}) => {
    const body = await this.serialize(credentials);
    const json = await this.request('users/password', { body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

  updatePass = async (credentials: {}) => {
    const body = await this.serialize(credentials);
    const json = await this.request('users/password', { body: JSON.stringify(body), method: 'PATCH' });
    const data = await this.deserialize(json);

    return { data };
  };

  changePass = async (credentials: {}) => {
    const body = await this.serialize(credentials);
    const json = await this.request('me/password', { body: JSON.stringify(body), method: 'PATCH' });
    const data = await this.deserialize(json);

    return { data };
  };

  getUser = async (userId: string) => {
    const encodedValues = qs.stringify(defaultParams, { encodeValuesOnly: true });
    const json = await this.request(`users/${userId}?${encodedValues}`, { showNotFountErrorNotice: false });
    const data = await this.deserialize(json);

    return { data };
  };

  followUser = async (userId: any) => {
    const json = await this.request(`/users/${userId}/following`, { method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

  unfollowUser = async (userId: any) => {
    const json = await this.request(`/users/${userId}/following`, { method: 'DELETE' });
    const data = await this.deserialize(json);

    return { data };
  };

  fetchMyConnections = async (params: any) => {
    const queryParams = {
      ...defaultParams,
      filter: { level: 1 },
      ...params
    };
    const encodedValues = qs.stringify(queryParams, { encodeValuesOnly: true });
    const json = await this.request(`me/connections?${encodedValues}`);
    const data = await this.deserialize(json);

    return { data };
  };

  fetchConnections = async (userId: any, params: any) => {
    const queryParams = {
      ...defaultParams,
      ...params
    };
    const encodedValues = qs.stringify(queryParams, { encodeValuesOnly: true });
    const json = await this.request(`users/${userId}/connections?${encodedValues}`, { showNotFountErrorNotice: false });
    const data = await this.deserialize(json);

    return { data };
  };
}

export default new UserApi();
