// @flow

import React from 'react';
import cuid from 'cuid';
import Label from 'components/Label';
import * as S from './styles';

type Props = {
  label?: string,
  className?: string,
  error?: ?any,
  errorStyles?: any,
  min?: ?number,
  max?: ?number,
  rows?: ?number
}

const Textarea = ({ label, className, min, max, rows, error, errorStyles, ...rest }: Props) => {
  const id = cuid.slug();

  return (
    <S.Wrap className={className}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <S.Textarea {...rest} rows={rows} id={id} />
      {error && <S.Error style={errorStyles}>{error}</S.Error>}
    </S.Wrap>
  );
};

Textarea.defaultProps = {
  label: '',
  className: '',
  error: '',
  errorStyles: {},
  min: null,
  max: null,
  rows: 5
};

export default Textarea;
