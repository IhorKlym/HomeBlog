// @flow

import { observable, action, flow, configure, computed } from 'mobx';
import userApi from 'api/users.api';
import searchesApi from 'api/searches.api';
import type { UserProfile } from 'helpers/types';

configure({ enforceActions: 'observed' });

const defaultFilters = {
  q: '',
  activity: 'all',
  posts: 'all'
};

class ProfileStore {
  @observable loading: any = {
    profile: false,
    posts: false
  };
  @observable user: UserProfile | any = null;
  @observable page: number = 1;
  @observable offset: number = 0;
  @observable itemsCountOnPage: number = 8;
  @observable allPostsMap: any = new Map();
  @observable posts: any[] = [];
  @observable filters: any = defaultFilters;
  @observable errors: [] = [];
  @computed get allPosts() { return Array.from<any>(this.allPostsMap.values()) || []; }
  @computed get totalPostsCount() { return this.allPostsMap.size || 0; }

  @action.bound
  clearStore() {
    this.errors = [];
    this.user = null;
    this.clearPosts();
  }

  @action.bound
  clearPosts() {
    this.page = 1;
    this.offset = 0;
    this.allPostsMap = new Map();
    this.posts = [];
  };

  @action.bound
  handleChangeFilters({ name, value }: { name: string, value: string }) {
    this.filters[name] = value;
  }

  @action.bound
  clearFilters() {
    this.filters = defaultFilters;
  }

  getProfile = flow(function* fetch(userId: ?string) {
    this.loading.profile = true;
    try {
      const request = userId ? userApi.getUser(userId) : userApi.getCurrentUser();
      const { data } = yield request;

      this.loading.profile = false;
      this.errors = [];
      this.user = data;
    } catch (error) {
      this.errors = error.errors;
      this.loading.profile = false;
    }
  })

  @action.bound
  loadMorePosts() {
    try {
      this.posts = this.allPosts.slice(0, this.page * this.itemsCountOnPage);
      this.page += 1;
      this.errors = [];
    } catch (error) {
      this.errors = error.errors;
    }
  };

  fetchActivity = flow(function* fetch(fetchMore: ?boolean, userId: ?any) {
    if (fetchMore && this.fetchPending) return;
    this.fetchPending = true;
    if (!fetchMore) {
      this.loading.posts = true;
      this.offset = 0;
    }
    try {
      const filter = { ...this.filters };
      if (userId) filter.user_id = userId;
      const params = {
        filter,
        page: {
          offset: this.offset,
          limit: this.offset === 0 ? 16 : 32
        },
        include: 'user.skin,photos,videos,last_third_replies.user.skin,last_third_replies.photos,last_third_replies.videos,repost.user.skin,repost.photos,repost.videos,repost_reply.user.skin',
        fields: {
          users: 'id,state,first_name,last_name,business_name,profile_type,avatar_url,level_of_connect,skin'
        }
      };
      let { data } = yield searchesApi.fetchActivity(params);
      data = data.map(post => ({
        ...post,
        replies: post.lastThirdReplies || []
      }));
      this.offset += data.length;

      if (fetchMore) {
        const merged = this.allPosts.concat(data);
        this.allPostsMap = new Map();
        merged.forEach(post => {
          this.allPostsMap.set(post.id, post);
        });

      } else {
        this.page = 1;
        this.allPostsMap = new Map();
        data.forEach(post => {
          this.allPostsMap.set(post.id, post);
        });
        this.loadMorePosts();
      }

      this.fetchPending = false;
      this.loading.posts = false;
      this.errors = [];

    } catch (error) {
      this.errors = error.errors;
      this.fetchPending = false;
      this.loading.posts = false;
    }
  });

  @action.bound
  afterPostDeleted(post: any) {
    try {
      if (post && post.id) {
        this.allPostsMap.delete(post.id);
        const postsClone = [...this.posts];
        const idx = postsClone.findIndex(p => post.id === p.id);
        if (idx !== -1) postsClone.splice(idx, 1);
        this.posts = postsClone;
      }
      this.errors = [];
    } catch (error) {
      this.errors = error.errors;
    }
  };

}

export default new ProfileStore();
