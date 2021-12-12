// @flow

import React from 'react';

import ErrorLogo from 'components/ErrorLogo';
import * as S from './styles';

type Props = {
  heading: string,
  subHeading: string,
  errorNumber: string,
  children: any
};

export default ({ heading, subHeading, errorNumber, children }: Props) => (
  <S.Section>
    <S.SubHeading>{subHeading}</S.SubHeading>

    <S.SectionImg>
      <span>4</span>
      <ErrorLogo />
      <span>{errorNumber}</span>
    </S.SectionImg>

    <S.Heading>
      {heading}
    </S.Heading>

    {children}
  </S.Section>
);
