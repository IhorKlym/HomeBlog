import styled, { css } from 'styled-components';
import { zindexs, fontHeading } from 'styles/variables';
import { breakpoint } from 'styles/mixins';
import { blue, whitePrimary } from 'styles/colors';

export const Modal = styled.div`
  background: ${whitePrimary};
  width: 100%;
  position: relative;
  margin: auto;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 100%;
  border-radius: 30px;
`;

const sizes = {
  default: css`
    ${Modal} {
      max-width: 630px;
    }
  `,
  xl: css`
    ${Modal} {
      max-width: 900px;
    }
  `,
  md: css`
    ${Modal} {
      max-width: 418px;
    }
  `
};

const type = {
  default: css`
    ${Modal} {
      max-width: ${sizes};
    }
  `,
  auth: css`
    ${Modal} {
      position: fixed;
      top: 0;
      border-radius: 30px 30px 0 0 ;
      height: 100%;
      width: 100%;
      left: 0;
      justify-content: flex-start;
      
      ${breakpoint.md`
        position: relative;
        top: auto;
        border-radius: 30px 30px;
        margin: auto;
        left: auto;
        justify-content: center;
        height: auto;
      `}
    }
  `,
  authWithHeader: css`
    ${Modal} {
      position: fixed;
      top: 50px;
      border-radius: 30px 30px 0 0 ;
      height: 100%;
      width: 100%;
      min-width: 100%;
      left: 0;
      justify-content: flex-start;
      
      ${breakpoint.md`
        position: relative;
        top: auto;
        border-radius: 30px 30px;
        margin: auto;
        left: auto;
        min-width: auto;
        justify-content: center;
        height: auto;
      `}
    }
  `
};

export const ModalHeader = styled.div`
  font-size: 24px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  padding: 35px 30px 30px;
  z-index: ${zindexs.sticky};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  font-family: ${fontHeading};
`;

export const ScrollBody = styled.div`
  width: 100%;
  padding: 0 10px 20px;
  
  ${breakpoint.md`
    padding: 0 48px 20px;
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
  padding: 0 20px;
  flex-direction: column;
  overflow: ${({ overflow }) => overflow ? 'initial' : 'hidden'};
  border-radius: 12px;
  
  ${props => {
    if (props.md) return sizes.md;
    if (props.xl) return sizes.xl;
    return sizes.default;
  }};
  
  ${props => {
    if (props.auth) return type.auth;
    if (props.authWithHeader) return type.authWithHeader;
    return type.default;
  }};

  ${Modal} {
    ${({ allowOwerflow }) => !allowOwerflow && 'overflow: hidden;'}
  }

  ${ScrollBody} {
    ${({ allowOwerflow }) => !allowOwerflow && 'overflow-y: auto;'}
  }
`;

export const Close = styled.button.attrs(() => ({ type: 'button' }))`
  position: absolute;
  right: 28px;
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
     background-color: ${blue};
     transform: rotate(-45deg);
  }
  
  &:before {
     position: absolute;
     content: '';
     right: 0;
     height: 1px;
     width: 26px;
     top: 14px;
     background-color: ${blue};
     transform: rotate(45deg);
  }  
`;

export const Backdrop = styled.div`
  display: ${({ open }) => open ? 'block' : 'none'};
  background-color: rgba(73, 25, 40, 0.3);
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;
