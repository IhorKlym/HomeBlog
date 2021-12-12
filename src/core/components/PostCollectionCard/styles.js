import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  bottom: 10px;
  right: 10px;
  border-radius: 50%;
  background: #FFFFFF;
  color: white;
`;

export const CoverImage = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;

  ${({ coverImage }) => !!coverImage && `
    background-image: url('${coverImage}');
    background-size: cover;
    background-position: center;
    
    &:after {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      content: '';
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.4);
      border-radius: 50%;
    }
  `}
`;

export const InfoBlock = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Name = styled.div`
  font-size: 30px;
  padding: 5px;
  position: relative;
  z-index: 3;
`;

export const Posts = styled.div`
  font-size: 16px;
  padding: 5px;
  position: relative;
  z-index: 3;
`;

export const Wrap = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  cursor: pointer;
  text-align: center;

  ${({ skin = {} }) => `
    background-color: ${skin.colorScheme.bg || '#56624E'};
    border-radius: ${skin.borderRadius || '0px'};
    ${Container} {
      background-color: ${skin.colorScheme.bg || '#56624E'};
      color: ${(!skin.hasImage && skin.colorScheme.text) || 'white'};
    }
    ${skin.shape === 'square' && `
      ${Container} {
        color: ${skin.colorScheme.text || 'white'};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      ${CoverImage} {
        position: relative;
        top: auto;
        left: auto;
        bottom: auto;
        right: auto;
        width: 90%;
        height: 50%;
        border-radius: 20px;
        &:after { 
          display: none;
        }
      }
      ${InfoBlock} {
        position: static;
      }
    `}
  `}
`;
