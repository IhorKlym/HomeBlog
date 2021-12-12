import styled from 'styled-components';
import { zindexs } from 'styles/variables';
import { gray, black } from 'styles/colors';

export const Modal = styled.div`
  position: relative;
  margin: auto;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90%;
  width: 100%;
  overflow: hidden;
  transform: scale(${({ open }) => open ? '1' : '0.2'});
  transition: transform 0.25s;

  video {
    width: 80%;
    max-width: 1000px;
    max-height: 80%;
  }
`;

export const Container = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  padding: 0 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 12px;
  z-index: ${({ open }) => open ? zindexs.popover : '-1000'};
  opacity: ${({ open }) => open ? '1' : '0'};
  transition: opacity 0.25s;
`;

export const Backdrop = styled.div`
  display: block;
  background-color: rgba(0, 0, 0, 0.75);
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${({ open }) => open ? '1' : '-1'};
  opacity: ${({ open }) => open ? '1' : '0'};
  transition: opacity 0.25s;
`;

export const Control = styled.div`
  position: fixed;
  ${({ prev }) => prev && 'left: 0;'}
  ${({ next }) => next && 'right: 0;'}
  top: 50vh;
  width: 100px;
  height: 100px;
  margin: -50px 0;
  z-index: 3;
  cursor: pointer;

  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  &:before {
    width: 40px;
    height: 40px;
    margin: -20px;
    border-radius: 20px;
    background: ${gray};
  }

  &:after {
    width: 14px;
    height: 14px;
    border-left: 2px solid ${black};
    border-bottom: 2px solid ${black};
    ${({ prev }) => prev && `
      margin: -7px -5px;
      transform: rotate(45deg);
    `}
    ${({ next }) => next && `
      margin: -7px -9px;
      transform: rotate(-135deg);
    `}
  }
`;

export const CloseBtn = styled.div`
  position: fixed;
  width: 40px;
  height: 40px;
  top: 30px;
  right: 30px;
  cursor: pointer;
  background: ${gray};
  border-radius: 20px;
  transition: all 0.25s;
  z-index: 4;

  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 2px;
    margin: -1px -8px;
    background-color: ${black};
  }

  &:before {
    transform: rotate(-45deg);
  }

  &:after {
    transform: rotate(45deg);
  }
`;
