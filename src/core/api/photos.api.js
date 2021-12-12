// @flow

import Api from './ApiBase';

class PhotosApi extends Api {
  serializerType = 'photos';

  serializerOptions = {
    attributes: [
      'title',
      'imageData',
      'imageable'
    ],
    imageable: {
      ref: 'id',
      included: false
    },
    typeForAttribute: (attr: any, item: any) => (item && item.type) || attr
  };

  create = async (params: any) => {
    const body = await this.serialize(params);
    const json = await this.request('photos', { body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

  delete = async (photo: any) => {
    const json = await this.request(`photos/${photo.id}`, { method: 'DELETE' });
    const data = await this.deserialize(json);

    return { data };
  };
}

export default new PhotosApi();
