import styled from 'styled-components';
import { breakpoint } from 'styles/mixins';
import { black, primary } from 'styles/colors';

export const Form = styled.form`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 15px;
  width: 100%;
  margin-left: 290px;
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 185px;
  
  a {
    font-size: 10px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.2;
    letter-spacing: 1.25px;
    text-align: left;
    color: ${primary};
    
    &:hover {
      color: white;
    }
  }
`;

export const Wrap = styled.div`
  width: 100%;
  margin-top: 30px;
`;

export const FormLayout = styled.form`
  width: 100%;
  padding: 20px 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  
  ${breakpoint.lg`
    flex-direction: row;
    padding: 60px;
  `}
  
  h3 {
    font-size: 22px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    text-align: center;
    color: ${black};
    margin-bottom: 15px;
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

export const WormFwrap = styled.div`
  width: 100%;
`;

export const ButtonWrap = styled.div`
  width: 50%;
  margin-top: 25px;
  margin-bottom: 10px;
  
  ${breakpoint.lg`
    width: 50%;
    margin: 25px auto 0;
  `}
`;

export const AuthItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 -3px;
  margin-bottom: 6px;
  width: 100%;
  justify-content: space-between;
  
  ${breakpoint.md`
    width: 50%;
    margin: 0 auto;
  `}
  
  & > * {
    flex-grow: 1;
    width: 100%;
    margin: 0 3px;
  }
`;

export const Item = styled.div`
  flex-grow: 1;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  
  ${breakpoint.lg`
    margin-bottom: 0 10px;
  `}
  
  img {
    width: 60px;
    height: auto;
  }
  
  h3 {
    text-align: center;
  }
`;
