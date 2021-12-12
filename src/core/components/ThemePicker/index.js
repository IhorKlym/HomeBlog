// @flow

import React from 'react';
import { SKINS } from 'helpers/skins';
import * as S from './styles';

type Props = {
  themes?: any[],
  selected?: any,
  onChange?: (any) => any
};

const ThemePicker = ({ themes, selected, onChange, ...rest }: Props) => (
  <S.Wrap {...rest} >
    {(themes || []).map(theme => {
      const isActive = selected === theme.id;
      const handleChange = () => {
        if (onChange) onChange(theme);
      };
      return (
        <S.ThemeWrap key={theme.id} active={isActive} onClick={handleChange}>
          <S.Theme theme={theme}>
            <S.ThemePattern theme={theme} />
          </S.Theme>
        </S.ThemeWrap>
      );

    })}
  </S.Wrap>
);

ThemePicker.defaultProps = {
  themes: SKINS,
  selected: 0,
  onChange: () => {}
};

export default ThemePicker;
