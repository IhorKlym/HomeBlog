import styled from 'styled-components';
import DefaultSelect from 'components/Select';
import DefaultTextFieldFormatted from 'components/TextFieldFormatted';
import { breakpoint } from 'styles/mixins';
import { blue, primary } from 'styles/colors';
import { fontLink } from 'styles/variables';

export const Wrap = styled.div`
  width: 100%;
  opacity: 1;
  z-index: 2;
  position: relative;
  border-radius: ${({ borderRad }) => borderRad ? '20px' : '45px'};

  div {
    font-size: 14px;
  }

  ${({ expanded }) => !expanded && `
    .quill-editor {
      .ql-toolbar {
        display: none;
      }
    }
  `}
`;

export const TextFieldFormatted = styled(DefaultTextFieldFormatted)`
  .quill-editor {
    .ql-toolbar {
      border: none;
      border-bottom: 1px solid #ccc;
    }
    .ql-container {
      border: none;
    }
  }

  .field-formatted {
    height: fit-content;
    max-height: 70px;
    min-height: 40px;
    padding: 0 93px 0 20px;
    border-radius: 0;
    border: none;
    overflow: hidden;

    & > div {
      align-items: center;
    }
  }

  .js__text-editable {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

   ${breakpoint.md`
      ${({ big, size }) => `
        .field-formatted {
          height: ${big ? '135px' : `${size}px`};
          max-height: ${big ? '135px' : `${size}px`};
          padding: ${big ? '13px 30px 0' : '0 30px'};
          border-radius: ${big ? '20px' : '45px'};
          overflow: hidden;
          line-height: 24px;

          & > div {
            align-items: ${big ? 'flex-start' : 'center'};
          }
        }

        .js__text-editable {
          margin-top: ${big ? '-10px' : '0'};
        }
      `}
  `}
`;

export const Settings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 5px 10px;
  margin: 10px 0 0;
  position: relative;
  flex-wrap: wrap;
  border-top: 1px solid;

  ${breakpoint.sm`
    flex-direction: row;
    align-items: center;
    padding-bottom: 0;
  `}

  ${breakpoint.md`
    margin: 0px 1px 0;
    padding: 5px 10px 5px;
  `}

  label {
    margin-top: 0;
  }
`;

export const Select = styled(DefaultSelect)`
    display: flex;
    align-items: center;
    margin-right: auto;
    margin-bottom: 10px;

    label {
      margin: 0;
      font-size: 14px;
      font-family: ${fontLink};
      line-height: 1.5;

      ${breakpoint.md`
        font-size: 16px;
      `}
    }

  .select {
    min-height: auto;
    margin-left: 10px;
  }

  .select__control {
    margin-left: 10px;
    padding-right: 0;
  }

  .select__option {
    padding: 0 10px;
    position: relative;

    &:hover {
      background-color: transparent;
      color: white;
    }

    &:after {
      content: "\\e92b";
      position: absolute;
      font-size: 14px;
      font-family: Icon Font !important;
      color: transparent;
      background-color: transparent;
      right: 10px;
      top: 45%;
      transform: translateY(-50%);
    }
  }

  .select__option--is-selected {
    background-color: transparent;

    &:hover {
      background-color: transparent;
      color: white;
    }

    &:after {
      color: white;
    }

    &:hover {
      color: white;
    }
  }

  .select__value-container--is-multi, .select__value-container {
    padding-left: 0;
    min-width: 120px;

    ${breakpoint.md`
      min-width: 130px;
    `}
  }

  .select__single-value {
    color: ${primary};
    font-size: 14px;
    font-family: ${fontLink};
    color: ${primary};
    font-weight: normal;

    ${breakpoint.md`
      font-size: 16px;
    `}
  }

  .select__multi-value {
    margin-top: 6px;
  }

  .select__multi-value__remove {
    margin-top: 0;
  }

  .select__control {
    border: none;
    min-height: auto;
    background: transparent;
  }

  .select__menu {
    border-radius: 20px;
    top: auto;
    position: absolute;
    bottom: 0;
    width: 100%;
    max-width: none;
    min-width: 270px;
    left: auto;
    right: 0;

    ${breakpoint.sm`
      position: absolute;
      top: auto;
      bottom: 100%;
      min-width: 275px;
      right: auto;
      left: 0;
    `}
  }

  .select__placeholder {
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.9;
    letter-spacing: 1.5px;
    color: black;
  }

  .select__indicator svg {
    color: ${primary};
  }
`;

export const UploadingFiles = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 100%;
  padding: 10px 0;
  overflow-x: scroll;

  & > * {
    margin: 0;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }

  img {
    border-radius: 10px;
    max-width: 250px;
    max-height: 75px;
    width: auto;
    height: auto;
  }

  .remove-btn {
    opacity: 1 !important;
    border-radius: 50%;
    background: white;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    margin-top: 5px;

    &:before, &:after {
      background-color: ${primary};
    }
  }
`;

export const ButtonWrap = styled.div`
  position: absolute;
  right: 0;
  margin: 0;
  margin-right: 5px;
  top: 0;

  button {
    flex-grow: 1;
    margin: 0;

    &:after {
      background: transparent;
    }
  }

  ${breakpoint.md`
    position: static;
    display: flex;
    flex-direction: row;
    margin-right: 35px;
    margin-bottom: 10px;
  `}
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px 10px;
  margin-top: 5px;

  @media only screen and (min-width: 406px) {
    margin-top: -40px;
  }

  ${breakpoint.sm`
    margin-top: 5px;
  `}

  ${breakpoint.md`
    margin-top: -15px;
  `}

  button {
    min-width: 80px;
    height: 40px;
    padding: 1px 0 0;

    ${breakpoint.md`
      min-width: 110px;
      height: 42px;
    `}
  }
`;

export const PostButton = styled.div`
  button {
    margin-left: 10px;
  }
`;

export const ChecboxItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  padding-bottom: 10px;
  padding-top: 13px;
  border-top: 1px solid #d8d8d8;

  ${breakpoint.sm`
    flex-direction: row;
  `}

  label {
    margin-left: 20px;
    margin-top: 0;

    ${breakpoint.sm`
      margin-right: 20px;
      margin-left: 0;
    `}

    span {
      margin: 2px 0 0 5px;

      ${breakpoint.md`
        margin: 2px 0 0 10px;
      `}
    }
  }
`;

export const UploadFile = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 -5px;

  button {
	  min-width: 30px;
    margin: 0 3px;

    i {
      color: ${primary};
      font-size: 23px;
      max-height: 23px;
    }
  }

  ${breakpoint.md`
    flex-direction: row;
    justify-content: space-between;

    button {
  	  min-width: 40px;
      margin: 0 5px;

      i {
        font-size: 28px;
        max-height: 28px;
      }
    }
  `}
`;

export const Close = styled.button.attrs(() => ({ type: 'button' }))`
  position: absolute;
  right: 28px;
  top: 14px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  width: 26px;
  max-width: 26px;
  height: 26px;

  &:after {
     position: absolute;
     content: '';
     right: 0;
     top: 14px;
     height: 1px;
     width: 26px;
     background-color: ${blue};
     transform: rotate(-45deg);
  }

  &:before {
     position: absolute;
     content: '';
     right: 0;
     height: 1px;
     width: 26px;
     top: 14px;
     background-color: ${blue};
     transform: rotate(45deg);
  }
`;
