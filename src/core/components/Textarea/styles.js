import styled from 'styled-components';
import { black, primary } from 'styles/colors';
import { baseTransition } from 'styles/variables';
import DefaultError from 'components/Error';

export const Wrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const sizes = {
  default: `
    min-height: 50px;
  `,
  lg: `
    min-height: 185px;
  `,
  xl: `
    min-height: 285px;
  `
};

export const Textarea = styled.textarea`
  width: 100%;
  color: ${black};
  background-color: transparent;
  padding: 15px 30px;
  line-height: 1.71;
  border: 1px solid ${primary};
  font-size: 16px;
  font-weight: 300;
  border-radius: 20px;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  resize: none;
  transition: border-color ${baseTransition};

  ::placeholder {
    color: ${primary};
    font-style: italic;
  }
  
  ${props => {
    if (props.lg) return sizes.lg;
    if (props.xl) return sizes.xl;
    return sizes.default;
  }};
`;

export const Error = styled(DefaultError)``;
