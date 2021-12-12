// @flow

import React from 'react';

import * as S from './styles';

type Props = {
  data: any,
};

const StatsCard = ({ data, ...props }: Props) => (
  <S.Wrap {...props} >
    <S.Title>Know Your Stats</S.Title>
    <S.Info>{data.info}</S.Info>
  </S.Wrap>
);

export default StatsCard;
