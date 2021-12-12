import styled, { css } from 'styled-components';
import { black, gray, primary, white } from 'styles/colors';
import { fontLink, fontText } from 'styles/variables';
import { breakpoint } from 'styles/mixins';

export const UserCard = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  padding: 10px 0;
  
  ${breakpoint.md`
    padding: 15px 0;
    align-items: center;
  `}
  
  ${({ divider }) => divider && `
    &:not(:last-child) {
      border-bottom: 1px solid ${divider};
    }
  `}
`;

export const AvatarCol = styled.div`
  flex-shrink: 0;
  width: 80px;
  min-width: 80px;
  padding: 10px 0;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${black};
  margin-right: 10px;
  
  ${breakpoint.md`
    margin-right: 20px;
  `}

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

  ${({ xs }) => xs && css`
    width: 50px;
    min-width: 50px;
    height: 70px;
    
    ${breakpoint.md`
      width: 72px;
      min-width: 72px;
      height: 92px;
    `}
  `}
`;

export const InfoCol = styled.div`
  font-size: 20px;
  flex: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-width: 40%;

  ${({ xs }) => xs && `
    font-size: 16px;
  `}
`;

export const UserInfo = styled.div``;

export const UserName = styled.div`
  font-family: ${fontLink};
  font-size: 20px;
  line-height: 20px;
  transition: color 0.3s ease;
  
  &:hover{
    color: ${primary};
    font-family: ${fontText};
    font-style: italic;
    font-weight: normal;
  }

  i {
    font-size: 12px;
    color: ${primary};
    margin-left: 6px;
  }
`;

export const Tooltip = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 15px;
  background: ${white};
  color: ${primary};
  font-size: 14px;
  min-width: 230px;
  font-family: ${fontLink};
  border-radius: 8px;
  text-align: center;
  z-index: 30;
  border: 1px solid ${gray};
`;

export const TooltipWrap = styled.div`
  position: relative;
  &:hover {
    ${Tooltip} {
      display: none;
      ${breakpoint.md`
        display: block;
      `}
    }
  }
`;
export const UserDesc = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 24px;
`;

export const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  padding: 5px 0;
  align-items: center;
  min-height: 70px;

  button {
    padding: 0 10px;
    flex-shrink: 0;
    height: 40px;
    width: auto;
    min-width: 80px;
    font-size: 16px;
    font-weight: normal;
    margin: 5px 0 5px 10px;
    
    ${breakpoint.md`
      flex: 0 0 auto;
      height: 48px;
      min-width: 112px;
    `}
  }
`;
