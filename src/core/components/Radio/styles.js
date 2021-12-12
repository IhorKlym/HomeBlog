import styled from 'styled-components';

export const RadioChekmark = styled.span`
  width: 18px;
  height: 18px;
  border: solid 0.5px #999999;
  background-color: white;
  margin: 1px 0 0 10px;
  position: relative;
  transition: opacity .3s ease-in-out;
  
  &:before {
    content: '';
    position: absolute;
    left: -0.5px;
    top: -0.5px;
    width: 18.5px;
    height: 18.5px;
    background-color: black;
    opacity: 0;
  }
`;

export const RadioTitle = styled.div`
  font-size: 12px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.9;
  letter-spacing: 1.5px;
  color: black;
`;

export const Radio = styled.label`
  position: relative;
  display: flex;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
  margin-top: 13px;
  
  &:hover {
    color: black;
    
    ${RadioTitle} {
      color: black;
    }
    
    ${RadioChekmark} {
      border-color: black;
    }
  }
  
  &:last-child {
    margin-right: 0;
  }
  
  & > * {
    position: relative;
    z-index: 2;
  }
`;

export const RadioInput = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
  
  &:checked + ${RadioChekmark} {
    border-color: black;
    
    & + ${RadioTitle} {
      color: black;
    }
    
    &:before { opacity: 1; }
  }
`;
