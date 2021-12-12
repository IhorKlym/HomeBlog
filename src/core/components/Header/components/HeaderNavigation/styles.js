import styled, { keyframes, css } from 'styled-components';
import { fontText, navigationHeightMobile } from 'styles/variables';
import { breakpoint } from 'styles/mixins';
import { primary } from 'styles/colors';

const top = keyframes`
  0% {
    top: 0;
    transform: rotate(0);
  }
  50% {
    top: 7px;
    transform: rotate(0);
  }
  100% {
    top: 7px;
    transform: rotate(45deg);
  }
`;

const top2 = keyframes`
  0% {
    top: 7px;
    transform: rotate(45deg);
  }
  50% {
    top: 7px;
    transform: rotate(0deg);
  }
  100% {
    top: 0;
    transform: rotate(0deg);
  }
`;

const bottom = keyframes`
  0% {
    bottom: 0;
    transform: rotate(0);
  }
  50% {
    bottom: 7px;
    transform: rotate(0);
  }
  100% {
    bottom: 7px;
    transform: rotate(135deg);
  }
`;

const bottom2 = keyframes`
  0% {
    bottom: 7px;
    transform: rotate(135deg);
  }
  50% {
    bottom: 7px;
    transform: rotate(0);
  }
  100% {
    bottom: 0;
    transform: rotate(0);
  }
`;

const scaled = keyframes`
  50% {
    transform: scale(0);
  }
  100% {
    transform: scale(0);
  }
`;

const scaled2 = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const fade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const HeaderAvatar = styled.div`
  display: flex;
  font-weight: normal;
  font-family: ${fontText};
  font-size: 16px;
  position: relative;

  ${breakpoint.md`
    &:after {
      position: absolute;
      content: '';
      right: -11px;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
      background-color: ${primary};
      height: 1px;
      width: 7px;
    }

    &:before {
      position: absolute;
      content: '';
      right: -16px;
      top: 50%;
      transform: translateY(-50%) rotate(-45deg);
      background-color: ${primary};
      height: 1px;
      width: 7px;
    }
  `}

  div {
    margin-right: 5px;
  }
`;

export const ButtonHumburger = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 17px;
  cursor: pointer;
  z-index: 3;
  transition: left 0s ease-in-out 4s;

  &:before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    max-width: 50px;
    max-height: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & > span {
    display: block;
    width: 100%;
    height: 1px;
    background: ${primary};
    transition: all .3s;
    position: relative;

    & + span {
      margin-top: 6px;
    }
  }
`;

export const ContentButtons = styled.div`
  margin-top: auto;
  padding: 20px 10px 10px;
  display: flex;
  flex-direction: column;

  a, button {
    height: 45px;
    width: 100%;
  }

  & > * {
    margin-bottom: 20px;

    &:last-child { margin: 0; }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  top: 0;
  padding-top: ${navigationHeightMobile + 6}px;
  background-color: rgba(255, 255, 255, 0);
  left: 0;
  right: 100%;
  position: fixed;
  bottom: 0;
  transition: .4s;
  z-index: 2;

  & > * {
    transition: .4s;
    border-bottom: 1px solid #C4C4C4;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-height: 60px;
    margin-left: -300px;
  }

  & > a {
    padding: 0 20px;
    min-height: 60px;
    display: flex;
    align-content: center;

    &:hover {
      color: #000;
    }
  }

  & > ${ContentButtons} {
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    border-bottom: none;
  }
`;

export const Wrap = styled.div`
  z-index: 3;
  ${({ isOpen }) => isOpen && css`
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    z-index: 1;

    ${ButtonHumburger} {
      left: auto;
      right: 10px;
      opacity: 0;
      animation: ease .4s ${fade} forwards .4s;

      & > span {
        &:nth-child(1) {
          animation: ease .7s ${top} forwards .4s;
        }
        &:nth-child(2) {
          animation: ease .7s ${scaled} forwards .4s;
        }
        &:nth-child(3) {
          animation: ease .7s ${bottom} forwards .4s;
        }
      }
    }

    ${Content} {
      display: flex;
      visibility: visible;
      background-color: rgba(255, 255, 255, 1);
      right: 0;

      & > * {
        opacity: 1;
        transition: opacity .4s ease-in-out .3s;
        margin-left: 0;
      }
    }
  `}

  ${({ isOpen }) => !isOpen && css`
    ${ButtonHumburger} {
      z-index: 1;
      & > span {
        &:nth-child(1) {
          animation: ease .7s ${top2} forwards;
        }
        &:nth-child(2) {
          animation: ease .7s ${scaled2} forwards;
        }
        &:nth-child(3) {
          animation: ease .7s ${bottom2} forwards;
        }
      }
    }
  `}
`;
