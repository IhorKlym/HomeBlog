import styled from 'styled-components';
import { breakpoint } from 'styles/mixins';
import { black, gray, grayDarken, primary } from 'styles/colors';
import { fontLink } from 'styles/variables';

export const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: ${black};
`;

export const BackButton = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  line-height: 19px;
  font-weight: 600;
  font-family: ${fontLink};
  transition: .3s;
  color: ${primary};
  cursor: pointer;
  
  &:hover {
    color: black;
  }
    
  i {
    margin-right: 12px;
    line-height: 19px;
    font-size: 18px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px 0;
  
  ${breakpoint.md`
    font-size: 30px;
    justify-content: space-between;
    flex-direction: column;
  `}
  
  ${breakpoint.lg`
    flex-direction: row;
  `}

  span {
    font-size: 24px;
    line-height: 42px;
    
    ${breakpoint.md`
      font-size: 30px;
      margin-bottom: 15px;
    `}
    
    ${breakpoint.lg`
      margin-bottom: 0;
    `}
  }
  
  button {
    position: fixed;
    bottom: 10px;
    left: 10px;
    right: 10px;
    width: calc(100% - 20px);
    font-size: 16px;
    color: white;
    font-family: ${fontLink};
    padding: 15px;
    background-color: ${primary};
    border-radius: 35px;
    
    ${breakpoint.md`
      position: relative;
      width: fit-content;
      background-color: transparent;
      border-radius: 0;
      padding: 0; 
      color: ${primary};
    `}
    
    ${breakpoint.lg`
      align-self: flex-end;
    `}
  }
`;

export const SearchWrap = styled.div`
  margin-bottom: 30px;
  
  input {
    border-color: ${gray};
  }
  
  input::placeholder {
    color: black;
  }
`;

export const List = styled.div`
  flex: 1;
  overflow-y: auto;
  position: relative;
  margin: 0 -20px;
  padding: 2px 10px;
  
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0, 0.0);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${gray};
  }        
  
  ${breakpoint.sm`
    padding: 2px 30px;
  `}
`;

export const NoData = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: ${grayDarken};
  p {
    margin: 2px 0;
  }
`;
