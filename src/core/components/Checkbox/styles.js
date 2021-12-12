import styled from 'styled-components';
import { primary, white } from 'styles/colors';
import { fontLink } from 'styles/variables';

export const CheckboxChekmark = styled.span`
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  border: 1px solid ${primary};
  border-radius: 4px;
  margin: 1px 10px 0 0;
  position: relative;
  transition: opacity .3s ease-in-out;
  color: ${primary};
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 10px;
    display: none;
  }
`;

export const CheckboxTitle = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: black;
  font-family: ${fontLink};
`;

export const CheckboxInput = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;

  &:checked + ${CheckboxChekmark} {
    background-color: ${white};
    i {
      display: inline-block;
    }
  }
`;

export const Checkbox = styled.label`
  position: relative;
  display: flex;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
  margin-top: 13px;

  ${({ color }) => `
    ${CheckboxChekmark} {
      border-color: ${color};
    }
    ${CheckboxTitle} {
      color: ${color};
    }
  `}
`;
