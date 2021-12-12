import styled from 'styled-components';
import { rgba } from 'polished';
import { breakpoint } from 'styles/mixins';
import { fontText, zindexs } from 'styles/variables';
import { dark, primary, whitePrimary } from 'styles/colors';

export const Modal = styled.div`
  background: ${whitePrimary};
  border-radius: 30px;;
  width: 100%;
  position: relative;
  margin: 0 auto;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 100%;
  max-width: 418px;
  
  ${breakpoint.lg`
    margin: auto;
  `}
`;

export const Container = styled.div`
  display: ${({ open }) => open ? 'flex' : 'none'};
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${zindexs.modal};
  padding: 20px;
  flex-direction: column;
  overflow: hidden;
  border-radius: 30px;;
`;

export const ModalHead = styled.div`
  font-weight: normal;
  font-size: 20px;
  margin-bottom: 15px;
  padding: 0 30px;
  color: black;
  text-align: center;
  font-family: ${fontText};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  i {
    margin-right: 10px;
    font-size: 24px;
  }
`;

export const Close = styled.button.attrs(() => ({ type: 'button' }))`
  position: absolute;
  right: 14px;
  top: 14px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  width: 26px;
  height: 26px;
 
  &:after {
     position: absolute;
     content: '';
     right: 0;
     top: 14px;
     height: 1px;
     width: 26px;
     background-color: ${primary};
     transform: rotate(-45deg);
  }
  
  &:before {
     position: absolute;
     content: '';
     right: 0;
     height: 1px;
     width: 26px;
     top: 14px;
     background-color: ${primary};
     transform: rotate(45deg);
  }  
`;

export const Backdrop = styled.div`
  display: ${({ open }) => open ? 'block' : 'none'};
  background-color: ${rgba(`${dark}`, .5)};
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

export const ModalContent = styled.div`
  padding: 30px 15px;
  font-size: 16px;
  text-align: center;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    margin: 0 10px;
  }
`;
