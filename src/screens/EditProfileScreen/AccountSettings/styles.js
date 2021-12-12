import styled from 'styled-components';
import DefaultError from 'components/Error';
import DefaultSelect from 'components/Select';
import { navigationHeightDesktop, topBarHeight, fontLink, fontText } from 'styles/variables';
import { primary } from 'styles/colors';
import { breakpoint } from 'styles/mixins';

export const Wrap = styled.div`
  width: 100%;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 35px;
  
  ${breakpoint.md`
    flex-direction: row;
  `}
  
  h2 {
    font-size: 36px;
    line-height: 36px;
    color: black;
    margin-bottom: 25px;
  }
  
  ${breakpoint.md`
    margin-bottom: 45px;
  `}
  
  h4 {
    font-size: 22px;
    line-height: 36px;
    color: black;
  }
  
  p {
    font-style: italic;
    margin-bottom: 30px;
  }
`;

export const Field = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  
  ${breakpoint.md`
   flex-direction: row;
  `}
  
  & > div {
    flex: 1;
    margin-bottom: 20px;
    max-height: 110px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    ${breakpoint.md`
      flex: 1;
      margin-bottom: 0;
      margin-right: 15px; 
      max-height: none;
    
      &:last-child {
        margin-bottom: 0;
        margin-right: 0; 
      }
    `}
  }
  
  ${breakpoint.md`
    flex-direction: row;
  `}
`;

export const Text = styled.p`
  color: black;
  font-size: 12px;
  font-family: ${fontText};
  font-style: italic;
  margin-top: 3px;
  
  ${breakpoint.md`
    font-size: 14px;
  `}
  
  a {
    color: ${primary};
    font-family: ${fontText};
    transition: 0.3s;
    border-bottom: 1px solid transparent;
    
    &:hover {
      color: ${primary};
      border-bottom-color: ${primary};
    }
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #D7D7D7;
  margin: 30px 0;
  
  ${breakpoint.lg`
    max-width: 580px
  `}
  
  ${breakpoint.xl`
    max-width: 780px
  `}
`;

export const SettingsWrap = styled.div`
  max-width: 100%;
  padding: 0 15px 80px;
  
  ${breakpoint.lg`
    max-width: 580px;
    padding-right: 80px;
    padding-left: 0;
  `}
  
  ${breakpoint.xl`
    max-width: 780px;
    padding-right: 110px;
  `}
 `;

export const Select = styled(DefaultSelect)`
  margin-bottom: 40px;
  
  .select {
    min-height: auto;
  }
  
  .select__value-container--is-multi {
    padding-left: 0px;
  }
  
  .select__multi-value {
    margin-top: 6px;
    background: transparent;
    font-size: 16px;
    font-family: ${fontLink};
  }
  
  .select__multi-value__remove {
    margin-top: 0;
  }
  
  .select__menu {
    left: auto;
    right: 0;
    border-radius: 10px;
    box-shadow: 0 2px 4px 0 rgba(255, 255, 255, .5);
  }
  
  .select__control {
    background-color: transparent;
    border: none;
    min-height: auto;
  }
  
  .select__dropdown-indicator {
    width: 36px;
    height: 36px;
    border: 1px solid ${primary};
    border-radius: 50%;
    padding: 0;
    max-width: 36px;
    max-height: 36px;
    min-width: 36px;
    position: relative;
    
    svg {
      display: none;
    }
    
    &:after, &:before {
      position: absolute;
      content: '';
      background-color: ${primary};
    }
    
    &:after {
      width: 21px;
      height: 1px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    
    &:before {
      height: 21px;
      width: 1px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  
  .select__multi-value__remove, .select__clear-indicator {
    svg {
      width: 20px;
      height: 20px;
      fill: ${primary};
      stroke: none;
    }
  }
  
  .select__placeholder {
    font-size: 16px;
    font-stretch: normal;
    font-style: normal;
    font-weight: 600;
    font-family: ${fontLink};
    line-height: 1.9;
    color: black;
  }
`;

export const Error = styled(DefaultError)``;

export const CancelButton = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  line-height: 19px;
  font-weight: 600;
  font-family: ${fontLink};
  transition: .3s;
  color: ${primary};
  cursor: pointer;
  margin-bottom: 30px;
  
  ${breakpoint.md`
    margin-bottom: 0;
    position: sticky;
    top: ${navigationHeightDesktop + topBarHeight + 10}px;
  `}
  
  &:hover {
    color: black;
  }
    
  i {
    margin-right: 12px;
    line-height: 19px;
    font-size: 16px;
  }
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
  
  ${breakpoint.lg`
    position: sticky;
    top: ${navigationHeightDesktop + topBarHeight + 10}px;
    width: fit-content;
    transform: none;
    
    button {
      width: auto;
    }
  `}
`;
