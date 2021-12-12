import styled from 'styled-components';
import { baseTransition, breakpoint } from 'styles/mixins';
import { primary, white } from 'styles/colors';
import { fontLink } from 'styles/variables';

export const CheckboxTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${primary};
  font-family: ${fontLink};
  padding: 8px 0;
  
  ${breakpoint.md`
    padding: 15px 0;
  `}
`;

export const CheckboxText = styled.div`
  font-weight: 300;
  font-size: 14px;
  line-height: 18px;
`;

export const CheckboxCard = styled.div`
  position: relative;
  display: flex;
  border: 1px solid ${primary};
  border-radius: 10px;
  cursor: pointer;
  min-height: 135px;
  max-width: 100%;
  padding: 25px 10px 20px;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  ${baseTransition()}
  
  ${breakpoint.md`
    max-width: 200px;
    min-width: 180px;
    min-height: 180px;
    padding: 35px 25px 20px;
  `}
  
  i {
    position: absolute;
    left: 90%;
    top: 12px;
    transform: translateX(-50%);
    
    ${breakpoint.md`
      left: 50%;
    `}
  }

  &:hover {
    background-color: ${primary};
    color: ${white};

    ${CheckboxTitle} {
      color: ${white};
    }
  }

  ${({ checked }) => checked && `
    background-color: ${primary};
    color: ${white};

    ${CheckboxTitle} {
      color: ${white};
    }
  `}
`;
