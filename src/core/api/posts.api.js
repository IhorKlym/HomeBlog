// @flow

import qs from 'qs';
import Api from './ApiBase';

class PostsApi extends Api {
  serializerType = 'posts';

  serializerOptions = {
    attributes: [
      'content',
      'visibility',
      'authorVisibility',
      'tagList'
    ]
  };

  create = async (post: {}) => {
    const body = await this.serialize(post);
    const json = await this.request('posts', { body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

  update = async (id: string, post: {}) => {
    const body = await this.serialize(post);
    const json = await this.request(`posts/${id}`, { body: JSON.stringify(body), method: 'PATCH' });
    const data = await this.deserialize(json);

    return { data };
  };

  repost = async (id: string, post: {}) => {
    const body = await this.serialize(post);
    const json = await this.request(`posts/${id}/repost`, { body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

  repostReply = async (id: string, post: {}) => {
    const body = await this.serialize(post);
    const json = await this.request(`replies/${id}/repost`, { body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

  getPost = async (id: any, params: any) => {
    const encodedValues = qs.stringify(params, { encodeValuesOnly: true });
    const json = await this.request(`posts/${id}?${encodedValues}`, { customErrorHundlingFor: [403, 404] });
    const data = await this.deserialize(json, { deserializeIncluded: true });

    return { data };
  };

  followPost = async (id: any) => {
    const json = await this.request(`posts/${id}/following`, { method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

  unfollowPost = async (id: any) => {
    const json = await this.request(`posts/${id}/following`, { method: 'DELETE' });
    const data = await this.deserialize(json);

    return { data };
  };

  deletePost = async (id: any) => {
    const json = await this.request(`posts/${id}`, { method: 'DELETE' });
    const data = await this.deserialize(json);

    return { data };
  };
}

export default new PostsApi();
