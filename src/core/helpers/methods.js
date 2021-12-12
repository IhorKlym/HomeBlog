// @flow
import moment from 'moment';
import { isObservable, set } from 'mobx';
import toaster from 'services/toaster';
import { IconDegree1, IconDegree2, IconDegree3 } from 'styles/icons';

export const formatTimeToLocal = (date: any, format: ?string = 'MMM DD, YYYY') => (
  moment.utc(date).local().format(format)
);

export const getTimeAgoLocal = (date: any) => (
  moment.utc(date).local().fromNow()
);

export const isUserPrivate = (user: any) => user && ((user.visibility === 'private' && user.levelOfConnect !== 1) || (user.visibility === 'semi_private' && user.levelOfConnect !== 1 && user.levelOfConnect !== 2));

export function keysCamelToSnake(original: {}) {
  const obj = {};
  const camelToUnderscore = (key) => key.replace( /([A-Z])/g, '_$1' ).toLowerCase();
  Object.keys(original).forEach(camel => {
    const value = original[camel];
    obj[camelToUnderscore(camel)] = (typeof value === 'object' && value !== null) ? keysCamelToSnake(value) : value;
  });
  return obj;
};

export const getCroppedStr = (str: string, maxLength: number = 14) => {
  if (str && str.length > maxLength) {
    return `${str.substring(0, maxLength - 2)}...`;
  }
  return str;
};

export const getRandomArrayItem = (array: any[]) => (
  array[Math.floor(Math.random() * array.length)]
);

export const redirectToUser = (history: any, user: any) => {
  if (history && user) {
    const { state } = user;
    if (state && state !== 'active' && state !== 'pending') {
      toaster.notify(`This account is ${state}.`);
    } else {
      history.push(`/users/${user.id}`);
    }
  }
};

export const getUserName = (user: any, initials: ?boolean, onlyFirstName: ?boolean) => {
  try {
    const maxLengthName = 20;
    if (!user) return initials ? 'AN' : 'Anonymous';
    if (user.profileType === 'system') return initials ? 'WK' : 'WeKnow user';
    if (user.profileType === 'business') return initials ? user.businessName.substring(0, 2).toUpperCase() : getCroppedStr(user.businessName, maxLengthName);
    if (initials) return `${(user.firstName)[0]}${(user.lastName)[0]}`.toUpperCase();
    if (onlyFirstName) return getCroppedStr(user.firstName, maxLengthName);
    return `${getCroppedStr(user.firstName, maxLengthName)} ${getCroppedStr(user.lastName, maxLengthName)}`;
  } catch (e) {
    return 'Anonymous';
  }
};

export const getConnectionLevel = (user: any) => {
  if (!user) return {
    text: '',
    icon: () => ''
  };
  switch (user.levelOfConnect) {
  case 1:
    return {
      text: '1st degree connection',
      icon: IconDegree1
    };
  case 2:
    return {
      text: '2nd degree connection',
      icon: IconDegree2
    };
  default:
    return {
      text: 'Extended Network',
      icon: IconDegree3
    };
  }
};

export const setInObservable = (obj: any, key: any, value: any) => {
  if (isObservable(obj)) {
    set(obj, key, value);
  } else {
    obj[key] = value; // eslint-disable-line no-param-reassign
  }
};

export const countToText = (n: number, text: ?string) => {
  const c = n ? parseInt(n, 10) : 0;
  const d = { value: c, multiTxt: 's' };
  if (c === 1) {
    d.value = 'One';
    d.multiTxt = '';
  } else if (c > 500) {
    d.value = '500+';
  }
  return `${d.value} ${text ? `${text}${d.multiTxt}` : ''}`;
};

export const parseStrBoolean = (str: any) => {
  if (str === 'true') return true;
  if (str === 'false') return false;
  return !!str;
};

export const isEqualObjects = (obj1: any, obj2: any) => JSON.stringify(obj1) === JSON.stringify(obj2);

export const checkFrontBuildVersion = (currentVersion: string) => {
  if (!currentVersion) return;
  const savedVersion = localStorage.getItem('front_version');
  if (savedVersion !== currentVersion) {
    try {
      localStorage.setItem('front_version', currentVersion);
      if (savedVersion) window.location.reload();
    } catch (e) {
      toaster.notify('Site was updated. Please, try to reload the page and clear browser cashe.');
    }
  }
};

export const generateUUID = () => `_${Math.random().toString(36).substr(2, 9)}`;

export const hasSomeParentTheClass = (element: any, classname: string) => {
  if (element.className && element.className.split && element.className.split(' ').indexOf(classname) >= 0) return element;
  return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
};
