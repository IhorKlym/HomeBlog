// @flow

import React from 'react';
import { observer } from 'mobx-react';

import RoundedButton from 'components/RoundedButton';
import { IconTopicFollow } from 'styles/icons';
import stores from 'core/stores';

import * as S from './styles';

type Props = {
  children?: any,
  onSuccess?: any,
  repostData?: any,
  onOpenModal: () => void
};

const CreatePostButton = ({ children, onSuccess, repostData, onOpenModal }: Props) => {
  const { helperStore } = stores;

  const handleOpen = () => {
    helperStore.setCreatePostOptions({ onSuccess, repostData });
    if (onOpenModal) onOpenModal();
  };

  return (
    <S.Toggler onClick={handleOpen}>
      {children ||
        <RoundedButton md primary>
          <IconTopicFollow />
          Create Post
        </RoundedButton>}
    </S.Toggler>
  );

};

CreatePostButton.defaultProps = {
  repostData: null,
  children: null,
  onSuccess: null
};

export default observer(CreatePostButton);
