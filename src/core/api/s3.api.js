// @flow

import qs from 'qs';
import Uppy from '@uppy/core';
import AwsS3Multipart from '@uppy/aws-s3-multipart';
import Api from './ApiBase';

const uppy = Uppy();
uppy.use(AwsS3Multipart, {
  companionUrl: process.env.API_SERVER_URL
});

class S3Api extends Api {

  uploadVideo = async (file: any, onUploadProgress: ?any) => {
    const fileId = uppy.addFile({
      name: file.name,
      type: file.type,
      data: file
    });
    uppy.on('upload-progress', (f, { bytesUploaded, bytesTotal }) => {
      if (f.id === fileId && onUploadProgress) {
        onUploadProgress({ loaded: bytesUploaded, total: bytesTotal });
      }
    });
    const { successful } = await uppy.upload();
    const result = successful.find(f => f.id === fileId);
    return result.s3Multipart;
  };

  uploadImage = async (file: any, onUploadProgress: ?any) => {
    const encodedValues = qs.stringify({ type: file.type }, { encodeValuesOnly: true });
    const { url, method, fields } = await this.request(`s3/params?${encodedValues}`);

    const body = new FormData();
    Object.keys(fields).forEach(key => {
      body.append(key, fields[key]);
    });
    body.append('file', file);
    await this.upload(url, body, { method, isS3: true, onUploadProgress });

    return fields;
  };
}

export default new S3Api();
