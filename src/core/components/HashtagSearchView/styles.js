import styled from 'styled-components';
import { zindexs } from 'styles/variables';
import { breakpoint, applyMaxWidth } from 'styles/mixins';
import { primary, white } from 'styles/colors';

export const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  padding-top: 60px;
  z-index: ${zindexs.modal};
  background: rgba(255,255,255,0.5);
`;

export const Close = styled.div`
  position: absolute;
  top: 60px;
  right: 41px;
  width: 50px;
  height: 50px;
  background: ${primary};
  cursor: pointer;
  border-radius: 50%;
  z-index: 100;
  
  &:after, &:before  {
    position: absolute;
    content: '';
    right: 0;
    left: 0;
    top: 24px;
    height: 1px;
    width: 28px;
    background-color: white;
    transform: rotate(-45deg);
    margin: auto;
  }

  &:before {
    transform: rotate(45deg);
  }
  
  ${breakpoint.lg`
    width: 100px;
    height: 100px;
    right: 30px;
    
    &:after, &:before {
     top: 49px;
     width: 56px;
    }
  `}
`;

export const Container = styled.div`
  overflow-y: auto;
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 50px 30px 0;
  
  & > * {
    position: relative;
    z-index: 3;
  }
  
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 55px;
    width: 100vw;
    height: calc(100vh - 115px);
    clip-path: ellipse(210% 100% at 50% 100%);
    z-index: 2;
    background: #56624E;
  
    ${breakpoint.lg`
      clip-path: ellipse(70% 100% at 50% 100%);
      top: 0;
      height: calc(100vh - 60px);
    `}
  }
`;

export const Head = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${white};
`;

export const Name = styled.div`
  font-size: 30px;
  padding: 5px;
  margin-top: 20px;
  
  ${breakpoint.lg`
    margin-top: 0;
  `}
`;

export const Posts = styled.div`
  font-size: 16px;
  padding: 5px;
`;

export const PostsList = styled.div`
  ${applyMaxWidth};
  margin: 0 auto;
  width: 100%;
  flex: 1;
  overflow-y: auto;
  padding: 30px 0;
`;
