import styled from 'styled-components';
import { primary } from 'styles/colors';
import { applyMaxWidth, breakpoint } from 'styles/mixins';
import { fontLink } from 'styles/variables';

export const Footer =  styled.footer`
  width: 100%;
  padding: 5px 0;
  background-color: ${primary};
  margin-top: auto;
  position: relative;
  bottom: 0;
  display: flex;
  justify-content: center;
  z-index: 1000;
  
  ${breakpoint.md`
    position: sticky;
  `}
`;

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 -13px;
  ${applyMaxWidth};
  
  ${breakpoint.md`
    flex-direction: row;
  `}
  
  @media (min-width: 1440px) {
    max-width: 1345px;
  }
  
  img {
    display: none;
    
    ${breakpoint.md`
       width: 100px;
       display: block;
    `}
  }
`;

export const ListItem = styled.li`
  margin: 7px 13px;
  text-align: center;
  
  ${breakpoint.md`
    margin: 0 13px;
    
    &:last-child {
      margin: 0 0 0 13px;
    }
    
    &:first-child {
      margin: 0 13px 0 0;
    }
  `}

  a {
    color: white;
    transition: 0.3s;
    font-size: 13px;
    font-family: ${fontLink};
    font-weight: normal;
    cursor: pointer;
    
    &:hover {
      color: white;
    }
  }
`;

export const FooterList = styled.ul`
  display: flex;
  flex-direction: ${({ isRow }) => isRow ? 'row' : 'column'};
  margin-top: ${({ isRow }) => isRow ? '15px' : '0'};
  
  ${breakpoint.md`
    flex-direction: row;
    margin-top: 0;
    margin-left: auto;
    padding-bottom: 2px;
  `}
`;
