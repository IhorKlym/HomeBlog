import React, { useState, useEffect } from 'react';
import Preloader from 'components/Preloader';
import toaster from 'services/toaster';
import s3Api from 'api/s3.api';

import * as S from './styles';

type Props = {
  file: any,
  onSuccessUpload: (result: any) => any,
  onDelete: () => any
}

const FileUploader = ({ file = {}, onSuccessUpload, onDelete, ...restProps }: Props) => {
  const [progress, setProgress] = useState(0);

  const uploadFile = async () => {
    if (file.uploaded) return;
    try {
      const isVideo = file.fileType === 'video';
      const onUploadProgress = ({ total, loaded }) => {
        setProgress(Math.round(100 * loaded / total));
      };
      const request = isVideo ? s3Api.uploadVideo : s3Api.uploadImage;
      const { key } = await request(file, onUploadProgress);

      const fileNameArr = file.name.split('.');
      const fileExt = `.${fileNameArr[fileNameArr.length - 1]}`;
      const fileName = file.name.replace(fileExt, '');
      const result = {
        title: fileName,
        [isVideo ? 'videoData' : 'imageData']: {
          id: key.split('/')[1],
          storage: key.split('/')[0],
          metadata: {
            size: file.size,
            filename: file.name,
            mimeType: file.type
          }
        }
      };
      if (onSuccessUpload) onSuccessUpload(result);
    } catch (e) {
      toaster.notify('Something went wrong');
    }
  };

  useEffect(() => {
    uploadFile();
  }, [file]);

  return (
    <S.UploadingFile {...restProps}>
      {file.fileType === 'image' && <img src={file.src} alt={file.name} />}
      {file.fileType === 'video' && <video width="160" height="100" controls>
        <source src={file.src} />
        <track default kind="captions" src="" />
      </video>}
      {(!file.uploaded && progress < 100) && <S.ProgressWrap>
        <Preloader position="absolute" size={48} />
        <S.Progress>{progress}%</S.Progress>
      </S.ProgressWrap>}
      {file.uploaded && <S.RemoveBtn className="remove-btn" onClick={onDelete}></S.RemoveBtn>}
    </S.UploadingFile>
  );
};

export default FileUploader;
