// @flow

import React from 'react';
import { IconChecked } from 'styles/icons';
import * as S from './styles';

type Props = {
  title: string,
  name: string,
  value?: string | boolean,
  onChange?: Function,
  color?: any,
}

const Checkbox = ({ title, name, onChange, value, color, ...rest }: Props) => (
  <S.Checkbox color={color}>
    <S.CheckboxInput
      {...rest}
      type="checkbox"
      name={name}
      onChange={onChange}
      value={value}
    />
    <S.CheckboxChekmark>
      <IconChecked />
    </S.CheckboxChekmark>

    <S.CheckboxTitle>{title}</S.CheckboxTitle>
  </S.Checkbox>
);

Checkbox.defaultProps = {
  value: '',
  onChange: () => {},
  color: null
};

export default Checkbox;
