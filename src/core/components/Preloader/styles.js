// @flow

import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Preloader = styled.div`
  border: 3px solid darkgreen;
  border-top: 3px solid #e9e9e9;
  border-radius: 50%;
  margin: 0 auto;
  animation: ${rotate} 800ms linear infinite;
`;

export const PreloaderWrapper = styled.div`
  position: ${({ position }) => position};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${({ backdrop }) => backdrop ? 'rgba(255, 255, 255, .5)' : 'transparent'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: ${({ zIndex }) => zIndex || 100};

  span {
    margin-top: 10px;
    color: black;

    :empty {
      display: none
    }
  }

  ${Preloader} {
    width: ${({ size }) => size || 64}px;
    height: ${({ size }) => size || 64}px;
  }
`;
