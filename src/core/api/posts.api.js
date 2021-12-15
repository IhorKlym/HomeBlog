// @flow

import Api from './ApiBase';

class PostsApi extends Api {
  serializerType = 'articles';

  getPosts = async () => {
    const data = await this.request('articles');
    return { data };
  };

  update = async (id: string, post: any) => {
    const data = await this.request(`articles/${id}`, { body: JSON.stringify(post), method: 'PATCH' });
    
    return { data };
  };

  getPost = async (id: any) => {
    const data = await this.request(`articles/${id}`);

    return { data };
  };

  deletePost = async (id: any) => {
    const data = await this.request(`articles/${id}`, { method: 'DELETE' });

    return { data };
  };
}

export default new PostsApi();
