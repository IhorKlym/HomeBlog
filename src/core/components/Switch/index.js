// @flow

import React from 'react';

import * as S from './styles';

type Props = {
  options: { label: string, value: any }[],
  value: any,
  onChange: (newValue: any) => any
};

const Switch = (props: Props) => {
  const { options, value, onChange, ...restProps } = props;

  return (
    <S.Wrap {...restProps}>
      {options.map((option) => {
        const isActive = (value === option.value);
        return (
          <S.SwitchItem key={option.value}
            active={isActive}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </S.SwitchItem>
        );
      })}
    </S.Wrap>
  );
};

Switch.defaultProps = {
  
};

export default Switch;
