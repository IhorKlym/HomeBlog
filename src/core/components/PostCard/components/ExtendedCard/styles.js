import styled, { css } from 'styled-components';
import DefaultAvatar from 'components/Avatar';
import { breakpoint, marbleBg } from 'styles/mixins';
import { fontHeading, fontText, fontLink } from 'styles/variables';
import { findTheme } from 'helpers/skins';
import { primary, white, black } from 'styles/colors';

export const Text = styled.div`
  font-size: 18px;
  line-height: 24px;
  margin: 4px 0 5px;
  color: ${black};
  font-family: ${fontText};
  word-break: break-word;
  padding-right: 15px;

  span {
    transition: 0.3s all ease;
    cursor: pointer;

    &:hover {
      font-style: italic;
      color: ${primary};
    }
  }

  ${({ shrinked }) => shrinked && `
    max-height: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

export const ReadMoreBtnWrap = styled.div`
  position: relative;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  &:after {
    content: '';
    display: inline-flex;
    width: 5px;
    height: 5px;
    border-left: 1px solid ${primary};
    border-bottom: 1px solid ${primary};
    transform: rotate(${({ open }) => open ? '135deg' : '-45deg'});
    margin-left: 5px;
  }
`;

export const Content = styled.div`
  padding-bottom: 20px;
  background-color: ${({ background }) => background};
`;

export const HeadItem = styled.div`
  ${breakpoint.md`
    display: flex;
    align-items: baseline;
  `}
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 0 40px;
  position: relative;

  ${breakpoint.md`
    padding: 15px 20px 0 100px;
  `}
`;

export const Date = styled.div`
  font-size: 12px;
  font-family: ${fontHeading}, Arial, sans-serif;
  color: ${black};
`;

export const SmallText = styled.small`
  font-size: 13px;
  font-family: ${fontText};
  color: ${white};
  position: relative;
  padding: 2px 6px;
  border-radius: 10px;
  background-color: ${primary};
  margin-left: 6px;
`;

export const Author = styled.span`
  font-weight: 600;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  font-family: ${fontLink};
  transition: color 0.3s ease;
  margin-bottom: 2px;
  color: ${black};

  ${({ hasHover }) => hasHover && `
    cursor: pointer;

    &:hover {
      color: ${primary};
      font-weight: normal;
      font-family: ${fontText};
      font-style: italic;
    }
  `}

  & > i {
    margin-left: 6px;
    color: ${primary};
    font-size: 12px;
  }

  ${breakpoint.md`
    font-size: 20px;
    margin: 0 15px 0 0;
  `}
`;

export const MainItem = styled.div`
  ${breakpoint.md`
    flex-grow: 1;
  `}
`;

export const MainImg = styled.div`
  width: 100%;
  border-radius: 20px;
  margin: 15px 0;

  img { margin: 0 }

  ${breakpoint.md`
    width: 300px;
    min-width: 300px;
    margin: 10px -40px 0 0;
  `}

  ${breakpoint.lg`
    width: 400px;
    min-width: 400px;
  `}
`;

export const MainContent = styled.div`
  padding: 0 20px 0 40px;
  margin-bottom: 20px;
  min-height: 80px;

  ${breakpoint.md`
    padding: 0 20px 20px 100px;
    display: flex;
    justify-content: space-between;
    margin: 0;
  `}
`;

export const RepostRow = styled.div`
  padding: 20px 24px 10px;
`;

export const Main = styled.div`
  ${breakpoint.md`
    min-height: 135px;
  `}
`;

export const Avatar = styled(DefaultAvatar)`
  width: 40px;
  height: 40px;
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  ${breakpoint.md`
    width: 100px;
    height: 100px;
    left: -20px;
    transform: none;
    top: 10px;
  `}
`;

export const MoreRepliesBtn = styled.div`
  display: flex;
  margin-bottom: 10px;
  padding: 0 20px;
  align-items: center;
  font-size: 16px;
  color: ${primary};

  button {
    color: ${primary};
    font-size: 16px;
    letter-spacing: -0.01em;
  }

  &:after {
    content: '';
    display: inline-flex;
    width: 5px;
    height: 5px;
    border-left: 1px solid ${primary};
    border-bottom: 1px solid ${primary};
    transform: rotate(-45deg);
    margin-left: 3px;
  }

  ${breakpoint.md`
    margin-left: 100px;
    padding: 5px 0 0;
    ${({ theme }) => css`border-top: 1px solid ${findTheme(theme).borderColor};`}
  `}
`;

export const Footer = styled.div`
  padding: 0 20px;

  ${breakpoint.md`
    margin-top: 20px;
  `}

  .field-formatted {
    width: 100%;
    background-color: transparent;
    border-radius: 45px;
    resize: none;
    font-size: 16px;
    color: #000;

    &:focus, &:active {
      outline: none;
    }
   }
`;

export const Actions = styled.div`
  display: flex;
  max-width: 100%;
  margin-bottom: 10px;
  align-items: center;

  ${breakpoint.sm`
    margin-bottom: 0;
  `}
`;

export const ActionsControlMobile = styled.div`

`;

export const ActionsControl = styled.div`
  cursor: pointer;
  font-size: 11px;
  display: flex;
  align-items: center;
  margin-right: 15px;
  color: ${primary};
  transition: 0.3s color ease;
  font-family: ${fontLink};

  ${breakpoint.sm`
    font-size: 12px;
  `}

  ${breakpoint.md`
    margin-right: 20px;
    font-size: 16px;
  `}

  &:last-child {
    margin: 0;
  }

  i {
    color: ${primary};
    font-size: 16px;
    margin-right: 5px;
    transition: 0.3s color ease;

    ${breakpoint.sm`
      font-size: 18px;
    `}
  }

  &:hover {
    color: black;

    i {
      color: black;
    }
  }
`;

export const TextWrap = styled.div`
  font-weight: 300;
  font-size: 15px;
  line-height: 22px;
  text-align: center;
  margin-bottom: 15px;
  font-family: ${fontHeading};
  font-style: italic;

  ${breakpoint.sm`
    font-size: 18px;
  `}

  ${breakpoint.md`
    font-size: 22px;
    margin-bottom: 20px;
    line-height: 27px;
  `}
`;

export const Wrap = styled.div`
  width: 100%;
  margin-bottom: 20px;
  position: relative;
  padding-top: 10px;
  ${({ theme }) => marbleBg(theme)}

  ${({ theme }) => css`
    ${MainContent} {
      border-bottom: 1px solid ${findTheme(theme).borderColor};
    }

    ${RepostRow} {
      border-bottom: 1px solid ${findTheme(theme).borderColor};
    }

    .response-wrap {
      border: 1px solid;
      border-color: ${findTheme(theme).borderColor};
    }

    .settings-wrap {
       border-color: ${findTheme(theme).borderColor};
    }
  `};

  ${breakpoint.md`
    max-width: 980px;
    margin: 0 auto 20px;
  `}

  ${({ actionsDisabled }) => actionsDisabled && `
    &:after {
      display: block;
      content: "";
      position: absolute;
      z-index: 1000;
      top: 0;
      left: -30px;
      right: -30px;
      bottom: 0;
    }
  `}
`;

export const ActionsButton = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 10px 5px;
  cursor: pointer;

  & > span {
    width: 4px;
    height: 4px;
    border-radius: 50px;
    margin-right: 5px;
    border: 1px solid ${primary};

    &:last-child {
      margin-right: 0;
    }
  }

  &:before {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: none;
  }
`;

export const ActionsControlText = styled.div`
  color: ${white};
`;

export const ActionsContent = styled.div`
  flex-direction: column;
  display: none;
  background: ${primary};
  border-radius: 20px;
  position: absolute;
  right: -20px;
  top: 100%;
  margin-top: 10px;
  z-index: 101;
  width: 180px;
  padding: 10px 0;

  ${ActionsControl} {
    color: ${white};
    text-align: center;
    padding: 5px;
    font-size: 16px;
    letter-spacing: -0.01em;
    font-family: ${fontLink};
    width: 100%;
    margin: 0;
    align-items: center;
    justify-content: center;
  }
`;

export const ActionsDropdown = styled.div`
  position: relative;

  ${({ isOpen }) => isOpen && `
    ${ActionsContent} {
      display: flex;
    }

    ${ActionsButton} {
      &:before {
        display: block;
      }
    }
  `}
`;

export const WrapPostReply = styled.div`
  & > div:last-child {
    border-bottom: none;
  }
`;
