// @flow

import React from 'react';
import * as S from './styles';

type LinkType = { url: string, text: any }
type LinkWithCountType = { ...LinkType, count: number }

type Props = {
  links: Array<LinkType | LinkWithCountType>
}

const TabsNav = ({ links, ...rest }: Props) => (
  <S.Wrapper {...rest}>
    <S.Nav>
      {links.map((link: LinkWithCountType | LinkType) => (
        <S.Item key={link.url}>
          <S.ItemLink activeClassName="active" to={link.url}>
            {link.text}
          </S.ItemLink>
        </S.Item>
      ))}
    </S.Nav>
  </S.Wrapper>
);

export default TabsNav;
