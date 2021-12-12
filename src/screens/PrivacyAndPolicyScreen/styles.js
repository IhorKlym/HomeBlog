import styled from 'styled-components';
import { applyMaxWidth } from 'styles/mixins';
import { primary, black, gray } from 'styles/colors';
import { fontLink } from 'styles/variables';

export const Wrap = styled.div`
  flex: 1;
  display: flex;
  padding: 25px 20px;
  flex-direction: column;
  ${applyMaxWidth};
  margin: 0 auto;
  h2, h3, strong {
    font-family: ${fontLink};
    color: ${black};
  }
  h2 {
    font-size: 22px;
    line-height: 28px;
    margin: 30px 0 20px;
  }
  h3 {
    font-size: 20px;
    line-height: 26px;
    margin: 20px 0 10px;
  }
  p {
    font-size: 18px;
    line-height: 34px;
    text-indent: 34px;
    text-align: justify;
  }
  a {
    font-family: ${fontLink};
    color: ${primary};
  }
  ul, ol {
    padding-left: 54px;
    margin-bottom: 30px;
    li {
      font-size: 18px;
      line-height: 34px;
      text-align: justify;
      margin-bottom: 20px;
    }
  }
  ul {
    list-style: disc;
    ul {
      list-style: circle;
      ul {
        list-style: square;
      }
    }
  }
  table {
    border-collapse: collapse;
    tbody {
      tr:nth-child(2n-1) {
        background-color: #fafafa;
      }
    }
    th {
      font-family: ${fontLink};
      font-size: 16px;
      line-height: 20px;
    }
    &.full-width {
      th, td {
        width: 25%;
      }
    }
    th, td {
      border: 1px solid ${gray};
      padding: 10px;
      text-align: center;
    }
    td, p, li {
      font-size: 14px;
      line-height: 20px;
    }
    ul {
      padding-left: 20px;
      margin-bottom: 0;
    }
    li {
      margin-bottom: 10px;
      text-align: left;
    }
  }
`;

export default { Wrap };
