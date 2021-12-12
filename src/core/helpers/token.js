// @flow

const TOKEN_KEY = '_jwt_token';

export const deleteToken = () => {
  document.cookie = `${TOKEN_KEY}=;Path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  window.location.href = '/login';
};

export const getToken = (): ?string => {
  const matches = document.cookie.match(new RegExp(
    // eslint-disable-next-line no-useless-escape
    `(?:^|; )${ TOKEN_KEY.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') }=([^;]*)`
  ));
  return matches ? decodeURIComponent(matches[1]) : null;
};

export const setToken = (token: string) => {
  const today = new Date();
  const expire = new Date();
  expire.setTime(today.getTime() + 3600000*24*7);
  document.cookie = `${TOKEN_KEY}=${encodeURI(token)};Path=/;expires=${expire.toISOString()}`;
};

export const hasToken = (): boolean => getToken() !== null;
