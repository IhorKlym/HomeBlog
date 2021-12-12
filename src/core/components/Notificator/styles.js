import styled from 'styled-components';
import { breakpoint } from 'styles/mixins';
import { fontText, fontLink } from 'styles/variables';
import { primary } from 'styles/colors';

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Notification = styled.div`
  display: flex;
`;

export const NotificationTitle = styled.div`
  &.notif-title.no-border {
    border: none;
    color: ${primary};
    font-family: ${fontLink};
    font-size: 20px;
    line-height: 24px;
    margin: 20px 0 0;
    padding: 0;
  }
`;

export const NoDataWrap = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 45px 0;
  margin: 0 auto;
  
  h6 {
    color: black;
    font-weight: 400;
    font-size: 16px;
  }
`;

export const Title = styled.h3`
  color: black;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  font-family: ${fontText};
  margin-top: -53px;
`;

export const BackButton = styled.div`
  color: ${primary};;
  font-size: 16px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  letter-spacing: 1.25px;
  line-height: 19px;
  transition: .3s;
  cursor: pointer;
    
  &:hover {
    color: black;
  }
    
  i {
    margin-right: 7px;
    line-height: 19px;
  }
  
  span {
    display: none;
    
    ${breakpoint.md`
      display: block;
    `}
  }
`;
