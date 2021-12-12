import styled from 'styled-components';
import { applyMaxWidth, breakpoint, baseTransition } from 'styles/mixins';
import { navigationHeightMobile, navigationHeightDesktop, fontLink, fontText } from 'styles/variables';
import { white, primary, gray, whitePrimary } from 'styles/colors';

export const Header = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  height: ${navigationHeightMobile}px;
  position: relative;
  ${applyMaxWidth};

  ${breakpoint.md`
    justify-content: space-between;
    height: ${navigationHeightDesktop}px;
    align-items: normal;
  `}
  
  @media (min-width: 1440px) {
    max-width: 1345px;
  }
`;

export const RightCol = styled.div`
  display: flex;
  align-items: center;
  
  & > * {
    color: black;
    font-size: 16px;
    font-family: ${fontLink};
    font-weight: 600;
    
    ${breakpoint.md`
      padding-left: 15px;
    `}
    
    ${breakpoint.lg`
      padding-left: 30px;
    `}
    
    &:hover {
      color: ${primary};
      font-style: italic;
      font-family: ${fontText};
      font-weight: normal;
    }
    
    &:first-child {
      padding-left: 0;
    }
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-shrink: 0;
  background: ${({ theme, backgroundColor }) => backgroundColor || (theme && theme.bgColor) || whitePrimary};
  ${baseTransition()}

  ${({ scrolled }) => scrolled && `
    box-shadow: 0 0 5px 2px rgba(0,0,0,0.1);
  `}

  ${({ darkMode }) => darkMode && `
    ${RightCol} {
      & > * {
        color: ${white};
        &:hover {
          color: ${gray};
        }
      }
    }
  `}
`;

export const Search = styled.div`
  cursor: pointer;
  color: ${primary};
  font-size: 25px;
  position: absolute;
  top: 50%;
  padding-left: 20px;
  right: 10px;
  transform: translateY(-50%);
  
  ${({ marginBig }) => marginBig && `
    margin-left: 15px;
  `}
  
  ${breakpoint.md`
    position: static;
    transform: none;
  `}
  
  i {
    font-size: 27px;
  }
`;

export const WrapCreatePost = styled.div`
  margin-left: 15px;
`;
