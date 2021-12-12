// @flow

import React, { useState } from 'react';
import Tag from 'components/Tag';

import * as S from './styles';

type Props = {
  data: any,
};

const TEMPLATES = [
  'Read new advice about',
  'Explore topics related to'
];

const TagCard = ({ data, ...props }: Props) => {
  const [template] = useState(TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)]);
  return (
    <S.Wrap {...props} >
      <S.Template>{template}</S.Template>
      <Tag tag={data} />
    </S.Wrap>
  );
};

export default TagCard;
