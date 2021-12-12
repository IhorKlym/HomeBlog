// @flow

import React from 'react';
import type { Node } from 'react';
import * as S from './styles';

type Props = {
  size?: number | string,
  children?: Node,
  backdrop?: boolean,
  className?: string,
  position?: 'absolute' | 'fixed' | 'relative'
};

const Preloader = ({ children, ...rest }: Props) => (
  <S.PreloaderWrapper {...rest}>
    <S.Preloader />
    <span>{children}</span>
  </S.PreloaderWrapper>
);

Preloader.defaultProps = {
  size: '',
  children: null,
  backdrop: false,
  className: '',
  position: 'absolute'
};

export default Preloader;
