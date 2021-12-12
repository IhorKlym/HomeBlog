// @flow
import { deleteToken } from 'helpers/token';

export const redirectToAuth = (): void => {
  deleteToken();
  window.location.href = '/?authMethod=login';
};

export default redirectToAuth;
