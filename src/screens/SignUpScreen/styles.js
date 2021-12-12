import styled from 'styled-components';
import { breakpoint, marbleBg } from 'styles/mixins';
import { fontLink } from 'styles/variables';
import { black, primary, white, whitePrimary } from 'styles/colors';

export const Wrap = styled.div`
  width: 100%;
  text-align: center;
  background: ${whitePrimary};

  ${breakpoint.lg`
    text-align: left;
  `}
`;

export const StepWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  & > div:first-of-type {
    flex-grow: 1;
  }
`;

export const Toolbar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 8vw 25px;
`;

export const BackButton = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 1.25px;
  line-height: 19px;
  font-weight: 600;
  font-family: ${fontLink};
  transition: .3s;
  color: ${primary};
  cursor: pointer;

  &:hover {
    color: black;
  }

  i {
    margin-right: 12px;
    line-height: 19px;
    font-size: 20px;
  }
`;

export const FormLayout = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  flex: 1;
  left: 0;

  h3 {
    font-size: 24px;
    font-stretch: normal;
    font-style: normal;
    text-align: left;
    line-height: 1.35;
    margin-bottom: 37px;
    color: black;

    ${breakpoint.md`
      font-size: 50px;
      margin-bottom: 57px;
    `}
  }

  a {
    font-size: 10px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.2;
    letter-spacing: 1.25px;
    text-align: left;
    color: black;

    &:hover {
      color: #999999;
    }
  }
`;

export const FieldsWrap = styled.div`
  margin-bottom: 0;
  margin-top: 40px;
  width: 100%;

  ${breakpoint.lg`
    width: 880px;
    margin-bottom: 40px;
  `}

  ${breakpoint.xl`
    width: 1080px;
    margin-bottom: 10px;
  `}

  input:not([type="range"]) {
    border-radius: 10px;
    height: 50px;
    border-color: ${primary};
    font-size: 16px;
    background-color: transparent;

    ${breakpoint.md`
      height: 100px;
      font-size: 32px;
      border-radius: 20px;
    `}
  }

  input::placeholder {
    font-size: 16px;

    ${breakpoint.md`
      font-size: 32px;
    `}
  }

  input:focus, input:hover {
    background-color: transparent;
  }

  input[type=password] {
    color: ${primary};
  }

  span {
    text-align: right;
    color: black;
    font-size: 16px;
    font-weight: 300;
    line-height: 40px;
  }
`;

export const ButtonWrap = styled.div`
  width: 100%;
  margin: auto auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: sticky;
  bottom: 0;
  background: transparent;
  padding: 10px;
  z-index: 1000;

  ${breakpoint.md`
    justify-content: ${({ toEnd }) => toEnd ? 'flex-end' : 'space-between'} ;
    flex-direction: row;
    position: static;
    padding: 0 8vw;
    margin-bottom: 30px;
  `}

  @media only screen and (min-height: 700px) and (min-width: 1024px) {
    position: fixed;
  }

  p {
    margin-bottom: 10px;
    text-align: center;

    ${breakpoint.md`
      text-align: left;
      margin-bottom: 0;
    `}
  }

  button {
    margin-bottom: 15px;
    width: 100%;

    ${breakpoint.md`
      width: auto;
      margin-right: 30px;
      margin-bottom: 0;

      &:last-child {
        margin-right: 0;
      }

    `}

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const AuthItem = styled.div`
  display: flex;
  margin: 0 -5px;
  margin-bottom: 30px;
  justify-content: space-between;
  flex-direction: column;
  align-items: ${({ alignStretch }) => alignStretch ? 'stretch' : 'center'};

  &:last-child {
    margin-bottom: 0;
  }

  ${breakpoint.md`
    align-items: ${({ alignStretch }) => alignStretch ? 'stretch' : 'flex-start'};
    flex-direction: row;
  `}

  ${({ toStart }) => toStart && 'justify-content: flex-start;'}

  & > * {
    flex-grow: 1;
    width: 100%;
    max-width: 880px;
    margin: 0 5px 10px;

    ${breakpoint.md`
      margin: 0 5px 0;
    `}
  }

  textarea {
    ${breakpoint.md`
      min-height: 185px;
    `}
  }
`;

export const Item = styled.div`
  flex-grow: 1;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;

  ${breakpoint.lg`
    margin-bottom: 0 10px;
  `}

  img {
    width: 60px;
    height: auto;
  }

  h3 {
    text-align: center;
  }
`;

export const Text = styled.span`
  color: black;
  font-size: 10px;

  ${breakpoint.lg`
    font-size: 12px;
  `}
`;

export const TagList = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 40px;

  ${breakpoint.md`
    justify-content: flex-start;
  `}
`;

export const NoDataText = styled.div`
  color: black;
  font-size: 18px;
  line-height: 2;
  margin-top: 20px;

  ${breakpoint.lg`
    font-size: 24px;
  `}
`;

export const Subtitle = styled.p`
  margin-bottom: 0;
  margin-top: -30px;
`;

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  text-align: center;
  padding: 15px;
  display: flex;
  ${marbleBg()}

  ${breakpoint.md`
    padding: 25px
  `}
`;

export const Container = styled.form`
  width: 100%;
  padding: 20px;
  background-color: ${white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 30px;
  margin: auto;
  min-height: 95vh;

  ${breakpoint.md`
    min-height: 600px;
    border-radius: 200px;
    padding: 40px 25px;
  `}

  ${breakpoint.xxl`
    width: 1200px;
  `}

  @media only screen and (min-height: 800px) and (min-width: 764px) {
    height: 750px;
  }

  h3 {
    font-size: 32px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    text-align: left;
    color: ${black};

    ${breakpoint.md`
      font-size: 50px;
    `}
  }

   p {
    font-size: 16px;
    font-weight: 300;
    max-width: 690px;
    line-height: 34px;

    ${breakpoint.md`
      font-size: 22px;
      min-width: 180px;
    `}
  }
`;
