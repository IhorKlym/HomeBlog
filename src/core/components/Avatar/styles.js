import styled from 'styled-components';
import { marbleBg } from 'styles/mixins';
import { gray, black } from 'styles/colors';

export const ImgWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  width: 62px;
  height: 62px;
  border-radius: 50%;
  ${({ theme }) => marbleBg(theme)};

  i {
    font-size: 20px;
    color: ${black};
  }
    
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-height: 325px;
  }

  strong {
    color: ${black};
    font-weight: 500;
    font-size: 18px;
    padding-top: 2px;
  }

  ${props => props.fullWidth && `
    width: 100%;
    height: 250px;

    i {
      font-size: 100px;
      max-height: 100px;
      margin: 50px 0;
    }

    strong {
      font-size: 80px;
      padding-top: 8px;
    }
  `}

  ${props => props.cover && `
    width: 100%;
    height: 100%;
  `}

  ${props => props.size && `
    width: ${props.size}px;
    height: ${props.size}px;

    i {
      font-size: ${props.size/3}px;
    }
  `}

  ${props => props.rounded && `
    border-radius: 50%;
    overflow: hidden;
  `}

  .avatar__tooltip {
    position: absolute;
    opacity: 0;
    height: 0;
    overflow: hidden;
    bottom: 90%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${gray};
    border-radius: 5px;
    box-shadow: 3px 2.6px 7.4px 0.6px rgba(0, 0, 0, 0.15);
    text-align: center;
    font-size: 16px;
    padding: 5px 10px;
    transform: translate3d(-50%, 0, 0);
    color: ${black};
  }
  
  &:hover .avatar__tooltip {
    height: auto;
    opacity: 1;
  }
  
`;

export default { ImgWrap };
