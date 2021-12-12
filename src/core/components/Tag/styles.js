import styled from 'styled-components';
import { white, black } from 'styles/colors';
import { breakpoint } from 'styles/mixins';
import { fontText } from 'styles/variables';

const defaultSize = 178;

export const BrashWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Brash = styled.svg`
  position: absolute;
  top: -25%;
  left: -5%;
  right: -5%;
  bottom: -25%;
  height: 150%;
  width: 110%;
  transform: rotate(${({ brash }) => (brash === 'bottom') ? '175' : '-5'}deg);
`;

export const Text = styled.span`
  position: relative;
  z-index: 1;
  padding: 5px;
`;

export const Tag = styled.div`
  flex-shrink: 0;
  font-weight: 300;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-family: ${fontText};
  justify-content: center;
  max-width: 200px;

  ${breakpoint.md`
    font-size: 36px;
    line-height: 40px;
    max-width: 300px;

    ${({ boxed, size, shape, padding }) => boxed && `
      height: ${(size || defaultSize)}px;
      min-width: ${(size || defaultSize)}px;
      width: ${(shape === 'round') ? `${(size || defaultSize)}px` : 'auto'};
      padding: 10px ${padding || 24}px;
    `};
  `}

  span{
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    text-align: center;
  }

  ${({ boxed, size, color, shape, padding }) => boxed && `
    height: ${(size || defaultSize/1.5)}px;
    min-width: ${(size || defaultSize/1.5)}px;
    width: ${(shape === 'round') ? `${(size || defaultSize)/2}px` : 'auto'};
    padding: 10px ${padding/1.5 || 18}px;
    border: 1px solid ${color};
    border-radius: ${(shape === 'round') ? `${(size || defaultSize)/2}px` : `${shape}px`};
    color: black;
    background-color: transparent;

    ${Brash} {
      display: none;
    }
  `};

  &:hover {
    background-color: transparent;

    ${BrashWrap} {
      color: ${({ text }) => (text === 'light') ? white : black};
      font-family: ${fontText};
      font-style: italic;
    }

    ${Brash} {
      display: block;
    }
  }

  ${({ active, color, text }) => active && `
    background-color: ${color};
    color: ${(text === 'light') ? white : black};

    ${Brash} {
      display: none;
    }
  `}
`;
