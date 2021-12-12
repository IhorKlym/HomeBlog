import styled, { css } from 'styled-components';
import DefaultContainer from 'components/Container';
import DefaultAvatar from 'components/Avatar';
import DefaultButton from 'components/RoundedButton';
import DefaultTagList from 'components/TagList';
import DefaultShareInSystem from 'components/ShareInSystem';

import { findTheme } from 'helpers/skins';
import { fontLink, fontText } from 'styles/variables';
import { breakpoint } from 'styles/mixins';
import { primary, white, whitePrimary, whiteSecondary } from 'styles/colors';

export const Wrap = styled.div`
  width: 100%;
  padding: 10px 0 80px;
  min-height: 100%;
  overflow: hidden;
  position: relative;
  
  ${breakpoint.lg`
    padding: 30px 0 110px;
  `}
  
  ${({ theme }) => theme && css`
    background: ${theme.bgColor};
    background-size: 100% 100px;
    position: relative;
    
    & > * {
      position: relative;
      z-index: 3;
    }
    
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100px;
      z-index: 1;
      background-image: url('${theme.pattern}');
      background-color: ${theme.patternBg};
      
      ${breakpoint.lg`
        height: 350px;
      `}
      
      ${breakpoint.xl`
        height: 400px;
      `}
    }
    
    &:after {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 65px;
      width: 110vw;
      height: 60px;
      clip-path: ellipse(50% 100% at 50% 100%);
      z-index: 2;
      background: ${theme.bgColor};

      ${breakpoint.lg`
        top: 0;
        height: 600px;
      `}
      
      ${breakpoint.xl`
        height: 700px;
      `}
      
      @media only screen and (min-width: 1920px) {
        height: 900px;
        width: 120vw;
      }
    }
  `}
`;

export const ActionsControlMobile = styled.div`

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

export const BackButton = styled(DefaultButton)`
  font-size: 14px;
  display: flex;
  align-items: center;
  letter-spacing: -0.01em;
  transition: .3s;
  border: none;
  padding: 0 20px;
  height: 45px;
  position: absolute;
  left: 0;
  top: 0;
  color: ${primary};
  
  &:hover {
    color: ${white};
  }
    
  i {
    margin-right: 7px;
    font-size: 16px;
  }
`;

export const Container = styled(DefaultContainer)`
  @media (min-width: 1440px) {
    max-width: 1400px;
  }
`;

export const Head = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 20px;
`;

export const Avatar = styled(DefaultAvatar)`
  width: 100px;
  height: 100px;
  margin-bottom: 25px;
`;

export const Author = styled.div`
  font-family: ${fontLink};
  letter-spacing: -0.01em;
  margin-bottom: 10px;
  font-size: 24px;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  
  ${({ hasHover }) => hasHover && `
    cursor: pointer;
    
    &:hover {
      color: ${primary};
      font-weight: normal;
      font-family: ${fontText};
      font-style: italic;
    }
  `}
  
  i {
    color: ${primary};
    font-size: 16px;
    margin-left: 7px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Date = styled.div`
  font-size: 14px;
`;

export const Person = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Action = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  
  ${breakpoint.lg`
    display: flex;
    align-items: center;
  `}
`;

export const ActionsLink = styled.div`
  min-width: 45px;
  height: 45px;
  border: none;
  padding: 0;
  margin-left: 10px;
  color: ${primary};
  background-color: ${whitePrimary};
  font-family: ${fontLink};
  font-size: 16px;
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: .3s;
  
  &:hover {
    color: ${white};
    background-color: ${primary};
    
    & div > i {
      color: ${white};
    }
  }
  
  & > span {
    padding: 0 20px;
    display: inline-flex;
  }

  i {
    font-size: 22px;
    
    &:last-child { margin-right: 0; }
  }
`;

export const ActionsControl = styled.div`
  color: ${white};
  text-align: center;
  padding: 5x;
  font-size: 16px;
  letter-spacing: -0.01em;
  font-family: ${fontLink};
  width: 100%;
  margin: 0;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ActionsContent = styled.div`
  flex-direction: column;
  display: none;
  background: ${primary};
  border-radius: 20px;
  position: absolute;
  right: -10px;
  top: 100%;
  margin-top: 10px;
  z-index: 101;
  width: 180px;
  padding: 10px 0;
`;

export const ActionsButton = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  width: 45px;
  min-width: 45px;
  height: 45px;
  background-color: ${white};
  
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
    content: ' ';
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

export const ContentImg = styled.div`
  margin-bottom: 20px;
  border-radius: 25px;
  overflow: hidden;
  
  ${breakpoint.lg`
    width: 370px;
    min-width: 370px;
    margin-bottom: 0;
    margin-right: 20px;
  `}
  
  ${breakpoint.xl`
    width: 470px;
    min-width: 470px;
  `}
`;

export const ContentText = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: -0.01em;
  text-align: center;
  word-break: break-word;
  padding-right: 15px;
    
  ${breakpoint.lg`
    text-align: left;
    font-size: 22px;
    line-height: 34px;    
  `}
`;

export const TagList = styled(DefaultTagList)``;

export const ContentBlock = styled.div`
  ${breakpoint.lg`
    flex-grow: 1;
    max-width: 580px;
    
    ${({ center }) => center && css`
      max-width: 800px;
      margin: 0 auto;
      
      ${ContentText} {
        text-align: center;
      }
      
      ${TagList} {
        justify-content: center;
      }
    `}
  `}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  
  ${breakpoint.lg`
    flex-direction: row;
    margin-bottom: 56px;
  `}
`;

export const RepostRow = styled.div`

`;

export const RepliesList = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const Footer = styled.div`
  padding: 0 20px;
  position: relative;
  margin: 10px auto 0;
  width: 100%;
  max-width: 1020px;
  
  .field-formatted {
    width: 100%;
    background-color: ${whiteSecondary};
    border-radius: 45px;
    padding: 0 30px;
    border: 1px solid rgba(242, 242, 242, 0.8);
    resize: none;
    font-size: 16px;
    color: #000;
    display: flex;
    align-items: center;
    padding-top: 4px;
    
    & > div:last-child {
      height: 100%;
      overflow-y: auto;
      display: flex;
      padding: 10px 0;
      margin-top: -16px;
    }
    
    &:focus, &:active {
      outline: none;
    } 
   }
   
  ${({ theme }) => theme && css`
    .response-wrap {
      border: 1px solid;
      border-color:  ${theme.borderColor};
      background-color: ${whiteSecondary};
    }
    
    .settings-wrap {
      border-color:  ${theme.borderColor};
      }
   `}
`;

export const ShareInSystem = styled(DefaultShareInSystem)`
  min-width: 100%;
  min-height: 100%;
  display: flex;
  align-items: stretch;
  justify-content: stretch;

  & > div:first-child {
    min-width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  & > div:last-child {
    color: black;
    
    i {
      color: ${primary};
    }
  }
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
    ${({ theme }) => css`border-bottom: 1px solid ${findTheme(theme).borderColor};`}
  `}
`;

export const Error = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding: 0 20px;
  text-align: center;

  ${breakpoint.md`
    font-size: 24px;
  `}
`;
