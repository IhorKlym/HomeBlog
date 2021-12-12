// @flow

import React from 'react';
import * as S from './styles';

type Props = {
  progress: number, // [0-100]
};

const ProgressBar = ({ progress }: Props) => (
  <S.Wrap>
    <S.Bar style={{ width: `${Math.min(progress, 100) || 0}%` }} />
  </S.Wrap>
);

export default ProgressBar;
