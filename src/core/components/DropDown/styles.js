import styled, { css } from 'styled-components';
import { baseTransition, fontLink, fontText } from 'styles/variables';
import { breakpoint } from 'styles/mixins';
import { gray, primary, whitePrimary } from 'styles/colors';

export const Label = styled.div`
  position: relative;
  font-size: 16px;
  font-weight: normal;
  display: flex;
  align-items: center;
  width: auto;
  cursor: pointer;
  transition: ${baseTransition};
`;

export const Pending = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${primary};
  margin-right: 4px;
`;

export const Wrap = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${whitePrimary};
  top: 69px;
  border-radius: 10px;
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  box-shadow: 3px 2.6px 7.4px 0.6px rgba(0, 0, 0, 0.15);
  z-index: 10;

  ${breakpoint.lg`
    top: 79px;
    display: none;
  `}

  &:before {
    position: absolute;
    content: '';
    bottom: 100%;
    right: 0;
    width: 24px;
    height: 24px;
    box-shadow: -4px -4px 10px -4px rgba(0,0,0,0.15);
    background: ${whitePrimary};

    ${breakpoint.md`
      right: auto;
      left: 50%;
      transform: rotate(45deg) translateX(-50%);
      top: -5px;
    `}
  }
`;

export const List = styled.ul`
  list-style: none;

  ${breakpoint.lg`
    padding: 0 12px;
  `}

  li {
    position: relative;
    margin: 0;
    padding: 0;
    transition: ${baseTransition};

    .nav-item {
      font-size: 14px;
      font-weight: 300;
      font-family: ${fontText};
      font-stretch: normal;
      font-style: normal;
      line-height: 1.6;
      color: ${primary};
      text-decoration: none;
      display: block;
      padding: 13px 0;
      transition: ${baseTransition};
    }

    a {
      display: flex;
      align-items: center;

      h5 {
        font-size: 16px;
        font-weight: 300;
        font-family: ${fontText};
        color: black;
        padding: 0;
        font-style: normal;
        line-height: 1;
        letter-spacing: 1.5px;
        margin-bottom: 5px;
        text-align: left;
      }

      p {
        color: #999999;
        padding: 0;
        text-align: left;
        font-size: 10px;
      }
    }
  }
`;

const sizes = {
  default: css`
    ${List} {
      width: 200px;
      min-width: 200px;

      ${breakpoint.lg`
        width: 380px;
        min-width: 380px;
      `}
    }
  `,
  sm: css`
   ${List} {
      min-width: 200px;
      width: 100%;

      li {
      }

     ${breakpoint.lg`
       width: 145px;
       min-width: 145px;
     `}
  }
  `
};

export const Backdrop = styled.div`
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${({ isOpen }) => isOpen ? '3' : '1'};

  ${breakpoint.lg`
    display: none;
  `}
`;

const types = {
  notification: css`
    ${Label} {
      width: 100%;
      display: flex;
      padding: 0 20px;
      min-height: 60px;

      i {
        max-height: 25px;
      }

      ${breakpoint.md`
        justify-content: flex-end;
        padding: 0;
        min-height: auto;
      `}
    }

    ${List} {
      border-radius: 10px;
      margin: 0;
      max-height: 500px;
      overflow-y: auto;
      min-width: 300px;

      &:before {
        right: 50%;
        transform: translateX(50%);
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

      ${breakpoint.md`
        margin: 0;
        width: 100%;
        right: 50%;
        left: auto;
        min-width: 400px;
      `}

      li {
        border-bottom: 1px solid #D7D7D7;

        & > *:not(.no-border) {
          border-bottom: 1px solid #D7D7D7;
          color: black;

          &:last-child { border-bottom: none; }
        }

        &:last-child {
          border-bottom: none;
        }

        &:first-child {
          a {
            color: ${primary};
          }
        }
      }

      &:before {
        bottom: 96%;
        transform: none;
        margin: 0;
        left: auto;
        right: 5px;

        ${breakpoint.lg`
          right: 50%;
          transform: translate(50%);
          bottom: 100%;
        `}
      }
    }
  `,

  nav: css`
    ${Label} {
      width: 100%;
      display: flex;
      padding: 0 20px;
      min-height: 60px;

      i {
        max-height: 25px;
      }

      ${breakpoint.md`
        justify-content: flex-end;
        padding: 0;
        min-height: auto;
      `}
    }

    ${List} {
      left: auto;
      right: -12px;
      border-radius: 10px;
      transform: none;
      margin: 0;

      ${breakpoint.lg`
        margin: 0;
        width: 100%;
        right: -26px;
      `}

      li {
        border-bottom: 0.7px solid #D7D7D7;
        position: relative;

        & > * {
          border-bottom: 0.7px solid #D7D7D7;

          &:last-child { border-bottom: none; }
        }

        &:last-child  {
          border-bottom: none;
        }
      }
    }

    ${Wrap} {
      &:before {
        bottom: 96%;
        transform: none;
        margin: 0;
        left: auto;
        right: 5px;

        ${breakpoint.lg`
          right: 27px;
          top: -12px;
          bottom: auto;
          transform: rotate(45deg);
        `}
      }
    }
  `,

  mobile: css`
    display: flex;
    flex-direction: column;

    ${Label} {
      width: 100%;
      display: flex;
      padding: 0 20px;
      min-height: 60px;
      position: relative;

      &::-webkit-scrollbar {
        width: 0;
        background: rgba(255, 255, 255, 0.0);
      }

      &:before {
        content: '';
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%) rotate(-45deg);
        border-left: 1px solid ${primary};
        border-bottom: 1px solid ${primary};
        width: 10px;
        height: 10px;
      }

      i {
        max-height: 25px;
      }
    }

    ${Wrap} {
      border-radius: 0;
      transform: none;
      margin: 0 0 20px;
      position: static;
      padding: 0;
      background: white;
      box-shadow: none;
      width: 100%;

      li {
        border-bottom: none;

        & > a {
          color: #000;
          padding: 5px 20px;
          font-family: ${fontLink};
          font-weight: normal;
        }
      }

      &:before {
        display: none;
      }
    }

    ${Backdrop} {
      display: none;
    }
  `
};

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 80px;
  cursor: pointer;

  ${breakpoint.lg`
    &:hover ${Wrap} {
      display: block;
    }
  `}

  ${props => {
    if (props.nav) return types.nav;
    if (props.notification) return types.notification;
    if (props.mobile) return types.mobile;
  }};

  ${props => {
    if (props.sm) return sizes.sm;
    return sizes.default;
  }};
`;
