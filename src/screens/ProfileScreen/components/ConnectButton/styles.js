import styled from 'styled-components';
import { gray, primary, white } from 'styles/colors';
import { breakpoint } from 'styles/mixins';
import { fontLink } from 'styles/variables';

export const Tooltip = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  padding: 6px 15px;
  background: ${white};
  color: ${primary};
  font-size: 14px;
  min-width: 230px;
  font-family: ${fontLink};
  border-radius: 8px;
  text-align: center;
  z-index: 30;
  border: 1px solid ${gray};
`;

export const Wrap = styled.div`
  position: relative;
  min-width: 100px;
  
  &:hover {
    ${Tooltip} {
      display: none;
      ${breakpoint.md`
        display: block;
      `}
    }
  }
`;

export default { Wrap };
