import styled from 'styled-components';
import { baseTransition, marbleBg, breakpoint } from 'styles/mixins';
import { primary } from 'styles/colors';

export const ThemeWrap = styled.div`
  flex-shrink: 0;
  width: 104px;
  height: 104px;
  border: 1px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  padding: 4px;
  ${baseTransition()}

  ${({ active }) => active && `
    border-color: ${primary};
  `}
`;

export const Theme = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  position: relative;

  ${({ theme }) => `
    background-color: ${theme.bgColor};
  `}
`;

export const ThemePattern = styled.div`
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  ${({ theme }) => marbleBg(theme.id)}
`;

export const Wrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  
  ${breakpoint.md`
    justify-content: flex-start;
  `}
`;
