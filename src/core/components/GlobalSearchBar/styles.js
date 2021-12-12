import styled, { css } from 'styled-components';
import { primary, white } from 'styles/colors';
import { searchBarHeightDesktop, searchBarHeightMobile, fontText, fontLink } from 'styles/variables';
import { breakpoint, baseTransition, applyMaxWidth } from 'styles/mixins';
import { IconSearchMagnifier } from 'styles/icons';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  ${applyMaxWidth};
  width: 100%;

  button {
    min-width: 40px;
    min-height: 40px;
    width: 40px;
    height: 40px;
    padding: 0;

    i {
      font-size: 18px;
      margin-right: 0;
    }
    
    ${breakpoint.md`
      min-width: 50px;
      min-height: 50px;
      width: 50px;
      height: 50px;
      
      i {
        font-size: 22px;
      }
    `}
  }
  
  @media (min-width: 1440px) {
    max-width: 1400px;
  }
`;

export const Search = styled.input`
  background: transparent;
  color: ${white};
  font-family: ${fontLink};
  border: none;
  outline: none;
  font-size: 24px;
  line-height: 36px;
  width: 100%;
  min-width: auto;
  margin-right: 10px;
  
  ::placeholder, ::-webkit-input-placeholder, ::-moz-placeholder {
    line-height: normal !important;
  }
  
  ::-webkit-input-placeholder {
     padding-top: 7px;
  }

  ::placeholder {
    color: ${white};
    font-size: 26px;
    font-weight: 300;
    font-style: italic;
    font-family: ${fontText};
    line-height: normal;
    
    ${breakpoint.md`
      font-size: 30px;
      
      ::placeholder {
        font-size: 30px;
      }
    `}
  }
  
  ::placeholder, ::-webkit-input-placeholder, ::-moz-placeholder {
    line-height: normal !important;
  }
`;

const types = {
  nav: css`
    background-color: ${white};
    flex-grow: 0;
    width: 100%;
    border-bottom: none!important;
    position: relative;
    
    ${Search} {
      color: ${primary};
      font-size: 16px;
      border: 1px solid #D7D7D7;
      border-radius: 50px;
      margin: 0;
      padding-left: 38px;
      
      ::placeholder {
        color: ${primary};
        font-size: 16px;
      }
    }
  `
};

export const IcSearch = styled(IconSearchMagnifier)`
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: ${primary};
`;

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: ${searchBarHeightMobile}px;
  background: ${primary};
  ${baseTransition()}

  ${breakpoint.lg`
    height: ${searchBarHeightDesktop}px;
  `}
  
  ${props => {
    if (props.theme === 'nav') return types.nav;
  }};
`;
