import styled, { css } from 'styled-components';
import { black, primary, white } from 'styles/colors';
import { fontLink, fontText } from 'styles/variables';
import { breakpoint } from 'styles/mixins';

export const List = styled.div`
  display: flex;
  align-items: center;
  overflow-x: scroll;
  padding-bottom: 50px;
  
  ${breakpoint.md`
    overflow-x: hidden;
    padding-bottom: 50px;
  `}
  
  button {
    white-space: nowrap;
    margin-left: auto;
  }
`;

export const AvatarCol = styled.div`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${black};

  i {
    font-size: 30px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.03);
    }
  }
`;

export const InfoCol = styled.div`
  padding: 6px 10px;
  font-size: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.div`
  font-family: ${fontLink};
  font-size: 20px;
  line-height: 20px;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${primary};
    font-family: ${fontText};
    font-style: italic;
    font-weight: normal;
  }
  
  i {
    color: ${primary};
    margin-left: 6px;
    display: none;
    font-size: 12px;
  }
`;

export const UserDegree = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 18px;
  margin-top: 4px;
  i {
    color: ${primary};
    margin-right: 4px;
  }
`;

export const Tooltip = styled.div`
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,0,0);
  padding: 10px 20px;
  background: ${white};
  color: ${primary};
  white-space: nowrap;
  font-family: ${fontLink};
  z-index: 30;
`;

export const UserCard = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  flex: 1;
  min-width: 80%;
  
  ${breakpoint.sm`
    min-width: 45%;
  `}
  
  ${breakpoint.lg`
    max-width: 21%;
    min-width: auto;
  `}
  
  &:hover {
    ${Tooltip} {
      display: flex;
      top: 90%;
      border-radius: 5px;
      padding: 9px 18px;
    }
  }
`;

export const Wrap = styled.div`
  ${({ border, borderColor }) => border && css`
    border-top: 1px solid ${borderColor || '#ddd'};
    padding: 20px;
    margin-left: -15px;
    width: calc(100% + 30px);
    
    ${breakpoint.md`
      border: 1px solid ${borderColor || '#ddd'};
      border-radius: 20px;
      padding: 20px;
    `}
  `}
  
  ${({ col }) => col && css`
    ${List} {
      flex-direction: row;
      overflow-x: scroll;
      padding-bottom: 0;
      
      ${breakpoint.md`
        flex-direction: column;
        overflow-x: hidden;
      `}
      
      & > button {
        white-space: nowrap;
        margin-top: 10px;
        border: none;
        padding: 0;
        min-height: auto;
        min-width: auto;
        font-size: 16px;
        height: auto;
        align-self: flex-start;
        margin-left: 0;
        
        &:hover {
          background: transparent;
          color: black;
        }
      }
    }
    ${UserCard} {
      width: 100%;
      padding: 5px 0;
      min-width: auto;
      max-width: none;
      
      &:hover {
        ${Tooltip} {
        top: 35px;
        }
      }
    }
    ${UserName} {
      font-size: 16px;
      display: flex;
      align-items: center;
      
      ${breakpoint.md`
        font-size: 18px;
      `}
      
      i {
        display: inline-block;
      }
    }
    ${UserDegree} {
      display: none;
    }
  `}

  h3 {
    color: black;
  }
`;
