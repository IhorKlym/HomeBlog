import styled, { css } from 'styled-components';
import DefaultAvatar from 'components/Avatar';
import { breakpoint } from 'styles/mixins';
import { fontHeading, fontText, fontLink } from 'styles/variables';
import { findTheme } from 'helpers/skins';
import { primary, black } from 'styles/colors';

export const Text = styled.div`
  font-size: 16px;
  line-height: 20px;
  margin: 0 0 3px;
  color: ${black};
  font-family: ${fontText};
  word-break: break-all;
  padding-right: 15px;
  text-align: left;

  ${({ shrinked }) => shrinked && `
    max-height: 60px;
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
  padding-bottom: 0;
  background-color: ${({ background }) => background};
  border-radius: 10px;
`;

export const HeadItem = styled.div`
  width: 100%;
  text-align: left;
  
  ${breakpoint.md`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-right: 10px;
  `}
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 10px 60px;
  position: relative;
  
  ${breakpoint.md`
    padding: 10px 0 0 65px;
  `}
`;

export const Date = styled.div`
  font-size: 12px;
  font-family: ${fontHeading}, Arial, sans-serif;
  color: ${black};
  margin-left: auto;
  margin-right: 10px;
`;

export const Author = styled.span`
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-family: ${fontLink};
  transition: color 0.3s ease;
  margin-bottom: 2px;
  color: ${black};
  
  &:hover {
    color: ${primary};
  }
  
  & > i {
    margin-left: 6px;
    color: ${primary};
    font-size: 12px;
  }
  
  ${breakpoint.md`
    font-size: 16px;
    margin: 0 15px 0 0;
  `}
`;

export const MainItem = styled.div`
  ${breakpoint.md`
    flex-grow: 1;
  `}
`;

export const MainImg = styled.div`
  width: 140px;
  min-width: 140px;
  border-radius: 20px;
  
  img { margin: 0 }
  
  ${breakpoint.md`
    width: 140px;
    min-width: 140px;
    margin: 2px 10px 0 0;
  `}
`;

export const MainContent = styled.div`
  padding: 0 20px 0 40px;
  margin-bottom: 20px;
  
  ${breakpoint.md`
    padding: 0 0 17px 65px;
    display: flex;
    justify-content: space-between;
    margin: 0;
  `}
`;

export const Main = styled.div``;

export const Avatar = styled(DefaultAvatar)`
  width: 40px;
  height: 40px;
  position: absolute;
  left:10px;
  top: 50%;
  transform: translateY(-50%);
  
  ${breakpoint.md`
    left: 10px;
    transform: none;
    top: 10px;
  `}
`;

export const Wrap = styled.div`
  width: 100%;
  margin-bottom: 10px;
  position: relative;
  
  ${({ theme }) => css`     
    .field-formatted {
      border-color: ${findTheme(theme).borderColor};
    }
  `};
  
  ${breakpoint.md`
    max-width: 980px;
    margin: 25px auto 10px;
  `}
`;

export const DeleteBtn = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  color: ${primary};
  border: 1px solid ${primary};
  border-radius: 50%;
  cursor: pointer;
  line-height: 16px;
  font-size: 15px;
  text-align: center;
`;

export const WrapPostReply = styled.div`
  & > div:last-child {
    border-bottom: none;
  }
`;

export const DeletedInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 20px;
  font-size: 16px;
  line-height: 20px;
  color: ${black};
  font-family: ${fontLink};
`;
