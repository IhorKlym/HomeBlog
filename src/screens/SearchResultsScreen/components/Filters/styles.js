import styled from 'styled-components';
import { breakpoint } from 'styles/mixins';
import { white, primary } from 'styles/colors';
import { fontLink, fontText } from 'styles/variables';

export const FilterHeader = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    color: ${white};
  }
`;

export const HeadCol = styled.div`
  display: flex;
  align-items: center;
`;

export const FiltersCount = styled.div`
  font-style: italic;
  margin-left: 10px;
  font-family: ${fontText};
  font-size: 14px;
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
  padding: 0 20px 20px;
  width: 50%;
  
  ${breakpoint.md`
    width: auto;
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
  min-width: 100%;
  
  & > label {
    margin-top: 20px;
  }

  ${breakpoint.md`
    min-width: 50%;
    
    & > label {
      margin-top: 13px;
    }
  `}

  ${breakpoint.lg`
    min-width: 33%;
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

export const Wrap = styled.div`
  width: 100%;
  background: ${primary};
  color: ${white};
  font-family: ${fontLink};
  
  ${FiltersRow} {
    max-height: ${({ isOpen }) => isOpen ? '10000px' : '0'};
  }
  
  ${breakpoint.md`
    padding: 0 30px;
    
    ${FiltersRow} {
      max-height: none;
    }
  `}
`;
