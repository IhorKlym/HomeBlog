import styled from 'styled-components';

export const Wrap = styled.div`
  position: relative;
  width: 100%;
  
  .react-transform-component {
    margin: 0 auto;
  }
  
  &::-webkit-scrollbar-track, ::-webkit-scrollbar-thumb, ::-webkit-scrollbar  {
    width: 5px;
    height: 5px;
    background: rgba(242, 242, 242, 0.0);
    transition: 0.4s;
    opacity: 0;
  }
  
  &:hover {
    &::-webkit-scrollbar-track, ::-webkit-scrollbar-thumb, ::-webkit-scrollbar  {
      border-radius: 10px;
      opacity: 1;
      cursor: pointer;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(255,255,255, 0.7);
    }
  }
  
  img {
    transition: all 0.5s;
    margin: 0 auto;
    display: block;
  }
  
  .zoom-controls {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translate3d(-50%,0,0);
  }

  ${({ inOriginalSize }) => inOriginalSize ? `

    img {
      max-width: 100%;
      max-height: 90vh;
    }

    .placeholder-image {
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  ` : `
    width: 100%;

    img {
      max-width: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      border-radius: 20px;
      height: 100%;
      
      &.original-image {
        position: static;
      }
    }
  `}
`;

export const ToolsWrap = styled.div`
  position: absolute;
  z-index: 50;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  
  button {
    margin: 0 3px;
  }
`;

export const Image = styled.img`
  opacity: ${({ visible }) => visible ? 1 : 0};
`;
