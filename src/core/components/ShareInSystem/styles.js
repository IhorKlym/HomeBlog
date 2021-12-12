import styled, { css } from 'styled-components';
import { primary, white } from 'styles/colors';
import { fontLink } from 'styles/variables';

export const ShareButton = styled.div`
  cursor: pointer;
  min-width: 22px;
  width: 22px;
  color: ${primary};
  font-size: 18px;
  
  & > i {
    color: ${primary};
    font-size: 18px;
    margin: 0;
  }
`;

export const ShareContent = styled.div`
  flex-direction: column;
  display: none;
  background: ${primary};
  border-radius: 20px;
  position: absolute;
  right: -20px;
  top: 100%;
  margin-top: 10px;
  z-index: 101;
  width: 180px;
  padding: 10px 0;
  
  ${({ mobile }) => mobile && `
    position: static;
    display: block;
    padding: 0;
    margin: 0;
  `}
`;

export const ShareItem = styled.div`
  color: ${white};
  text-align: center;
  padding: 5px;
  font-size: 16px;
  letter-spacing: -0.01em;
  font-family: ${fontLink};
`;

export const ShareBackDrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: none;
`;

export const Share = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  
  ${ShareButton} > i {
    color: ${primary};
    font-size: 18px;
  }
  
  ${({ isOpen }) => isOpen && css`
    ${ShareBackDrop} {
      display: block;
      z-index: 100;
    }
    
    ${ShareContent} {
      display: flex;
    }
  `}
`;
