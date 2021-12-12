import styled from 'styled-components';
import { primary } from 'styles/colors';

export const Wrap = styled.div`
  position: relative;
`;

export const MultiPhoto = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 45px;
  line-height: 45px;
  height: 45px;
  border-radius: 50%;
  position: absolute;
  z-index: 300;
  right: 5px;
  top: 5px;
  color: ${primary};
  font-size: 24px;
  cursor: pointer;
`;

export const Toogle = styled.div`
  cursor: pointer;
  video {
    width: 100%;
    margin-bottom: 10px;
  }
`;
