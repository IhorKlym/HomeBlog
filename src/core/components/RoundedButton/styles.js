import styled, { css } from 'styled-components';
import { primary, whitePrimary } from 'styles/colors';
import { fontLink } from 'styles/variables';

const types = {
  primary: css`
    color: white;
    background-color: ${primary};
    border: 1px solid ${primary};
    
    &:hover {
      color: ${primary};
      background-color: ${whitePrimary};
    }
  `,
  secondary: css`
    color: black;
    background-color: ${whitePrimary};
    border: 1px solid ${primary};
    
    i {
      color: ${primary};
      font-size: 25px;
      margin-right: 10px;
      transition: color 0.35s;
    }
    
    &:hover {
      color: white;
      background-color: ${primary};
      
      i {
        color: white;
      }
    }
  `,
  secondaryBlack: css`
    color: black;
    background-color: ${whitePrimary};
    border: 1px solid ${primary};
    
    i {
      color: ${primary};
      font-size: 25px;
      margin-right: 10px;
      transition: color 0.35s;
    }
    
    &:hover {
      color: white;
      background-color: ${primary};
      
      i {
        color: white;
      }
    }
  `,
  secondaryBlue: css`
    color: ${primary};
    background-color: white;
    border: 1px solid ${primary};
    
    &:hover {
      color: white;
      background-color: ${primary};
    }
  `,
  transparent: css`
    color: ${primary};
    background-color: transparent;
    border: 1px solid ${primary};
    
    &:hover {
      color: white;
      background-color: ${primary};
    }
  `,
  transparentWhite: css`
    color: white;
    background: transparent;
    border: 1px solid white;
    
    &:hover {
      color: ${primary};
      background: white;
    }
  `
};

const sizes = {
  default: css`
    height: 50px;
    border-radius: 50px;
  `,
  sm: css`
    height: 45px;
    border-radius: 45px;
    min-width: 135px;
  `,
  md: css`
    height: 45px;
    border-radius: 45px;
    min-width: 135px;
  `,
  xs: css`
    height: 48px;
    border-radius: 45px;
    min-width: 112px;
    padding: 1px 39px 0;
  `,
  largeHeight: css `
    height: 55px;
    border-radius: 45px;
    min-width: 123px;
    padding: 2px 0 0;
  `,
  small: css `
    height: 45px;
    min-width: 45px;
    border-radius: 50%;
    padding: 2px 0 0;
    
    i {
      margin: 0;
      font-size: 18px;
    } 
  `
};

const Button = styled.button.attrs(({ type }) => ({ type: type || 'button' }))`
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.35s, border-color 0.35s, background-color 0.35s, opacity 0.35s;
  border: none;
  outline: none;
  appearance: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  position: relative;
  padding: 3px 39px 0;
  overflow: hidden;
  z-index: 2;
  font-family: ${fontLink};

  i {
    margin-right: 10px;
  }

  ${props => {
    if (props.primary) return types.primary;
    if (props.secondary) return types.secondary;
    if (props.secondaryBlue) return types.secondaryBlue;
    if (props.secondaryBlack) return types.secondaryBlack;
    if (props.transparent) return types.transparent;
    if (props.transparentWhite) return types.transparentWhite;
    return types.default;
  }};

  ${props => {
    if (props.md) return sizes.md;
    if (props.sm) return sizes.sm;
    if (props.xs) return sizes.xs;
    if (props.largeHeight) return sizes.largeHeight;
    if (props.small) return sizes.small;
    return sizes.default;
  }};

  ${({ disabled }) => disabled && `
    pointer-events: none;
    opacity: .6;
  `}

  ${({ extended }) => extended && `
    width: 100%;
  `}

  img {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }
`;

export default Button;
