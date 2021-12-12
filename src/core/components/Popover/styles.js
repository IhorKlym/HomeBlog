import styled, { css } from 'styled-components';
import { breakpoint } from 'styles/mixins';

const positions = {
  top: css`
    left: 50%;
    transform: translateX(-50%);
    top: auto;
    bottom: 100%;
    margin: 0 0 20px;
    box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.25);

    &::before {
      left: 50%;
      transform: translateX(-50%);
      top: 100%;
      bottom: auto;
      border: 14px solid transparent;
      border-top-color: white;
      border-bottom-color: transparent;
    }
  `,
  bottom: css`
    left: 50%;
    transform: translateX(-50%);
    top: 100%;
    bottom: auto;
    margin: 20px 0 0;
    box-shadow: 0 -4px 24px 0 rgba(0, 0, 0, 0.15);;

    &::before {
      left: 50%;
      transform: translateX(-50%);
      bottom: 100%;
      top: auto;
      border: 14px solid transparent;
      border-top-color: transparent;
      border-bottom-color: white;
    }
  `,
  left: css`
    top: 50%;
    transform: translateY(-50%);
    left: auto;
    right: 100%;
    margin: 0 20px 0;
    box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.25);

    &::before {
      top: 50%;
      transform: translateY(-50%);
      left: 100%;
      right: auto;
      border: 14px solid transparent;
      border-right-color: transparent;
      border-left-color: white;
    }
  `,
  right: css`
    top: 50%;
    transform: translateY(-50%);
    right: auto;
    left: 100%;
    margin: 0 0 0 20px;
    box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.25);

    &::before {
      top: 50%;
      transform: translateY(-50%);
      right: 100%;
      left: auto;
      border: 14px solid transparent;
      border-left-color: transparent;
      border-right-color: white;
    }
  `
};

const sides = {
  left: css`
    transform: none;
    right: auto;
    left: 0;

    &::before {
      transform: none;
      right: auto;
      left: 25px;
    }
  `,
  right: css`
    transform: none;
    right: 0;
    left: auto;

    &::before {
      transform: none;
      right: 25px;
      left: auto;
    }
  `,
  default: css``
};

export const Backdrop = styled.div`
  display: ${({ open }) => open ? 'block' : 'none'};
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${({ isOpen }) => isOpen ? '3' : '1'};
`;

export const Wrapper = styled.div`
  position: relative;
  line-height: 1;
  display: ${({ flex }) => flex ? 'flex' : 'inline-block'};
  z-index: ${({ isOpen }) => isOpen ? '3' : '1'};
`;

export const Content = styled.div`
  display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
  position: absolute;
  width: 240px;
  background-color: #fff;
  z-index: 1070;
  padding: 15px;
  font-size: 12px;
  line-height: 1.43;
  color: #9799a2;
  border-radius: 4px;
  flex-direction: column;
  text-align: left;
  ${({ position }) => positions[position || 'top']};
  ${({ side }) => sides[side || 'default']};
  
  ${breakpoint.md`
    width: 290px;
    padding: 20px;
    font-size: 14px;
  `}
  
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
  }

  h3 {
    font-size: 16px;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 7px;
  }
  
  p {
    margin-bottom: 10px;
  }
`;
