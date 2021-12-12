// @flow

import qs from 'qs';
import Api from './ApiBase';

class PostsApi extends Api {
  serializerType = 'articles';

  // serializerOptions = {
  //   attributes: [
  //     'content',
  //     'visibility',
  //     'authorVisibility',
  //     'tagList'
  //   ]
  // };

  getPosts = async () => {
    const json = await this.request('users');
    const { data } = json;
    return { data };
  };

  // create = async (post: {}) => {
  //   const body = await this.serialize(post);
  //   const json = await this.request('posts', { body: JSON.stringify(body), method: 'POST' });
  //   const data = await this.deserialize(json);

  //   return { data };
  // };

  update = async (id: string, post: {}) => {
    const json = await this.request(`posts/${id}`, { body: JSON.stringify(post), method: 'PATCH' });
    const { data } = json;
    
    return { data };
  };

  getPost = async (id: any) => {
    const json = await this.request(`users/${id}`);
    const { data } = json;

    return { data };
  };

  deletePost = async (id: any) => {
    const json = await this.request(`posts/${id}`, { method: 'DELETE' });
    const { data } = json;

    return { data };
  };
}

export default new PostsApi();
