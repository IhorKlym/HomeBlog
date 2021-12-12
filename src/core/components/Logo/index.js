// @flow

import React from 'react';
import LogoBlack from 'static/img/logo_black.png';
import LogoWhite from 'static/img/logo_white.svg';
import { DEFAULT_LOGGED_USER_ROUTE } from 'helpers/consts';

import LogoLink from './styles';

type Props = {
  url?: string,
  white?: boolean
};

const Logo = ({ url, white, ...otherProps }: Props) => (
  <LogoLink {...otherProps} to={url}>
    <img src={white ? LogoWhite : LogoBlack} alt='logo' />
  </LogoLink>
);

Logo.defaultProps = {
  url: DEFAULT_LOGGED_USER_ROUTE,
  white: false
};

export default Logo;
