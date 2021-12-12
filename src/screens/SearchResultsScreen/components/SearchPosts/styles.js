import styled from 'styled-components';
import { breakpoint } from 'styles/mixins';
import { whitePrimary } from 'styles/colors';

export const Wrap = styled.div`
  width: 100%;
  padding: 30px 0 60px;
`;

export const NoData = styled.div`
  font-size: 20px;
  min-height: 140px;
  margin-top: -30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${whitePrimary};
  
  ${breakpoint.md`
    min-height: 200px;
  `}
`;

export default { Wrap };
