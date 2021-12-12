// @flow

import React from 'react';
import { observer } from 'mobx-react';
import type { Post } from 'helpers/types';

import PostSimpleCard from './components/SimpleCard';
import PostExtendedCard from './components/ExtendedCard';
import PostAttachmentCard from './components/AttachmentCard';

type Props = {
  post: Post,
  simple?: boolean,
  isAttachment?: boolean,
  theme?: any
}

const PostCard = ({ simple, post, isAttachment, theme: providedTheme, ...restProps }: Props) => {
  const { user } = post;
  const theme = providedTheme || (user && user.skin && user.skin.id) || null;
  let Layout = simple ? PostSimpleCard : PostExtendedCard;
  if (isAttachment) Layout = PostAttachmentCard;

  return <Layout
    {...restProps}
    post={post}
    theme={theme}
  />;
};

PostCard.defaultProps = {
  simple: false,
  isAttachment: false,
  theme: null
};

export default observer(PostCard);
