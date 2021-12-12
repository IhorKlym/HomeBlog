// @flow

import styled from 'styled-components';
import { rgba } from 'polished';
import { black } from 'styles/colors';

export const ProgressWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${rgba(black, .3)};
`;

export const UploadingFile = styled.div`
  display: flex;
  margin: 8px;
  position: relative;

  img, video {
    max-width: 100%;
    max-height: 100px;
  }

  &:not(:hover) .remove-btn {
    opacity: 0;
  }

  ${({ rounded, backdrop }) => `
    background-color: ${backdrop ? black : 'transparent'};

    ${ProgressWrap} {
      border-radius: ${rounded ? '50%' : '0'};
    }
  `}
`;

export const Progress = styled.div`
  color: #fff;
  line-height: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  padding-top: 3px;
  font-size: 12px;
`;
export const RemoveBtn = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 0;
  right: 0;
  cursor: pointer;
  background: rgba(0,0,0,0.25);
  transition: all 0.25s;
  
  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 1px;
    margin: -1px -8px;
    background-color: #fff;
  }

  &:before {
    transform: rotate(-45deg);
  }

  &:after {
    transform: rotate(45deg);
  }
`;
