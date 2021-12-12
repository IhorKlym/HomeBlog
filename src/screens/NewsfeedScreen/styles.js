import styled from 'styled-components';
import { breakpoint } from 'styles/mixins';
import { white, primary } from 'styles/colors';
import { fontLink, fontText } from 'styles/variables';

export const Wrap = styled.div`
  width: 100%;
  margin-top: 30px;
  
  aside {
    position: sticky;
    top: 70px;
    bottom: 20px;
    padding-bottom: 0;
    z-index: 20;
  
    ${breakpoint.lg`
      top: 80px;
    `}
  }
`;

export const TagsWrap = styled.div`
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  
  &::-webkit-scrollbar-track, ::-webkit-scrollbar-thumb, ::-webkit-scrollbar  {
    width: 7px;
    height: 5px;
    background: rgba(242, 242, 242, 0.0);
    transition: 0.4s;
    opacity: 0;
  }
  
  &:hover {
    &::-webkit-scrollbar-track, ::-webkit-scrollbar-thumb, ::-webkit-scrollbar  {
      border-radius: 10px;
      opacity: 1;
      cursor: pointer;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(0,0,0, 0.15);
    }
  }
`;

export const TagList = styled.div`
  display: flex;
  padding: 0 14px 20px;
  width: fit-content;
  margin: 0 auto;
  
  ${breakpoint.md`
    padding: 0 20px 20px;
  `}
`;

export const Filters = styled.div`
  margin-bottom: 20px;
  
  ${breakpoint.md`
    max-width: 980px;
    margin: 20px auto 20px;
  `}
`;

export const FiltersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Search = styled.div`
  flex: 1;
  max-width: 420px;
  min-width: 190px;
  margin: 10px 0;
  
  input {
    color: black;
    font-size: 16px;
    font-family: ${fontText};
    font-weight: normal;
  }
`;

export const FiltersToggleWrap = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-left: 20px;
    
    &:hover {
      color: black;
      
      span {
        border-color: black;
        
        &:before, &:after {
          background-color: black;
        }
      }
    }
    
    span {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      text-align: center;
      border: 1px solid ${primary};
      display: flex;
      line-height: 36px;
      justify-content: center;
      align-items: center;
      position: relative;
      transition: 0.3s;
      margin-left: 6px;
      
      &:before, &:after {
        position: absolute;
        content: '';
        background-color: ${primary};
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        transition: 0.3s;
      }
      
      &:before {
        width: 20px;
        height: 1px;
      }
      
      &:after {
        width: 1px;
        height: 20px;
      }
      
      &.active {
        &:after {
          opacity: 0;
          height: 0;
        }
      }
    }
  }
`;

export const FiltersRow = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  transition: max-height .5s ease-in-out;

  ${breakpoint.md`
    flex-wrap: nowrap;
  `}
`;

export const FiltersCol = styled.div`
  padding: 20px;
  width: 50%;
  
  ${breakpoint.md`
    width: auto;
    padding: 20px 0;
    flex: ${({ grow }) => grow || 1};
  `}
`;

export const ColTitle = styled.div`
  font-family: ${fontText};
  font-size: 14px;
  line-height: 22px;
`;

export const FiltersBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
  
  &:last-child { margin: 0; }
`;

export const FilterItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 100%;
  
  & > label {
    margin-top: 20px;
    margin-right: 20px;
  }

  ${breakpoint.md`
    min-width: 50%;
    
    & > label {
      margin-top: 13px;
    }
  `}

  ${breakpoint.lg`
    min-width: auto;
  `}
`;

export const FilterButton = styled.div`
  width: 36px;
  min-width: 36px;
  height: 36px;
  display: inline-flex;
  position: relative;
  border: 1px solid ${white};
  color: ${white};
  border-radius: 50%;
  margin-left: 18px;
  cursor: pointer;
  
  &:after,
  &:before {
    content: '';
    background-color: ${white};
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: .4s;
  }
  
  &:after {
    width: 21px;
    height: 1px;
  }
  
  &:before {
    width: 1px;
    height: 21px;
  }
  
  ${({ isOpen }) => isOpen && `
    &:before {
      height: 1px
    }
  `}
`;

export const FiltersWrap = styled.div`
  width: 100%;
  background: ${primary};
  color: ${white};
  font-family: ${fontLink};
  margin-top: 12px;
  
  ${FiltersRow} {
    max-height: ${({ isOpen }) => isOpen ? '10000px' : '0'};
  }
  
  ${breakpoint.md`
    padding: 0 30px;
  `}
`;
