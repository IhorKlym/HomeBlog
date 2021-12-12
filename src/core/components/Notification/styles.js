import styled from 'styled-components';
import { primary, gray } from 'styles/colors';
import { fontLink, fontText } from 'styles/variables';

export const AvatarWrap = styled.div`
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  cursor: pointer;
  & > div {
    width: 100%;
    height: 100%;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  flex: 1;
`;

export const Title = styled.div`
  font-family: ${fontText};
  font-size: 16px;
  line-height: 18px;
  font-style: normal;
  transition: 0.3s;
  
  &:hover {
    color: ${primary};
    font-family: ${fontText};
    font-style: italic;
    font-weight: normal;
  
    span {
      color: ${primary};
      font-family: ${fontText};
      font-style: italic;
      font-weight: normal;
    }
    
    strong {
      color: ${primary};
      font-family: ${fontText};
      font-style: italic;
      font-weight: normal;
    }
  }
  
  span {
    transition: color 0.3s ease;
  }

  strong {
    font-family: ${fontLink};
    cursor: pointer;
  }
`;

export const Link = styled.strong`
  cursor: pointer;
  transition: color 0.3s ease;
`;

export const Time = styled.div`
  font-size: 14px;
  line-height: 16px;
  margin-top: 7px;
  font-style: normal;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
  width: 100%;
  
  button {
    min-width: auto;
    min-height: auto;
    height: 32px;
    padding: 0 12px;
    margin: 0 5px;
  }
`;

export const Notification = styled.div`
  &.notification {
    display: flex;
    align-items: center;
    padding: 13px 0;
    border-bottom: 1px solid ${gray};
    position: relative;
    flex-wrap: wrap;
  
    ${({ unread }) => unread && `
      ${AvatarWrap} {
        border: 1px solid ${primary};
        padding: 2px;
      }
      ${Title} {
        color: black;
        transition: 0.35s;
        
        &:hover {
          color: ${primary};
        }
      }
    `}
  
  }
`;
