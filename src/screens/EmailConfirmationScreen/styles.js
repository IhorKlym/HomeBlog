import styled from 'styled-components';
import { marbleBg, breakpoint, applyMaxWidth } from 'styles/mixins';
import { white } from 'styles/colors';

export const Wrap = styled.div`
  width: 100%;
  min-height: 100%;
  text-align: center;
  padding: 15px;
  display: flex;
  ${marbleBg(null, true)}
  
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
  justify-content: center;
  border-radius: 30px;
  margin: auto;
  min-height: 300px;
  ${applyMaxWidth};
  
  ${breakpoint.md`
    min-height: 400px;
    border-radius: 200px;
    padding: 40px 25px 40px;
  `}
  
  ${breakpoint.xxl`
    width: 1200px;
  `}
`;

export const Item = styled.div`
  margin-bottom: 50px;
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
