import styled, { css } from 'styled-components';
import { breakpoint } from 'styles/mixins';
import { black } from 'styles/colors';
import { fontLink } from 'styles/variables';

export const TagsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  ${({ allowOverflow }) => allowOverflow && css`
    overflow-x: auto;
    flex-wrap: nowrap;

    &::-webkit-scrollbar-track, ::-webkit-scrollbar-thumb, ::-webkit-scrollbar  {
      width: 0;
      height: 0;
      background: rgba(242, 242, 242, 0.0);
      transition: 0.4s;
      opacity: 0;
    }

    ${breakpoint.md`
      flex-wrap: wrap;
      overflow-x: hidden;
    `}
  `}

  &>span {
    margin-bottom: 7px;
  }

  ${breakpoint.xl`
    margin-bottom: 0;
  `}
`;

export const Tag = styled.div`
  height: 40px;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  margin-right: 5px;
  letter-spacing: 1.2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 7px;
  padding: 0 15px;
  font-family: ${fontLink};
  border-radius: 20px;
  color: ${black};

  ${breakpoint.md`
    padding: 0 20px;
  `}

  ${props => css`
    border: 1px solid ${props.color};
  `};
`;
