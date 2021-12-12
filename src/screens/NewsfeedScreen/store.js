// @flow

import { observable, action, flow, configure } from 'mobx';
import postsApi from 'api/posts.api';

configure({ enforceActions: 'observed' });


class NewsfeedScreenStore {
  @observable loading: boolean = false;
  @observable posts: any[] = [];
  @observable errors: any[] = [];

  fetchNewsfeed = flow(function* fetch() {
    this.loading = true;
    try {
      const { data } = yield postsApi.getPosts();
      console.log(data);
      this.posts = data;
      this.loading = false;
      this.errors = [];

    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  });
}

export default new NewsfeedScreenStore();
