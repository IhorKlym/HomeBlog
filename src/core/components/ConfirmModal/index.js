// @flow

import React from 'react';
import RoundedButton from 'components/RoundedButton';
import * as S from './styles';

const ConfirmModal = ({ data }: { data: any }) => {
  const isModalOpen = !!data;

  const handleClose = () => {
    if (data && data.onCancel) data.onCancel();
  };

  const renderModal = () => {
    const {
      text = 'Are you sure?',
      onConfirm = handleClose,
      confirmText = 'Yes',
      cancelText = 'No'
    } = data;

    return (
      <S.Modal>
        <S.Close onClick={handleClose} />
        <S.ModalContent>
          <S.ModalHead>
            {text}
          </S.ModalHead>

          <S.Controls>
            <RoundedButton secondary onClick={handleClose}>
              {cancelText}
            </RoundedButton>
            <RoundedButton primary onClick={onConfirm}>
              {confirmText}
            </RoundedButton>
          </S.Controls>
        </S.ModalContent>
      </S.Modal>
    );
  };

  return (
    <S.Container open={isModalOpen}>
      {isModalOpen && renderModal()}

      <S.Backdrop
        open={isModalOpen}
        onClick={handleClose}
      />
    </S.Container>
  );
};

export default ConfirmModal;
