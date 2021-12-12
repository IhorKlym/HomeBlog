import React  from 'react';
import * as S from './styles';

type Props = {
  isOpen: boolean,
  onClose: Function,
  component: any,
  position: string,
  children: any,
  side: string
}

const Popover = ({ isOpen, onClose, component, position, children, side, ...rest }: Props) => (
  <>
    <S.Wrapper isOpen={isOpen} {...rest}>
      {component}
      <S.Content side={side} isOpen={isOpen} position={position}>
        {children}
      </S.Content>
      <S.Backdrop onClick={onClose} isOpen={isOpen} open={isOpen}/>
    </S.Wrapper>
  </>
);

export default Popover;
