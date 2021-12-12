import styled from 'styled-components';
import { marbleBg, breakpoint, applyMaxWidth } from 'styles/mixins';
import { white } from 'styles/colors';

export const Wrap = styled.div`
  width: 100%;
  min-height: 100%;
  text-align: center;
  padding: 15px;
  display: flex;
  ${marbleBg('SYSTEM', true)}
  
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
  
  img {
    width: 110px;
    margin: 0 auto;
  }
  
  ${breakpoint.md`
    min-height: 320px;
    border-radius: 170px;
    padding: 25px;
  `}
  
  ${breakpoint.xl`
    width: 850px;
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
