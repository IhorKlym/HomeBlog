// @flow

import { observable, action, flow, configure, computed } from 'mobx';
import searchesApi from 'api/searches.api';
import { isEqualObjects } from 'helpers/methods';

configure({ enforceActions: 'observed' });

const defaultFilters = {
  search: '',
  tagList: [],
  connectionLevels: [],
  followed: false,
  unanswered: false
};

class NewsfeedScreenStore {
  @observable loading: boolean = false;
  @observable filters: any = defaultFilters;
  @observable lastFetchedFilters: any = null;
  @observable lastFiltersChange: any = new Date();
  @observable fetchPending: boolean = false;
  @observable page: number = 1;
  @observable offset: number = 0;
  @observable itemsCountOnPage: number = 8;
  @observable allPostsMap: any = new Map();
  @observable posts: any[] = [];
  @observable errors: any[] = [];
  @computed get allPosts() { return Array.from<any>(this.allPostsMap.values()) || []; }
  @computed get totalPostsCount() { return this.allPostsMap.size || 0; }

  @action.bound
  handleFilterChange({ name, value }: any) {
    this.filters[name] = value;
    this.lastFiltersChange = new Date();
  };

  filterHasOption({ name, option }: any) {
    return this.filters[name].includes(option);
  };
  getFiltersCount() {
    let count = 0;
    count += this.filters.connectionLevels.length;
    if (this.filters.followed) count += 1;
    if (this.filters.unanswered) count += 1;
    return count;
  };

  @action.bound
  toggleFilterOption({ name, option }: any) {
    const arr = [ ...this.filters[name] ];
    const idx = arr.indexOf(option);
    if (idx === -1) {
      arr.push(option);
    } else {
      arr.splice(idx, 1);
    }
    this.filters[name] = arr;
    this.lastFiltersChange = new Date();
  };

  @action.bound
  clearFilters() {
    this.filters = defaultFilters;
    this.lastFiltersChange = new Date();
  };

  getSerializedFilters() {
    const { search, tagList, connectionLevels, followed, unanswered } = this.filters;
    const serialized: any = {};
    if (search) serialized.q = search;
    if (tagList.length) serialized.tag_list = tagList.join(',');
    if (connectionLevels.length) serialized.connection_level = connectionLevels.join(',');
    if (followed) serialized.apply_followable_data = true;
    if (unanswered) serialized.unanswered = true;
    return serialized;
  };

  @action.bound
  clearPosts() {
    this.page = 1;
    this.offset = 0;
    this.allPostsMap = new Map();
    this.lastFetchedFilters = null;
    this.posts = [];
  };

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

  fetchNewsfeed = flow(function* fetch(fetchMore: ?boolean) {
    if (fetchMore && this.fetchPending) return;
    const filter = this.getSerializedFilters();
    if (!fetchMore) {
      if (this.lastFetchedFilters && isEqualObjects(filter, this.lastFetchedFilters)) return;
      this.clearPosts();
      this.loading = true;
      this.offset = 0;
    }
    this.fetchPending = true;
    try {
      this.lastFetchedFilters = filter;
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
      let { data } = yield searchesApi.searchPosts(params);
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
      this.loading = false;
      this.errors = [];

    } catch (error) {
      this.errors = error.errors;
      this.fetchPending = false;
      this.loading = false;
    }
  });
}

export default new NewsfeedScreenStore();
