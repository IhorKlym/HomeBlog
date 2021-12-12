// @flow

import React from 'react';
import { IconCheck } from 'styles/icons';
import * as S from './styles';

type Props = {
  title: string,
  text?: any,
  checked?: any
}

const CheckboxCard = ({ title, text, checked, ...rest }: Props) => (
  <S.CheckboxCard  {...rest} checked={checked} >
    {checked ? <IconCheck /> : ''}
    <S.CheckboxTitle>
      {title}
    </S.CheckboxTitle>

    {!!text && <S.CheckboxText>
      {text}
    </S.CheckboxText>}
  </S.CheckboxCard>
);

CheckboxCard.defaultProps = {
  text: null,
  checked: false
};

export default CheckboxCard;
