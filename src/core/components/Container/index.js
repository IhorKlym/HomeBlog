// @flow

import React from 'react';
import type { Node } from 'react';
import StyledContainer from './styles';

type Props = {
  children: Node
};

export default (props: Props) => <StyledContainer {...props} />;
