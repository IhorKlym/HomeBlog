// @flow

import { css } from 'styled-components';
import { fontHeading } from './variables';
import { breakpoint } from './mixins';
import { dark, deepSkyBlue } from './colors';

export default css`
  h1, h2, h3, h4, h5, h6 {
    display: block;
    margin: 0 0 12px;
    padding: 0;
    color: ${dark};
    font-family: ${fontHeading}, Arial, sans-serif;
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: -0.01em;

    &:last-child {
      margin-bottom: 0;
    }

    a {
      color: ${dark};
      transition: color .3s ease-in-out;
      letter-spacing: -0.01em;
    }
  }

  h1 {
    font-size: 32px;
    margin-bottom: 20px;
    ${breakpoint.md`font-size: 56px;`}
  }

  h2 {
    font-size: 26px;
    ${breakpoint.md`font-size: 32px;`}
  }

  h3 {
    font-size: 22px;
    ${breakpoint.md`font-size: 24px;`}
  }

  h4 {
    font-size: 18px;
    ${breakpoint.md`font-size: 22px;`}
  }

  h5 {
    font-size: 16px;
    ${breakpoint.md`font-size: 20px;`}
  }

  h6 {
    font-size: 14px;
    ${breakpoint.md`font-size: 16px;`}
  }

  b {
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  blockquote {
    padding: 0 0 0 8px;
    margin: 0 0 24px;
    color: ${deepSkyBlue};
    font-size: 14px;
    font-weight: normal;
    line-height: 1.71;
    border-left: 3px solid ${deepSkyBlue};
    letter-spacing: -0.01em;

    ${breakpoint.md`
      padding-left: 21px;
      font-size: 16px;
      line-height: 1.75;
    `}

    &:last-child {
      margin-bottom: 0
    }
  }

  p {
    margin: 0 0 20px;
    line-height: 20px;
    letter-spacing: -0.01em;

    &:last-child {
      margin-bottom: 0;
    }
  }
  
  button, input, textarea {
    letter-spacing: -0.01em;
  }

  a {
    cursor: pointer;
    color: ${deepSkyBlue};
    text-decoration: none;
    letter-spacing: -0.01em;

    &:hover {
      text-decoration: none;
    }
  }

  img {
    max-width: 100%;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  ol {
    list-style: none;
    padding: 0;
    margin: 0 0 20px;
    counter-reset: item;

    &:last-child {
      margin-bottom: 0;
    }

    ol {
      margin: 10px 0;
      padding-left: 20px;
    }

    li {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }

      &:before {
        content: counters(item,".") ". ";
        counter-increment: item;

        &:last-child {
          margin-bottom: 0;
        }

        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
`;
