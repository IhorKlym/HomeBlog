import styled from 'styled-components';
import { primary } from 'styles/colors';
import { fontLink } from 'styles/variables';

export const Button = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  
  i {
    margin-right: 10px;
    font-size: 16px;
    line-height: 1;
  }
`;

export const Wrap = styled.div`
  position: relative;
  color: ${({ textColor }) => textColor ? 'white' : `${primary}`};
  font-family: ${fontLink};
  
  ${({ textColor }) => textColor && `
    ${Button} {
      justify-content: center;
    }
  `}
`;
