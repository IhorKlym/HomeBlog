// @flow

import React from 'react';
import Label from 'components/Label';
import { rgba } from 'polished';
import * as S from './styles';

type Props = {
  label?: string | Node,
  error?: ?string,
  icon?: ?any,
  className?: string
}

const colourStyles = {
  multiValue: (styles, { data }) => {
    if (!data.color) return styles;
    return data.color ? {
      ...styles,
      border: `1px solid ${rgba(data.color, .8)}`,
      borderRadius: 20,
      padding: '7px 10px'
    } : styles;
  }
};

const Select = ({ label, className, error, icon: Icon, ...rest }: Props) => (
  <S.Wrap className={className}>
    {label && <Label>{label}</Label>}
    <S.FieldWrap>
      {Icon && <Icon />}
      <S.Select {...rest} classNamePrefix="select" styles={colourStyles} />
    </S.FieldWrap>
    {error && <S.Error>{error}</S.Error>}
  </S.Wrap>
);

Select.defaultProps = {
  icon: null,
  label: '',
  error: '',
  className: ''
};

export default Select;
