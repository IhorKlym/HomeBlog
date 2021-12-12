import styled, { css } from 'styled-components';
import DefaultAvatar from 'components/Avatar';
import { primary, white, whiteSecondary } from 'styles/colors';
import { breakpoint } from 'styles/mixins';
import { fontHeading, fontLink, fontText } from 'styles/variables';
import { findTheme } from 'helpers/skins';

export const Actions = styled.div`
  display: flex;
  max-width: 100%;
  margin-bottom: 10px;
  align-items: center;

  i {
    font-size: 18px;
  }

  ${breakpoint.md`
    margin: 0;
  `}
`;

export const Text = styled.div`
  letter-spacing: -0.01em;
  word-break: break-word;
  ul {
    list-style: disc;
    padding: revert;
  }

  p {
    margin-bottom: 3px;
  }

  ${breakpoint.md`
    font-size: 16px;
    line-height: 20px;
  `}

  ${({ shrinked }) => shrinked && `
    max-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

export const ReadMoreBtnWrap = styled.div`
  position: relative;
  margin-top: 10px;
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

export const Author = styled.span`
  font-weight: 600;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  font-family: ${fontLink};
  margin-bottom: 2px;
  color: #000;
  transition: 0.3s;

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
    margin: 0 10px 0 0;
    font-size: 20px;
  `}
`;

export const Avatar = styled(DefaultAvatar)`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  ${breakpoint.md`
    width: 50px;
    height: 50px;
    transform: none;
    top: -5px;
    left: -70px;
  `}
`;

export const Reply = styled.div`
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: 20px;
  text-align: left;
  color: #000;
  padding: 0 20px;
  margin-bottom: 15px;
  position: relative;
  word-wrap: anywhere;

  ${breakpoint.md`
    min-height: 72px;
    font-size: 16px;
    line-height: 20px;
    padding: 30px 15px 20px 100px;
    margin-bottom: 30px;

    ${({ theme, themeUser }) => theme && !themeUser && css`
      margin: 0 0 0 100px;
      padding: 15px 15px 15px 0;
      border-bottom: 1px solid ${findTheme(theme).borderColor};
    `};
  `}

  ${({ theme, themeUser }) => theme && themeUser && css`
    margin: 0;
    background-color: ${whiteSecondary};
    padding: 30px 20px 20px 20px;
    font-size: 16px;
    line-height: 20px;

    .response-wrap {
      border: 1px solid;
      border-color:  ${theme.borderColor};
      background-color: ${whiteSecondary};
    }

    .settings-wrap {
      border-color:  ${theme.borderColor};
      }

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 10px;
      background: url('${theme.pattern}');
      background-size: cover;
    }

    ${breakpoint.md`
      padding: 30px 15px 20px 100px;
     `}
  `};

  ${({ attachmentCard }) => attachmentCard && css`
    margin-bottom: 20px;

    ${breakpoint.md`
      padding: 10px 10px 10px 0;
    `}

    ${Avatar} {
      width: 35px;
      height: 35px;

      ${breakpoint.md`
        left: -50px;
     `}
    }

    ${Author} {
      font-size: 16px;
    }

    ${Actions} {
      display: none;
    }

    ${Text} {
      margin-left: 40px;

      ${breakpoint.md`
        margin-left: 0;
     `}
    }
  `}

`;

export const HeadItem = styled.div`
  ${breakpoint.md`
    display: flex;
    align-items: baseline;
  `}
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

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 40px;
  margin-bottom: 10px;
  position: relative;

  ${breakpoint.md`
    padding: 0;
    margin: 0;
  `}
`;

export const MainImg = styled.div`
  width: 100%;
  border-radius: 20px;
  margin: 15px 0;

  img { margin: 0 }

  ${breakpoint.md`
    width: 100px;
    min-width: 100px;
  `}

  ${breakpoint.lg`
    width: 160px;
    min-width: 160px;
  `}
`;

export const Date = styled.div`
  font-size: 12px;
  font-family: ${fontHeading}, Arial, sans-serif;
`;

export const ActionButton = styled.div`
  font-size: 18px;
  color: ${primary};
  margin-left: 15px;
  cursor: pointer;

  i {
    margin-right: 0;
  }
`;
