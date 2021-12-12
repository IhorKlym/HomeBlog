import styled, { css } from 'styled-components';
import { breakpoint } from 'styles/mixins';
import { primary, primaryRed, white } from 'styles/colors';
import { fontText, fontLink } from 'styles/variables';
import DefaultError from 'components/Error';

export const FieldWrap = styled.div`
  position: relative;
  font-size: 20px;
  line-height: 20px;
  font-weight: normal;
  letter-spacing: normal;
  color: black;
  font-family: ${fontText};
  text-align: left;

  ${breakpoint.sm`
    font-size: 22px;
  `}

  ${breakpoint.md`
    line-height: 36px;
  `}
`;

export const Wrap = styled.div`
  position: relative;
  
  .quill-editor {
    .ql-editor {
      width: 100%;
      height: 100%;
      font-family: ${fontText};
      font-size: 16px;

      strong {
        font-family: ${fontLink};
      }
    }
    .ql-tooltip {
      z-index: 100;
    }
    .ql-mention-list {
      position: relative;
      z-index: 100;
      background: ${white};
      max-height: 100px;
      overflow-y: auto;
      box-shadow: 0 0 5px 1px rgba(0,0,0,0.2);

      .ql-mention-list-item {
        padding: 7px 15px;
        display: flex;
        align-items: center;
        height: 44px;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;

        &.selected {
          background: ${primary};
          color: ${white};
        }
      }

      ${({ hideSuggestionList }) => hideSuggestionList && `
        display: none;
      `}
    }
  }

  ${({ size }) => size && css `
    ${FieldWrap} {
      min-height: auto;
      max-height: 130px;
      overflow-y: auto;

      ${breakpoint.md`
        max-height: ${size}px;
      `}
    }
  `}
`;

export const SuggestionAvatar = styled.div`
  width: 28px;
  height: 28px;
  margin-right: 10px;
`;

export const SuggestionText = styled.div`
  font-size: 16px;
`;

export const Suggestion = styled.div`
  padding: 7px 15px;
  display: flex;
  align-items: center;
  height: 44px;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  ${({ active }) => active && `
    background: ${primary};
    ${SuggestionText} {
      color: ${white};
    }
  `}
`;

export const Placeholder = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  color: ${primary};
  font-size: ${({ fontSize }) => `${fontSize}px` || '16px'};
  font-family: ${fontText};
  font-style: italic;
  font-weight:normal;

  ${breakpoint.md`
    font-size: ${({ fontSize }) => `${fontSize}px` || '24px'};
  `}
`;

export const Error = styled(DefaultError)`
  font-family: ${fontText};
  font-weight: normal;
  color: ${primaryRed};
  font-style: italic;
  margin-top: -3px;
`;
