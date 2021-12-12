import styled, { css } from 'styled-components';
import DefaultError from 'components/Error';
import { gray, primary } from 'styles/colors';
import { fontText, fontLink } from 'styles/variables';

export const Wrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FieldWrap = styled.div`
  position: relative;
`;

const types = {
  secondary: css`
    background-color: transparent;
    border-radius: 10px;
    border-color: ${primary};
    height: 45px;
    color: black;
    font-size: 22px;
    font-weight: 600;
    font-family: ${fontLink};
    

    &:active, &:hover, &:focus {
      background-color: transparent;
    }
  `
};

export const Input = styled.input`
  width: 100%;
  height: 50px;
  background-color: white;
  border-radius: 50px;
  color: black;
  padding: 13px 20px;
  line-height: 1.83;
  font-size: 16px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  border: 1px solid ${gray};

  ::placeholder {
    color: ${primary};
    font-size: 16px;
    font-weight: 300;
    font-style: italic;
    font-family: ${fontText};
    line-height: normal;
  }
  
  ::placeholder, ::-webkit-input-placeholder, ::-moz-placeholder {
    line-height: normal !important;
  }
  
  ::-webkit-input-placeholder {
     padding-top: 4px;
  }

  &:hover,
  &:active {
    background-color: white;
  }

  &:focus {
    background-color: white;
  }
  
  &:disabled {
    opacity: 1;
    color: rgba(0, 0, 0, 0.3);
  }
  
  ${props => {
    if (props.secondary) return types.secondary;
    return types.default;
  }};
`;

export const Error = styled(DefaultError)``;
