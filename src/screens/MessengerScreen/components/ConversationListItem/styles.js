import styled from 'styled-components';
import { breakpoint } from 'styles/mixins';
import { primary, gray } from 'styles/colors';
import { fontLink, fontText } from 'styles/variables';

export const Inner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
`;

export const AvatarWrap = styled.div`
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  cursor: pointer;
  ${breakpoint.sm`
    margin-left: -25px;
  `}
  & > div {
    width: 100%;
    height: 100%;
  }
`;

export const InfoCol = styled.div`
  padding: 10px;
  flex: 1;
  max-width: 90%;
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

export const Title = styled.div`
  flex: 1;
  padding-right: 10px;
  font-family: ${fontLink};
  font-size: 16px;
  max-width: 180px;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Time = styled.div`
  font-size: 12px;
`;

export const Message = styled.div`
  font-size: 14px;
  font-style: italic;
  font-family: ${fontText};
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Conversation = styled.div`
  position: relative;
  border-bottom: 1px solid ${gray};
  height: 80px;
  margin: -1px -10px 0;
  padding: 0 10px;
  cursor: pointer;
  
  ${breakpoint.md`
    border: 1px solid ${gray};
    
    ${({ active }) => active && `
      margin-left: -30px;
      margin-right: -30px;
      border-color: ${primary};
      padding: 0 35px;
      z-index: 2;
      border-radius: 40px;
    `}
  `}
  
  ${({ unread }) => unread && `
    ${AvatarWrap} {
      border: 1px solid ${primary};
      padding: 2px;
    }
    ${Title} {
      color: ${primary};
    }
  `}
`;
