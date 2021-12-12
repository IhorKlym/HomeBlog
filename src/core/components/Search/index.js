// @flow

import React, { useState, useEffect, useRef } from 'react';

import { IconBack, IconSearchMagnifier } from 'styles/icons';
import * as S from './styles';

type Props = {
  onTagSelected?: (tag: any) => any,
  value?: string,
  placeholder?: string,
  onChange?: Function,
  debaunceTimeout?: number,
};

const Search = ({ onTagSelected, value, onChange, placeholder, debaunceTimeout, ...rest }: Props) => {
  const [searchFilter, setSearchFilter] = useState(value);
  const timeoutRef = useRef(null);

  const handleChange = (e) => {
    e.persist();
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    setSearchFilter(e.target.value);
    if (!onChange) return;
    if (debaunceTimeout) {
      timeoutRef.current = setTimeout(() => {
        onChange(e);
      }, debaunceTimeout);
    } else {
      onChange(e);
    }
  };

  useEffect(() => {
    setSearchFilter(value);
  }, [value]);

  return (
    <S.Form {...rest}>
      <S.IconWrap>
        <IconSearchMagnifier />
      </S.IconWrap>

      <S.Input
        type="text"
        value={searchFilter}
        onChange={handleChange}
        placeholder={placeholder}
      />

      { searchFilter ?
        <S.Button>
          <IconBack />
        </S.Button> : ''}
    </S.Form>
  );
};

Search.defaultProps = {
  onTagSelected: () => {},
  value: undefined,
  placeholder: 'Search...',
  onChange: () => { },
  debaunceTimeout: 0
};

export default Search;
