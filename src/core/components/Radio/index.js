// @flow

import React from 'react';
import * as S from './styles';

type Props = {
  title: string,
  name: string,
  value: any,
  onChange: Function
}

const Radio = ({ title, name, onChange, value }: Props) => (
  <S.Radio>
    <S.RadioTitle>{title}</S.RadioTitle>
    <S.RadioInput
      type="radio"
      name={name}
      onChange={onChange}
      value={value}
    />

    <S.RadioChekmark />
  </S.Radio>
);

export default Radio;
