import styled from 'styled-components';
import { breakpoint } from 'styles/mixins';
import { gray, black } from 'styles/colors';

export const Form = styled.form`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 15px;
  width: 100%;
  margin-left: 290px;
`;

export const Wrap = styled.div`
  width: 100%;
  margin-top: 30px;
`;

export const FormLayout = styled.form`
  width: 100%;
  padding: 20px 10px;
  background-color: ${gray};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  
  ${breakpoint.lg`
    flex-direction: row;
    padding: 60px;
    padding-right: 114px;
  `}
  
  h3 {
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: 1.2px;
    text-align: left;
    color: ${black};
  }
  
  a {
    font-size: 10px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.2;
    letter-spacing: 1.25px;
    text-align: left;
    color: black;
    
    &:hover {
      color: #999999;
    }
  }
`;

export const FormWrap = styled.div`
  width: 100%;
  
  p {
    font-size: 12px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.83;
    letter-spacing: 1.5px;
    text-align: left;
    color: black;
    margin-top: 15px;
    
    span {
      color: #999999;
      cursor: pointer;
    }
  }
`;

export const ButtonWrap = styled.div`
  width: 50%;
  margin-top: 25px;
  margin-bottom: 10px;
  
  ${breakpoint.lg`
    width: 35%;
  `}
`;

export const AuthItem = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 6px;
  width: 100%;
  justify-content: space-between;
  
  input {
    margin-bottom: 5px;  
  }
  
  ${breakpoint.md`
    flex-direction: row;
    width: 50%;
    margin: 0 -3px;
  `}
  
  & > * {
    flex-grow: 1;
    width: 100%;
    margin: 0 3px;
  }
`;
