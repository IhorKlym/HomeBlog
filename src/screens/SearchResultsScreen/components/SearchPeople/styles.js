import styled from 'styled-components';
import { breakpoint } from 'styles/mixins';
import { whitePrimary } from 'styles/colors';

export const Wrap = styled.div`
  width: 100%;
  padding: 0 20px;
  background-color: ${whitePrimary};
  
  ${breakpoint.md`
    padding: 20px;
  `}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  
  ${breakpoint.md`
    padding: 10px;
  `}
`;

export const NoData = styled.div`
  font-size: 20px;
  min-height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
