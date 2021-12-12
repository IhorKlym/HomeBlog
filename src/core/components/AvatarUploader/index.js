// @flow

import React, { useState } from 'react';
import FileUploader from 'components/FileUploader';
import Modal from 'components/Modal';
import RoundedButton from 'components/RoundedButton';
import ZoomControls from 'components/ZoomControls';
import Cropper from 'react-easy-crop';
import { generateUUID } from 'helpers/methods';

import * as S from './styles';

type Props = {
  avatarUrl: any,
  name: string,
  onChange: (file: any, result: any) => any,
  user?: any
}

const getCroppedImg = (imageData: any, crop: any) => {
  const image = new Image();
  image.src = imageData.src;
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');
 
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  );

  return new Promise<any>((resolve) => {
    const base64Image = canvas.toDataURL(imageData.type);
    canvas.toBlob((blob: any) => { /* eslint-disable no-param-reassign */
      blob.name = imageData.name;
      blob.fileType = 'image';
      blob.src = base64Image;
      resolve(blob);
    }, imageData.type, 1);
  });
};

const AvatarUploader = ({ user, avatarUrl, name, onChange, ...props }: Props) => {
  const userTheme = (user && user.skin && user.skin.id) || null;

  const [showCropTool, setShowCropTool] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [resized, setResized] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedArea, setCroppedArea] = useState({});

  const handleChange = (e: any) => {
    const { files } = e.target;
    if (files && files.length) {
      const f = files[0];
      f.id = generateUUID();
      f.fileType = 'image';
      const reader = new FileReader();
      reader.onload = (ev: any) => {
        f.src = ev.target.result;
        setFile(f);
        setShowCropTool(true);
      };
      reader.readAsDataURL(f);
    }
  };

  const handleCloseCropTool = () => {
    setShowCropTool(false);
    setFile(null);
  };
 
  const handleApplyCrop = () => {
    setShowCropTool(false);
    getCroppedImg(file, croppedArea).then((blob) => {
      setResized(blob);
    });
  };

  const handleFileUploaded = (result: any) => {
    onChange(resized, result);
    setFile(null);
    setResized(null);
  };

  return (
    <S.AvatarWrap {...props}>
      <S.AvatarLabel>
        <S.AvatarText hovered={!!avatarUrl}>+</S.AvatarText>

        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
      </S.AvatarLabel>

      {resized && <S.AvatarUploader>
        <FileUploader key={resized.id}
          rounded
          file={resized}
          onSuccessUpload={result => handleFileUploaded(result)}
        />
      </S.AvatarUploader>}

      <Modal
        open={showCropTool && file}
        onClose={handleCloseCropTool}
        header="Resize your photo"
      >
        <S.ImageCropWrap>
          {file && <Cropper
            image={file.src}
            crop={crop}
            aspect={1}
            zoom={zoom}
            cropShape='round'
            onCropChange={newCrop => setCrop(newCrop)}
            onZoomChange={newZoom => setZoom(newZoom)}
            onCropComplete={(perc, pixels) => setCroppedArea(pixels)}
          />}
        </S.ImageCropWrap>
        <S.ImageCropControls>
          <ZoomControls
            value={zoom}
            onChange={setZoom}
          />
          <RoundedButton primary onClick={handleApplyCrop}>
            Save
          </RoundedButton>
        </S.ImageCropControls>
      </Modal>

      {!file && <S.Avatar theme={userTheme}>
        {avatarUrl ? <img src={avatarUrl} alt={name} /> :  ''}
      </S.Avatar>}
    </S.AvatarWrap>
  );
};

AvatarUploader.defaultProps = {
  user: null
};

export default AvatarUploader;
