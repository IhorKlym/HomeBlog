// @flow

import { css } from 'styled-components';
import { findTheme } from 'helpers/skins';

import {
  fontIcon,
  breakpoints,
  baseTransition as baseTransitionDuration,
  customGutterSize,
  containerMaxWidths
} from './variables';

export const breakpoint: any = Object.keys(breakpoints).reduce((accumulator, label) => {
  accumulator[label] = (...args: []) => css`
    @media (min-width: ${breakpoints[label]}px) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export const wMax = (width: number, ...args: []) => css`
  @media only screen and (max-width: ${width}px) {
    ${css(...args)};
  }
`;
export const wMin = (width: number, ...args: []) => css`
  @media only screen and (min-width: ${width}px) {
    ${css(...args)};
  }
`;

export const hMax = (height: number, ...args: []) => css`
  @media only screen and (max-height: ${height}px) {
    ${css(...args)};
  }
`;
export const hMin = (height: number, ...args: []) => css`
  @media only screen and (max-height: ${height}px) {
    ${css(...args)};
  }
`;

export const textOverflow = () => `
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const hoverActive = (...args: []) => `
  &:hover,
  &:focus,
  &:active,
  &.active {
    ${css(...args)};
  }
`;

export const baseTransition = () => `
  transition: ${baseTransitionDuration};
`;

export const pseudo = () => `
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const clr = () => `
  &:after {
    content: '';
    display: table;
    clear: both;
  }
`;

export const center = (axis: string) => {
  let props;

  if (axis === 'both') {
    props = 'top: 50%; left: 50%; transform: translate(-50%, -50%);';
  } else if (axis === 'horizontal') {
    props = 'left: 50%; transform: translateX(-50%); ';
  } else if (axis === 'vertical') {
    props = 'top: 50%; transform: translateY(-50%);';
  }

  return css`
    position: absolute;
    ${props}
  `;
};

export const font = (fonts: {}, fontFamily: string, fontWeight: number = 400, fontStyle: string = 'normal') => {
  const src = Object.entries(fonts).map(([ext, path]: any): string => {
    switch (ext) {
    case 'eot':
      return `url('${path}'), url('${path}?#iefix') format('embedded-opentype')`;
    case 'woff':
      return `url('${path}') format('woff')`;
    case 'woff2':
      return `url('${path}') format('woff2')`;
    case 'ttf':
      return `url('${path}') format('truetype')`;
    case 'svg':
      return `url('${path}#${fontFamily}') format('svg')`;
    default:
      return `url('${path}')`;
    }
  });

  return css`
    @font-face {
      src: ${src.join(',')};
      font-family: ${fontFamily};
      font-style: ${fontStyle};
      font-weight: ${fontWeight};
    }
  `;
};

// Helpers

export const smoothScroll = () => `
  -webkit-overflow-scrolling: touch;
`;

export const smoothFont = () => `
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const gpu = () => `
  transform: translate3d(0,0,0);
`;

export const applyMaxWidth = () => css`
  ${breakpoint.sm`max-width: ${containerMaxWidths.sm - customGutterSize}px;`}
  ${breakpoint.md`max-width: ${containerMaxWidths.md - customGutterSize}px;`}
  ${breakpoint.lg`max-width: ${containerMaxWidths.lg - customGutterSize}px;`}
  ${breakpoint.xl`max-width: ${containerMaxWidths.xl - customGutterSize}px;`}
`;

export const btnIcon = () => `
  font-family: ${fontIcon};
  position: relative;
  padding-right: .2em;
  top: .03em;
  font-size: 1.3em;
  line-height: 1;
  font-weight: 700;
`;

export const absoluteCenter = () => `
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
`;

export const marbleBg = (type: any, lg?: boolean) => {
  const { patternBg, pattern } = findTheme(type);
  return `
    background-color: ${patternBg};
    background-image: url('${pattern}');
    background-size: ${lg ? '1080px 768px' : '720px 512px'};
  `;
};
