import styled from 'styled-components';
import { zindexs, fontLink, fontText } from 'styles/variables';
import { primary } from 'styles/colors';

export const Form = styled.div`
  position: relative;
`;

export const Input = styled.input`
  background-color: transparent;
  border: solid 1px ${primary};
  height: 36px;
  box-shadow: none;
  color: black;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  padding: 5px 40px;
  color: ${primary};
  font-family: ${fontLink};

  ::placeholder {
    color: ${primary};
    font-family: ${fontText};
    font-style: italic;
  }
  
  ::-webkit-input-placeholder {
    line-height: normal !important;
  }
`;
export const IconWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  margin-top: -10px;
  width: 21px;
  height: 22px;
  padding: 0;
  box-shadow: none;
  border: none;
  cursor: pointer;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${primary};
  font-size: 24px;
`;

export const Button = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  margin-top: -11px;
  width: 21px;
  height: 22px;
  padding: 0;
  box-shadow: none;
  border: none;
  cursor: pointer;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${primary};
  font-size: 20px;
  
  i {
    transform: scale(-1, 1);
  }
`;

export const SuggestionsList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 12px 12px 5px;
  background-color: #fff;
  box-shadow: 3px 2.6px 7.4px 0.6px rgba(0, 0, 0, 0.05);
  z-index: ${zindexs.tooltip};
`;
