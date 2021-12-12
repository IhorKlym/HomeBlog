import styled from 'styled-components';
import { primary } from 'styles/colors';

const ErrorImg = styled.div`
  width: 272px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  path {
    display: inline-block;
    fill: ${primary};
    fill-rule: evenodd;
  }
`;

export default ErrorImg;
