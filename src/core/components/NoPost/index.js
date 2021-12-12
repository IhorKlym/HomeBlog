// @flow

import React from 'react';
import type { Node } from 'react';
import Wrap from './styles';

type Props = {
  isMy?: boolean,
  text?: string | Node
}

const NoPost = ({ isMy, text, ...rest }: Props) => (
  <Wrap {...rest}>
    <h2>{text || `${!isMy ? 'This person doesn’t' : 'You don’t'} have any posts yet!`}</h2>
  </Wrap>
);

NoPost.defaultProps = {
  isMy: false,
  text: ''
};

export default NoPost;
