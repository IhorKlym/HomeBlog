// @flow

import qs from 'qs';
import Api from './ApiBase';

const defaultQueryParams = {
  include: 'user.skin,photos,videos',
  fields: {
    users: 'id,state,first_name,last_name,business_name,profile_type,avatar_url,level_of_connect,skin'
  }
};

class RepliesApi extends Api {
  serializerType = 'replies';

  serializerOptions = {
    attributes: [
      'content',
      'visibility',
      'authorVisibility',
      'post'
    ],
    post: {
      ref: 'id',
      attributes: ['id', 'type']
    }
  };

  create = async (reply: {}, query: ?any = {}) => {
    const encodedValues = qs.stringify({ ...defaultQueryParams, ...query }, { encodeValuesOnly: true });
    const body = await this.serialize(reply);
    const json = await this.request(`replies?${encodedValues}`, { body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

  update = async (id: string, reply: any) => {
    const body = await this.serialize(reply);
    const json = await this.request(`replies/${id}`, { body: JSON.stringify(body), method: 'PATCH' });
    const data = await this.deserialize(json);

    return { data };
  };

  getReplies = async (params: any) => {
    const encodedValues = qs.stringify({ ...defaultQueryParams, ...params }, { encodeValuesOnly: true });
    const json = await this.request(`replies?${encodedValues}`);
    const data = await this.deserialize(json);

    return { data };
  };

  getReply = async (id: any, params: any) => {
    const encodedValues = qs.stringify({ ...defaultQueryParams, ...params }, { encodeValuesOnly: true });
    const json = await this.request(`replies/${id}?${encodedValues}`);
    const data = await this.deserialize(json);

    return { data };
  };

  deleteReply = async (id: any) => {
    const json = await this.request(`replies/${id}`, { method: 'DELETE' });
    const data = await this.deserialize(json);

    return { data };
  };
}

export default new RepliesApi();
