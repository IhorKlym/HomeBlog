import styled from 'styled-components';
import { primary, white } from 'styles/colors';
import { fontLink } from 'styles/variables';

export const Wrap = styled.div`
  height: 50px;
  border-radius: 25px;
  border: 1px solid ${primary};
  padding: 1px;
  display: flex;
`;

export const SwitchItem = styled.div`
  height: 100%;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  color: ${primary};
  cursor: pointer;
  font-family: ${fontLink};

  ${({ active }) => active && `
    background: ${primary};
    color: ${white};
  `};
`;

