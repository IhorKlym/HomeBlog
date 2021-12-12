// @flow

import styled, { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { fontText, customGutterSize, zindexs, fontLink } from './variables';
import { gray, nearLime, redPink, primary } from './colors';
import fonts from './fonts';
import typography from './typography';
import { breakpoint } from './mixins';

const GlobalStyle = createGlobalStyle`
  ${fonts}
  ${normalize}
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  *:focus {
    outline: none;
  }
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0, 0.0);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${gray};
  }
  html {
    height: 100%;
  }
  body {
    font: 300 16px ${fontText}, sans-serif;
    background-color: white;
    appearance: none;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    letter-spacing: -0.01em;
    
    &.modal-open {
      overflow: hidden;
    }
  }
  ${typography}
  #root {
    display: flex;
    min-height: 100%;
    background: #fff;
  }
  .pac-container {
    z-index: ${zindexs.modal + 1};
    background-color: ${primary};
    max-width: 350px;
    border-radius: 10px;
    border: none;
    font-family: ${fontLink};
    font-weight: 600;
    padding: 10px 13px;
    
    &:after {
      display: none;
    }
  }
  .pac-item, .pac-item-query {
    color: white;
    font-size: 16px;
    border: none;
  }
  .pac-item:hover {
    background-color: white;
    color: ${primary};
    
    .pac-item-query {
      color: ${primary}; 
    }
  }
  .pac-item-selected {
    background-color: white;
    color: ${primary};
    
    .pac-item-query {
      color: ${primary}; 
    }
  }
  .pac-icon {
    display: none;
  }
  .text_success {
    color: ${nearLime};
  }
  .text_error {
    color: ${redPink};
  }
  .text_center {
    text-align: center;
  }
  .d-none {
    display: none;
  }
  ${breakpoint.md`
    .d-md-block { display: block; }
  `}
  ${breakpoint.lg`
    .d-lg-block { display: block; }
  `}
  [contenteditable=true]{
    display: inline-block;
  }
  .mention[data-denotation-char] {
    display: inline-block;
    font-family: ${fontLink};
    color: black;
    cursor: pointer;
    transition: all 0.3s ease;

    span {
      display: inline-block;
      font-family: ${fontLink};
      color: black;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    &:hover {
      color: ${primary};
      font-family: ${fontText};
      font-weight: normal;
      font-style: italic;

      span {
        color: ${primary};
        font-family: ${fontText};
        font-weight: normal;
        font-style: italic;
      }
    }
  }
  ._mention-suggestion_ {
    display: inline-block;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  ${({ justifyBetween }) => justifyBetween && 'justify-content: space-between;'}
  ${({ justifyCenter }) => justifyCenter && 'justify-content: center;'}
  ${({ alignCenter }) => alignCenter && 'align-items: center;'}
  ${({ column }) => column && 'flex-direction: column;'}
  ${({ wrap }) => wrap && 'flex-wrap: wrap;'}
  ${({ margin }) => margin && `margin: 0 -${customGutterSize/2}px;`}
  
  ${breakpoint.md`
    flex-direction: row;
    align-items: flex-start;
  `}
  
  aside {
    flex-grow: 1;
    padding-bottom: 20px;
    scrollbar-width: none;
    transition: .3s;
    margin: 0 auto 30px;
    
    ${breakpoint.md`
      position: sticky;
      top: 90px;
      max-height: calc(100vh - 90px);
      overflow-y: scroll;
      overflow-x: hidden;
      min-width: 225px;
      width: 225px;
      max-width: 225px;
      margin-right: 25px;
      margin-bottom: 0;
      z-index: ${zindexs.sticky};
    `}
    
    ${breakpoint.lg`
      min-width: 325px;
      width: 325px;
      margin: 0;
      margin-right: 80px;
      flex-grow: 0;
    `}
    
    &:last-child {
      margin-right: 0;
      margin-left: 80px;
    }
  }
  
  main {
    flex-grow: 1;
    width: 100%;
    
    ${breakpoint.md`
      width: auto;
    `}
  }
`;

export default GlobalStyle;
