// @flow

import { observable, action, flow, configure, set } from 'mobx';
import postsApi from 'api/posts.api';

configure({ enforceActions: 'observed' });

class PostScreenStore {
  @observable loading: boolean = false;
  @observable post: any = {};
  @observable errors: any[] = [];

  getPost = flow(function* fetch(postId: string) {
    this.loading = true;
    try {
      const { data } = yield postsApi.getPost(postId);
      this.post = data;
      this.errors = [];
      this.loading = false;
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  });

  updatePost = flow(function* fetch() {
    this.loading = true;
    try {
      const { data } = yield postsApi.update(this.post.id, this.post);
      this.post = data;
      this.errors = [];
      this.loading = false;
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  });

  deletePost = flow(function* fetch() {
    this.loading = true;
    try {
      const { data } = yield postsApi.deletePost(this.post.id);
      this.post = data;
      this.errors = [];
      this.loading = false;
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  });
}

export default new PostScreenStore();
