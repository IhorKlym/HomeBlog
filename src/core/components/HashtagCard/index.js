// @flow

import React from 'react';

import * as S from './styles';

type Props = {
  data: any,
};

const HashtagCard = ({ data, ...props }: Props) => (
  <S.Hashtag {...props} >
    {data.name}
  </S.Hashtag>
);

export default HashtagCard;
