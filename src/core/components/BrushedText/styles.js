import styled from 'styled-components';
import { white, black } from 'styles/colors';

export const BrashWrap = styled.div`
  position: relative;
  display: inline-block;
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
  transform: rotate(${({ brash }) => {
    if (brash === 'center') return '178';
    if (brash === 'bottom') return '175';
    return '-5';
  }}deg);
`;

export const Text = styled.span`
  display: inline-block;
  position: relative;
  z-index: 1;
  padding: 5px;
  color: ${({ textColor }) => (textColor === 'light') ? white : black};
  line-height: 1;
`;

