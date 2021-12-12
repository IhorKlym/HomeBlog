import styled from 'styled-components';
import { navigationHeightDesktop, topBarHeight, fontLink } from 'styles/variables';
import { primary, black } from 'styles/colors';
import { breakpoint } from 'styles/mixins';

export const Wrap = styled.div`
  width: 100%;
  margin-top: 30px;
`;

export const PageHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;
  justify-content: space-between;
`;

export const CancelButton = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  line-height: 19px;
  font-weight: 600;
  font-family: ${fontLink};
  transition: .3s;
  color: ${primary};
  cursor: pointer;
  
  ${breakpoint.md`
    margin-bottom: 0;
    position: sticky;
    top: ${navigationHeightDesktop + topBarHeight + 10}px;
  `}
  
  &:hover {
    color: black;
  }
    
  i {
    margin-right: 12px;
    line-height: 19px;
    font-size: 16px;
  }
`;

export const TitleWrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-weight: 300;
  text-align: center;
  margin-bottom: 25px;
  
  ${breakpoint.md`
    margin-top: -48px;
  `}

  h2 {
    font-size: 22px;
    line-height: 36px;
    color: ${black};
    
    ${breakpoint.md`
      font-size: 30px;
    `}
    
    ${breakpoint.xl`
      font-size: 36px;
    `}
  }

  p {
    font-size: 14px;
    line-height: 22px;
    color: ${black};
  }
`;

export const PageBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  ${breakpoint.md`
    flex-direction: row;
    align-items: initial;
  `}
`;

export const PageCol = styled.div`
  flex-grow: 1;
  width: 100%;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
  
  ${breakpoint.md`
    padding: 0 20px;
    flex: ${({ grow }) => grow || 1};
    width: auto;
  `}
`;

export const SearchBlock = styled.div`
  width: 100%;
  margin-bottom: 25px;
`;

export const PendingList = styled.div`
  margin-bottom: 20px;
  
  h4 {
    color: ${black};
    
    ${breakpoint.md`
      padding: 0 20px;
    `}
  }
  
  ${breakpoint.md`
    border: 1px solid ${({ borderColor }) => borderColor || '#ddd'};
    border-radius: 20px;
    padding-top: 20px;
  `}
`;

export const UserWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  
  ${breakpoint.md`
    padding: 0 20px;
  `}
 
  .user-card {
    width: 100%;
  }
`;

export const NoFriendsWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 45px 0;
  margin: 0 auto;
  
  h6 {
    color: ${black};
    letter-spacing: 1.5;
    font-weight: 400;
    font-size: 16px;
  }
`;
