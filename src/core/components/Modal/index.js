// @flow

import React, { useEffect } from 'react';
import type { Node } from 'react';
import * as S from './styles';

type Props = {
  onClose: Function,
  children: Node,
  header?: Node | any,
  open?: boolean,
  modalStyle?: any,
};

const Modal = ({ children, onClose, open, header, modalStyle, ...rest }: Props) => {
  useEffect(() => {
    const bodyToggleClass = () => {
      if (document.body) document.body.classList.toggle('modal-open', open);
    };

    bodyToggleClass();

    return bodyToggleClass();
  }, [open]);

  return (
    <S.Container {...rest} open={open}>
      <S.Modal style={modalStyle || {}}>
        {header && <S.ModalHeader>
          {header}

          <S.Close onClick={onClose}></S.Close>
        </S.ModalHeader>}
        <S.ScrollBody>
          {children}
        </S.ScrollBody>
      </S.Modal>

      <S.Backdrop
        {...rest}
        open={open}
        onClick={onClose} />
    </S.Container>
  );
};

Modal.defaultProps = {
  header: null,
  open: false,
  modalStyle: null
};

export default Modal;
