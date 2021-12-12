import styled from 'styled-components';
import { gray, black } from 'styles/colors';

export const ZoomControls = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  background: rgba(0,0,0,0.8);
  border-radius: 5px;
  height: 30px;

  span {
    font-size: 12px;
    margin-right: 10px;
    color: #fff;
  }

  input {
    transform: scale(0.8);
  }
`;

export const ZoomBtn = styled.button`
  width: 16px;
  height: 16px;
  position: relative;
  border: none;
  border-radius: 50%;
  background: ${gray};

  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 2px;
    margin: -1px -5px;
    background: ${black};
    border-radius: 1px;
  }

  &:after {
    ${({ zoomIn }) => zoomIn && `
      transform: rotate(90deg);
    `}
  }
`;
