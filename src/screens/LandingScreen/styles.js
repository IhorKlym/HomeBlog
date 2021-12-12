import styled from 'styled-components';
import { breakpoint, applyMaxWidth } from 'styles/mixins';
import { white } from 'styles/colors';
import { fontLink } from 'styles/variables';

export const Wrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10vh 15px 5vh;
  flex-direction: column;
  
  ${breakpoint.md`
    padding: 15vh 0 5vh;
  `}
  
  h1 {
    color: ${white};
    font-size: 40px;
    line-height: 60px;
    text-align: center;
    margin-bottom: 8px;
    
    ${breakpoint.md`
      font-size: 66px;
    `}
  }
  h3 {
    color: ${white};
    text-align: right;
    font-size: 20px;
    line-height: 60px;
    font-family: ${fontLink};
    font-weight: normal;
    
    ${breakpoint.md`
      font-size: 24px;
    `}
  }
`;

export const ButtonsWrap = styled.div`
  display: flex;
  align-items: center;
  margin: auto auto 0;
  p {
    color: ${white};
    margin-left: 10px;
  }
`;

export const TitleWrap = styled.div`
  width: fit-content;
  margin: auto;
`;

export const ModalTitle = styled.div`
  font-size: 20px;
  line-height: 28px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin: auto 0 0;
  ${applyMaxWidth};
  a {
    color: ${white};
    margin-left: 20px;
    font-family: ${fontLink};
    font-size: 14px;
  }
`;
