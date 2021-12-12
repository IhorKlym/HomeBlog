import styled from 'styled-components';
import { black, gray } from 'styles/colors';

export const Wrap = styled.div`
  background-color: ${gray};
  position: relative;
  width: 100%;
  height: 4px;
`;

export const Bar = styled.div`
  position: absolute;
  background: ${black};
  top: 0;
  left: 0;
  height: 100%;
  transition: width 200ms ease 0s;
`;

