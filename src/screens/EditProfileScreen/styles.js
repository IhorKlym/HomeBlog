import styled from 'styled-components';
import DefaultError from 'components/Error';
import { primary } from 'styles/colors';
import { navigationHeightDesktop, topBarHeight, fontLink, fontText } from 'styles/variables';
import { breakpoint } from 'styles/mixins';

export const Wrap = styled.div`
  width: 100%;
`;

export const SaveBtn = styled.div`
  position: fixed;
  bottom: 10px;
  width: 100%;
  z-index: 50;
  left: 0;
  
  button {
    width: 100%;
  }
  
  ${breakpoint.sm`
    width: 400px;
    left: 50%;
    transform: translateX(-50%);
  `}
  
  ${breakpoint.md`
    position: sticky;
    top: ${navigationHeightDesktop + topBarHeight + 10}px;
    width: fit-content;
    transform: none;
    
    button {
      width: auto;
    }
  `}
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 35px;
  
  ${breakpoint.md`
    flex-direction: row;
  `}
`;

export const Error = styled(DefaultError)``;
export const Text = styled.p`
  color: black;
  font-size: 12px;
  font-family: ${fontText};
  font-style: italic;
  margin-top: 3px;
  
  ${breakpoint.md`
    font-size: 14px;
  `}
`;

export const ProfileWrap = styled.div`
  max-width: 100%;
  margin: 0 auto;
  
  ${breakpoint.md`
    max-width: 70%;
  `}
`;

export const ProfileItem = styled.div`
  margin-bottom: 30px;

  input {
    background-color: transparent;
    border-color: ${primary};
    border-radius: 10px;
    max-width: 560px;
    font-weight: 600;
    color: ${primary};
    font-family: ${fontLink};
    
    &:hover, &:active, &:focus {
      background: transparent;
    }
  }
  
  input::placeholder {
    font-weight: 300;
    font-family: ${fontText};
    color: ${primary};
  }
  
  textarea {
    max-width: 690px; 
    border-radius: 10px;
    min-height: 250px;
    
    ${breakpoint.md`
      min-height: 185px;
    `}
  }
  
  textarea::placeholder {
    font-size: 14px;
    
    ${breakpoint.md`
      font-size: 16px;
    `}
  }
`;

export const CancelButton = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  letter-spacing: 1.25px;
  line-height: 19px;
  font-weight: 600;
  font-family: ${fontLink};
  transition: .3s;
  color: ${primary};
  cursor: pointer;
  
  ${breakpoint.md`
    font-size: 18px;
    position: sticky;
    top: ${navigationHeightDesktop + topBarHeight + 10}px;
  `}
  
  &:hover {
    color: black;
  }
    
  i {
    margin-right: 12px;
    line-height: 19px;
    font-size: 18px;
    
    ${breakpoint.md`
      font-size: 20px;
    `}
  }
`;
