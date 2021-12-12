// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './styles';

export default () =>
  <S.Footer>
    <S.Container>
      <S.FooterList>
        <S.ListItem>
          <Link to='/about'>
            Who we are
          </Link>
        </S.ListItem>
        <S.ListItem>
          <Link to='/terms-and-conditions'>
            Terms and Conditions
          </Link>
        </S.ListItem>
        <S.ListItem>
          <Link to='/contact'>
            Contact
          </Link>
        </S.ListItem>
      </S.FooterList>
    </S.Container>
  </S.Footer>;
