import styled, { css }  from 'styled-components';
import { breakpoint } from 'styles/mixins';
import { white, black, gray, blue, primary, primaryRed } from 'styles/colors';
import DefaultSelect from 'components/Select';
import DefaultError from 'components/Error';
import { fontLink, fontText } from 'styles/variables';

export const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 500px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;

  ${breakpoint.md`
    padding: 30px 0;
  `}
`;

export const Title = styled.div`
  color: ${primary};
  font-size: 22px;
  font-family: ${fontLink};
`;

export const ActionItem = styled.div`
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.83;
  text-align: left;
  color: black;
  padding: 10px 10px;
  margin: 0 -10px;


  ${breakpoint.md`
    margin: 0 -38px;
    padding: 10px 38px;
  `}

  ${props => props.border ? `
    border-bottom: 1px solid ${gray};
  ` : ''};

  ${props => props.row ? `
    display: flex;
    align-items: center;
    padding-top: 23px;
    label {
      margin-top: 0;
    }
  ` : ''};

  ${({ flexGrow }) => flexGrow && css `
    flex-grow: ${flexGrow};
  `}

  .field-formatted {
    padding: 0;
    resize: none;
    border: none;
    width: 100%;

    &::placeholder {
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.43;
      letter-spacing: 1.4px;
      text-align: left;
      color: #8c8c8c;
    }
  }

  .ql-toolbar.ql-snow {
    border: none;
    border-bottom: 1px solid ${gray};
    font-family: ${fontLink};
  }

  .ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill {
    fill: black;
  }
  
  .quill-editor .ql-editor {
    font-family: ${fontText};
    font-size: 18px;
  }

  .ql-snow .ql-stroke {
    stroke: black;
  }

  .ql-editor strong {
    font-family: ${fontLink};
  }

  .ql-editor.ql-blank::before {
    font-family: ${fontText};
    font-size: 24px;
    color: ${primary};
  }

  .ql-container.ql-snow {
    border: none;
  }

  .ql-editor {
    padding: 12px 15px 0;
  }

  .ql-snow.ql-toolbar button:hover, .ql-snow .ql-toolbar button:hover, .ql-snow.ql-toolbar button:focus, .ql-snow .ql-toolbar button:focus, .ql-snow.ql-toolbar button.ql-active, .ql-snow .ql-toolbar button.ql-active, .ql-snow.ql-toolbar .ql-picker-label:hover, .ql-snow .ql-toolbar .ql-picker-label:hover, .ql-snow.ql-toolbar .ql-picker-label.ql-active, .ql-snow .ql-toolbar .ql-picker-label.ql-active, .ql-snow.ql-toolbar .ql-picker-item:hover, .ql-snow .ql-toolbar .ql-picker-item:hover, .ql-snow.ql-toolbar .ql-picker-item.ql-selected, .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
    stroke: ${primary};
    color: ${primary};
  }

  input {
    background-color: transparent;
    border-color: transparent;
    padding: 0;
    height: auto;

    ::placeholder {
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.83;
      letter-spacing: 1.5px;
      text-align: left;
      color: #030000;
    }

    &:hover, &:active, &:focus {
      background-color: transparent;
      border-color: transparent;
    }
  }

  label {
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.83;
    letter-spacing: 1.5px;
    text-align: left;
    color: #030000;

    div {
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.83;
      letter-spacing: 1.5px;
      text-align: left;
      color: #030000;
    }

    span {
      border-color: black;
    }
  }
`;

export const Select = styled(DefaultSelect)`
    display: flex;
    align-items: center;
    margin-right: auto;
    margin-bottom: 10px;

    label {
      margin: 0;
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
    min-width: 130px;
  }

  .select__single-value {
    color: ${primary};
    font-size: 16px;
    font-family: ${fontLink};
    color: ${primary};
    font-weight: normal;
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

  .select__option {
    text-align: center;

    ${breakpoint.sm`
      text-align: left;
    `}
  }

  .select__menu {
    border-radius: 20px;
    top: auto;
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: none;
    min-width: 100%;
    left: 0;

    ${breakpoint.sm`
      position: absolute;
      top: auto;
      bottom: 100%;
      min-width: 275px;
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

export const TagListWrap = styled.div``;

export const TagList = styled.div`
  display: flex;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 14px -10px 0;
  padding: 14px 10px;

  ${breakpoint.md`
    margin: 0 -38px 0;
    padding: 14px 38px;
  `}

  ${breakpoint.xl`
    padding: 14px 13px;
  `}

  button {
    max-width: fit-content;
  }

  ${({ border }) => border && css`
    border-top: 1px solid ${gray};
    max-height: 71px;
  `}

  &::-webkit-scrollbar-track, ::-webkit-scrollbar-thumb, ::-webkit-scrollbar  {
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.0);
    transition: 0.4s;
    opacity: 0;
  }
`;

export const Tag = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  margin-right: 10px;
  padding: 0 16px;
  border: 1px solid ${({ tag }) => tag.color};
  height: 40px;
  border-radius: 20px;
  color: ${black};

  ${({ active, tag }) => active && `
  	background: ${tag.color};
	  color: ${(tag.text === 'light') ? white : black};
  `}
`;

export const RepostRow = styled.div`

`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 25px 10px 60px;
  margin: 0 -10px;
  position: relative;
  flex-wrap: wrap;
  border-top: 1px solid ${gray};
  margin-top: auto;

  ${breakpoint.sm`
    flex-direction: row;
    align-items: center;
    padding-bottom: 0;
  `}

  ${breakpoint.md`
    margin: 0 -38px;
    padding: 25px 38px 0;
  `}

  label {
    margin-top: 0;
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
  display: flex;
  flex-direction: row;
  margin-right: 35px;
  margin-bottom: 10px;

  button {
    flex-grow: 1;
    margin: 0;
  }
`;

export const PostButton = styled.div`
  margin-left: auto;
  text-align: right;

  button {
    position: fixed;
    bottom: 15px;
    left: 0;
    width: 100%;

    ${breakpoint.sm`
      position: static;
      width: fit-content;
    `}
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
	  min-width: 40px;
    margin: 0 5px;

    i {
      color: ${primary};
      font-size: 28px;
      max-height: 28px;
    }
  }

  ${breakpoint.md`
    flex-direction: row;
    justify-content: space-between;
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

export const Error = styled(DefaultError)`
  font-family: ${fontText};
  font-weight: normal;
  color: ${primaryRed};
  font-style: italic;
  margin-top: -3px;
`;
