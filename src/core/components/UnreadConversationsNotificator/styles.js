import styled from 'styled-components';
import { primary } from 'styles/colors';
import { fontLink, fontText } from 'styles/variables';

export const Wrap = styled.div`
  width: 100%;
`;

export const UserCard = styled.div`
  display: flex;
  color: black;
  font-family: ${fontLink};
  font-weight: normal;
  transition: color 0.3s ease;
  align-items: flex-start;
  width: 100%;
  
  &:hover {
    color: ${primary};
  } 
  
  & > div {
    min-width: 40px;
    height: 40px;
    position: relative;
    margin-right: 10px;
    overflow: inherit;
        
    &:after {
      content: '';
      width: 46px;
      height: 46px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border: 1px solid ${primary};
    }
    
    &:last-child {
      margin-right: 0;
      height: auto;
      border: none;
      padding: 0;
      width: 100%;
      
      &:after {
        display: none;
      }
    }
    
    img {
      border-radius: 50%;
    }
  }
  
  span {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 130px;
  }
`;

export const MessageText = styled.div`
  font-size: 14px;
  font-family: ${fontText};
  font-weight: normal;
  font-style: italic;
  border: none;
  margin-left: 50px;
  margin-top: -18px;
  margin-right: 20px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: 0.3s;
  
  &:hover {
    color: ${primary};
  }
`;

export const Time = styled.div`
  font-size: 11px;
  font-weight: normal;
  font-family: ${fontText};
`;

export const UserWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Link = styled.span`
  font-family: ${fontLink};
  font-size: 16px;
`;

