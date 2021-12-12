// @flow

import React, { forwardRef } from 'react';
import Label from 'components/Label';
import * as S from './styles';

type Props = {
  inputRef?: any,
  error?: ?string,
  className?: string,
  label?: any,
  icon?: ?any,
}

// eslint-disable-next-line react/prefer-stateless-function
class Input extends React.Component<Props> {
  static defaultProps = {
    inputRef: null,
    error: '',
    className: '',
    label: null,
    icon: null
  };

  render() {
    const { className, error, inputRef, label, icon: Icon, ...rest } = this.props;

    return (
      <S.Wrap className={className}>
        {label && <Label>{label}</Label>}
        <S.FieldWrap>
          {Icon && <Icon />}
          <S.Input {...rest} border ref={inputRef} autoComplete="off" />
        </S.FieldWrap>
        {error && <S.Error>{error}</S.Error>}
      </S.Wrap>
    );
  }
};

export const InputRef = forwardRef<Props, Input>((props, ref) =>
  <Input {...props} ref={ref} />
);

export default Input;
