import styled from 'styled-components';
import { breakpoint } from 'styles/mixins';
import { primary, primaryRed } from 'styles/colors';
import DefaultError from 'components/Error';
import { fontText } from 'styles/variables';

export const Wrap = styled.div`
  width: 100%;
  text-align: center;
  padding-bottom: 14px;
  
  p {
    font-size: 16px;
    font-family: ${fontText};
    text-align: center;
    line-height: 24px;
    margin-bottom: 30px;
    letter-spacing: -0.01em;
    padding: 0 8px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  text-align: center;
  font-family: ${fontText};
  justify-content: center;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  letter-spacing: -0.01em;
  line-height: 36px;  
  
  ${breakpoint.md`
    padding: 45px 0 6px;
  `}
`;

export const Close = styled.button.attrs(() => ({ type: 'button' }))`
  position: absolute;
  right: 28px;
  top: 24px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  width: 26px;
  max-width: 26px;
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

export const Error = styled(DefaultError)`
  font-family: ${fontText};
  font-weight: normal;
  color: ${primaryRed};
  font-style: italic;
  margin-top: -3px;
`;
