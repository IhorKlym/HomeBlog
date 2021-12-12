import styled from 'styled-components';
import { red } from 'styles/colors';

export default styled.span`
  color: ${red};
  font-size: 16px;
  font-weight: 300;
  line-height: 40px;
  display: block;
  margin-top: 5px;
  white-space: pre-wrap;
  text-align: left;
  letter-spacing: normal;
  
  &:first-letter {
    text-transform: capitalize;
  }
`;
