import styled from 'styled-components';
import { breakpoint, marbleBg } from 'styles/mixins';
import { primary } from 'styles/colors';

export const AvatarLabel = styled.label`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  cursor: pointer;
  border-radius: 50%;

  input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
`;

export const AvatarText = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  color: white;
  background-color: ${primary};
  right: 10px;
  bottom: 10px;
  text-align: center;
  line-height: 60px;
  font-size: 50px;

  ${({ hovered }) => hovered && `
    opacity: 0;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    transition: 0.3s;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 80px;
    color: ${primary};

    &:hover {
      opacity: 1;
    }
  `};
`;

export const Avatar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  ${({ theme }) => marbleBg(theme)};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    background-color: #C9D0E0;
  }

  i {
    font-size: 100px;
    max-height: 100px;
  }
`;

export const AvatarUploader = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background: white;
  & > * {
    margin: 0;
    width: 100%;
    height: 100%;
    img {
      min-width: 100%;
      min-height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
`;

export const ImageCropWrap = styled.div`
  height: 300px;
  position: relative;
  .reactEasyCrop_CropArea {
    color: rgba(0,0,0,0.3);
  }
`;

export const ImageCropControls = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .zoom-controls {
    margin-bottom: 20px;
  }
`;

export const AvatarWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 200px;
  width: 200px;
  min-width: auto;
  margin: 25px auto 0;
  height: 200px;
  overflow: hidden;
  position: relative;

  ${breakpoint.md`
    max-width: 300px;
    width: 300px;
    height: 300px;
    margin: 0 -70px 0 auto;

    ${props => props.size &&`
      width: ${props.size}px;
      height: ${props.size}px;
      max-width: ${props.size}px;
      margin: auto;
    `};
  `}

  ${breakpoint.xl`
    margin: 0 170px 0 auto;

    ${props => props.size &&`
      margin: auto;
    `};
  `}
`;
