// @flow

import React from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router';

import Modal from 'components/Modal';
import RoundedButton from 'components/RoundedButton';

import store from 'components/CreatePostModal/store';
import * as S from './styles';

type Props = {
  show: boolean,
  onClose: any,
  editMode: boolean,
  isRepost: boolean
};

const SuccessModal = ({ show, onClose, editMode, isRepost }: Props) => {
  const { mode } = store;
  const history = useHistory();

  const getTitle = () => {
    let title = 'Success';
    if (isRepost) title = 'Published!';
    if (editMode) title = 'Updated!';
    return title;
  };

  const getText = () => {
    let text = mode === 'ask' ? 'Your question has been published! Keep an eye out in your notifications panel for updates and responses.' : 'Your advice has been published! Keep an eye out in your notifications panel for updates and responses.';
    if (isRepost) text = 'You reposted a question to your profile';
    if (editMode) text = 'Your question has been updated!';
    return text;
  };

  return (
    <Modal open={show} onClose={onClose} md>
      <S.Wrap>
        <S.Header>
          {getTitle()}
        </S.Header>
        <S.Close onClick={onClose} />

        <p> {getText()}</p>

        {isRepost &&
          <RoundedButton primary largeHeight onClick={() => {
            onClose();
            history.push('/me');
          }}>
            View Profile
          </RoundedButton>}
      </S.Wrap>
    </Modal>
  );
};

export default observer(SuccessModal);
