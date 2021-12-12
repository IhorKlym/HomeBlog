import styled, { css } from 'styled-components';
import ReactSelect from 'react-select';
import { deepSkyBlue, blueGrey, dark, gray, grayDarken, primary } from 'styles/colors';
import { baseTransition, fontLink } from 'styles/variables';
import DefaultError from 'components/Error';

export const Wrap = styled.div`
  position: relative;
`;

export const FieldWrap = styled.div`
  position: relative;
`;

export const Select = styled(ReactSelect)`
  cursor: pointer;
  position: relative;
  font-size: 16px;
  line-height: normal;
  font-weight: normal;
  color: #788091;
  border: none;
  display: inline-block;
  vertical-align: middle;

  .select {
    &__control {
      border: none;
      box-shadow: none;
      transition: all ${baseTransition};
      cursor: pointer;

      &--menu-is-open .select__indicator svg {
        transform: rotate(180deg)
      }
    }

    &__placeholder,
    &__single-value {
      color: ${deepSkyBlue};
    }

    &__indicator-separator {
      display: none;
    }

    &__value-container {
      padding-right: 30px;
      
      &--is-multi {
        display: flex;
        padding-right: 40px;
      }
    }

    &__multi-value {      
      max-width: ${({ fulltext }) => fulltext ? 'auto' : '75px'};
      &__remove {
        &:hover {
          background: transparent;
        }
      }
    }
    
    &__indicators {
      position: absolute;
      height: 100%;
      z-index: 2;
      right: 0;

      svg {
        transition: transform ${baseTransition} ease-in-out;
        width: 16px;
        color: ${deepSkyBlue};
      }
    }

    &__menu {
      z-index: 5;
      border-radius: 0;
      border-color: ${primary};
      box-shadow: none;
      border: solid 1px ${grayDarken};
      overflow-y: scroll;
      padding-bottom: 10px;
      background: ${primary};
      max-width: 200px;
      position: absolute;
    }

    &__option {
      background-color: transparent;
      color: white;
      font-size: 16px;
      font-weight: 600;
      font-family: ${fontLink};
      font-stretch: normal;
      font-style: normal;
      line-height: 1.9;
      cursor: pointer;
      
      &:hover {
        background-color: white;
        color: ${primary};
      }

      &--is-selected {
        color: white;
        
        &:hover {
          color: ${primary};
        }
      }
    }

    &__indicator {
      width: 100%;
      justify-content: flex-end;

      &:hover {
        color: ${deepSkyBlue};
      }
    }
  }
  
  ${({ top }) => top && css`
    .select {
      &__menu {
        bottom: 100%;
        top: auto;
        border-radius: 0;
      }
    }
  `};

    ${(props) => props.primary && css`
      display: block;

    .select {
      &__menu {
        margin: 0;
        overflow: hidden;
        box-shadow: 0 0 -10px 10px rgba(0, 0, 0, .2);
      }
      
      &__option {
        padding-left: 26px;
        padding-right: 26px;
      }
      
      &__control {
        padding-right: 30px;
        border: solid 1px white;
        min-height: 41px;
        transition: none;
        border-radius: 0px;

        &--menu-is-open {
          border-color: ${deepSkyBlue};

          .select__indicator svg {
            transform: rotate(180deg);
          }
        }

        &:hover { border-color: ${gray}; }
      }

      &__indicator {
        color: ${blueGrey};
        
        svg {
          color: ${dark};
        }
      }

      &__indicators {
        top: 0;
        right: 10px;
        bottom: 0;
      }

      &__placeholder,
      &__single-value {
        color: black;
        font-size: 12px;
        font-weight: 300;
      }
      
      &__placeholder {
        color: black;
        font-size: 16px;
        line-height: 1.83;
      }

      &__single-value {
        color: black;
        max-width: calc(100% - 37px);
      }

      &__indicator-separator {
        display: none;
      }

      &__value-container {
        padding: 5px 0 5px 52px;
        
        &--is-multi {
          padding-right: 52px;
        }
      }
    }
  `}
`;

export const Error = styled(DefaultError)``;
