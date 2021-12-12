import styled from 'styled-components';
import { gray, primary, whitePrimary } from 'styles/colors';
import { breakpoint } from 'styles/mixins';
import { fontLink } from 'styles/variables';

export const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  ${breakpoint.md`
    margin-left: 0;
  `}

  button {
    margin: 0 3px;
    padding: 2px 0 0;
    height: 40px;
    min-width: 85px;

    ${breakpoint.md`
      height: 45px;
      min-width: 135px;
    `}
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  a {
    color: ${primary};
    font-family: ${fontLink};
    margin-bottom: 7px;
  }

  button {
    margin-bottom: 22px;
  }
`;

export const AuthItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 0 10px;
  justify-content: space-between;
  width: 100%;

  input {
    background: transparent;
  }

  & > * {
    flex-grow: 1;
    width: 100%;
    margin: 0 3px;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Text = styled.div`
  font-size: 16px;
  text-align: center;
  width: fit-content;
  padding: 2px 20px;
  margin-top: -45px;
  margin-bottom: 20px;
  background-color: ${whitePrimary};
`;

export const AuthWrap = styled.div`
  width: 100%;
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid ${gray};

  button {
    margin-bottom: 0;
  }
`;

export const ButtonWrap = styled.div`
  width: 100%;

  button {
    margin-bottom: 33px;
  }
`;
