import styled from 'styled-components';
import { marbleBg, breakpoint } from 'styles/mixins';
import { white, black } from 'styles/colors';

export const Wrap = styled.div`
  width: 100%;
  min-height: 100%;
  text-align: center;
  padding: 15px;
  display: flex;
  ${({ theme }) => marbleBg(theme, true)}
  
  ${breakpoint.md`
    padding: 25px
  `}
`;

export const Container = styled.form`
  width: 100%;
  padding: 20px;
  background-color: ${white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 30px;
  margin: auto;
  min-height: 95vh;
  
  ${breakpoint.md`
    min-height: 600px;
    border-radius: 200px;
    padding: 40px 25px;
  `}
  
  ${breakpoint.xxl`
    width: 1200px;
  `}
  
  @media only screen and (min-height: 800px) and (min-width: 764px) {
    height: 750px;
  }
  
  h3 {
    font-size: 32px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    text-align: left;
    color: ${black};
    
    ${breakpoint.md`
      font-size: 50px;
    `}
  }
  
   p {
    font-size: 16px;
    font-weight: 300;
    max-width: 690px;
    line-height: 34px;
    
    ${breakpoint.md`
      font-size: 22px;
      min-width: 180px;
    `}
  } 
`;

export const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  button {
    margin-right: 10px;
    min-width: 135px;
    padding: 3px 5px 0;
    
    ${breakpoint.md`
      padding: 3px 39px 0;
      min-width: 180px;
      margin-right: 20px;
    `}
    
    i {
      margin-right: 6px;
    }
    
    &:last-child {
      margin-right: 0;
    }
  }
`;
