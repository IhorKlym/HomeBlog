// @flow

import React, { useState, useEffect } from 'react';
import RoundedButton from 'components/RoundedButton';
import * as S from './styles';

export default function Toast({ notify }: any) {
  const [item, setItem] = useState({});
  const [isModalOpen, toggleModal] = useState(false);

  useEffect(() => {
    notify((msg, options, status) => {
      setItem({ msg, options, status });
      toggleModal(true);
    });
  }, []);

  return (
    <S.Container open={isModalOpen}>
      <S.Modal>
        <S.Close onClick={() => toggleModal(false)} />
        <S.ModalContent>
          <S.ModalHead status={item.status}>
            {item.status ? 'Success' : 'Error'}
          </S.ModalHead>
          <p>{item.msg}</p>
          <RoundedButton primary onClick={() => toggleModal(false)}>OK</RoundedButton>
        </S.ModalContent>
      </S.Modal>

      <S.Backdrop
        open={isModalOpen}
        onClick={() => toggleModal(!isModalOpen)}
      />
    </S.Container>
  );
}

