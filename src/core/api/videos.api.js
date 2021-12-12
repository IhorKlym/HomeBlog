// @flow

import Api from './ApiBase';

class VideosApi extends Api {
  serializerType = 'videos';

  serializerOptions = {
    attributes: [
      'videoData',
      'videoable'
    ],
    videoable: {
      ref: 'id',
      attributes: ['id', 'type']
    },
    typeForAttribute: (attr: any, item: any) => (item && item.type) || attr
  };

  create = async (params: any) => {
    const body = await this.serialize(params);
    const json = await this.request('videos', { body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

  delete = async (video: any) => {
    const json = await this.request(`videos/${video.id}`, { method: 'DELETE' });
    const data = await this.deserialize(json);

    return { data };
  };
}

export default new VideosApi();
