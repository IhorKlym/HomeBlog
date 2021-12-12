import styled, { css } from 'styled-components';
import { grayDarken, primary, whitePrimary } from 'styles/colors';
import { fontLink } from 'styles/variables';

const types = {
  primary: css`
    color: white;

    &:after {
      border: 1px solid black;
      background-color: black;
    }
    
    &:before {
      background-color: #333333;
    }
  `,
  secondary: css`
    color: black;

    &:after {
      background-color: #e1e1e1;
    }
    
    &:before {
      background-color: #c5c5c5;
    }
  `,
  transparent: css`
    color: black;
 
    &:hover {
      color: ${primary};
    }

    &:after {
      background-color: transparent;
    }
    
    &:before {
      background-color: transparent;
    }
  `,
  fb: css`
    color: white;

    &:after {
      background-color: #3a5a99;
    }
    
    &:before {
      background-color: #4166af;
    }
  `,
  google: css`
    color: white;

    &:after {
      background-color: #4285f4;
    }
    
    &:before {
      background-color: #4285f4;
    }
  `,
  danger: css`
    color: white;

    &:after {
      background-color: rgba(255, 0, 0, .45);
    }
    
    &:before {
      background-color: rgba(255, 0, 0, .6);
    }
  `,
  file: css`
    display: flex;
    color: black;
    padding: 0;
    align-items: stretch;

    label {
      width: 100%;
      height: 50px;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    input {
      display: none;
    }
    
    img {
      width: 32px;
      height: auto;
    }

    &:after {
      background-color: ${whitePrimary};
    }
    
    &:before {
      background-color: ${grayDarken};
    }
  `
};

const sizes = {
  default: css`
    height: 50px;
    font-size: 14px;
    line-height: 52px;
    text-transform: uppercase;
  `,
  sm: css`
    height: auto;
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 14px;
    min-width: 100px;
    
    &:before { border-radius: 20px; }
    &:after { border-radius: 20px; }
  `,
  xs: css`
    height: 41px;
    padding: 0 15px;
    font-size: 12px;
    line-height: 1.2;
    min-width: 100px;
  `,
  xss: css`
    font-size: 10px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.2;
    min-width: auto;
    text-align: left;
    color: black;
    text-transform: none;
    
    i {
      font-size: 14px;
      max-height: 14px;
    }
    
    &:hover {
      color: ${primary};
    }
  `,

  text: css`
    font-size: 16px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    min-width: auto;
    letter-spacing: 0;
    padding: 0;
    text-transform: none;
    color: ${primary};
    
    i {
      margin-right: 7px;
    }
  `

};

const Button = styled.button.attrs(({ type }) => ({ type: type || 'button' }))`
  text-align: center;
  display: inline-flex;
  align-items: ${({ baseline }) => baseline ? 'baseline' : 'center'};
  justify-content: center;
  transition: color 0.35s, border-color 0.35s, background-color 0.35s, opacity 0.35s;
  border: none;
  outline: none;
  appearance: none;
  cursor: pointer;
  font-weight: normal;
  position: relative;
  min-width: 140px;
  overflow: hidden;
  z-index: 2;
  text-transform: uppercase;
  background-color: transparent;
  font-family: ${fontLink};
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
  }
  
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 100%;
    transition: all 0.3s;
    z-index: -1;
  }
  
  &:hover {
    &:before {
      width: 100%;
    }
  }

  ${props => {
    if (props.primary) return types.primary;
    if (props.secondary) return types.secondary;
    if (props.danger) return types.danger;
    if (props.fb) return types.fb;
    if (props.google) return types.google;
    if (props.file) return types.file;
    if (props.transparent) return types.transparent;
    return types.default;
  }};

  ${props => {
    if (props.sm) return sizes.sm;
    if (props.xs) return sizes.xs;
    if (props.xss) return sizes.xss;
    if (props.text) return sizes.text;
    return sizes.default;
  }};

  ${({ disabled }) => disabled && `
    pointer-events: none;
    opacity: .6;
  `}

  ${({ extended }) => extended && `
    width: 100%;
  `}

  ${({ shadow }) => shadow && `
    box-shadow: 0 12px 14px 0 rgba(0, 0, 0, 0.15);
  `}

  ${({ caseless }) => caseless && `
    text-transform: none;
  `}
`;

export default Button;
