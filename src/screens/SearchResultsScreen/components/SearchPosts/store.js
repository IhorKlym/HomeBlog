// @flow

import { observable, action, flow, configure, computed } from 'mobx';
import searchesApi from 'api/searches.api';

configure({ enforceActions: 'observed' });

const defaultFilters = {
  levels: [],
  tagList: [],
  followed: false,
  unanswered: false
};

class SearchPostsStore {
  @observable loading: boolean = false;
  @observable fetchPending: boolean = false;
  @observable totalCount: number = 0;
  @observable page: number = 1;
  @observable offset: number = 0;
  @observable itemsCountOnPage: number = 8;
  @observable allPostsMap: any = new Map();
  @observable filters: any = defaultFilters;
  @observable lastFiltersChange: any = new Date();
  @observable posts: any[] = [];
  @observable errors: any[] = [];
  @computed get allPosts() { return Array.from<any>(this.allPostsMap.values()) || []; }
  @computed get totalFetchedCount() { return this.allPostsMap.size || 0; }

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
    count += this.filters.levels.length;
    count += this.filters.tagList.length;
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
    const { levels, tagList, followed, unanswered } = this.filters;
    const serialized: any = {};
    if (levels.length) serialized.connection_level = levels.join(',');
    if (tagList.length) serialized.tag_list = tagList.join(',');
    if (followed) serialized.apply_followable_data = true;
    if (unanswered) serialized.unanswered = true;
    return serialized;
  };

  @action.bound
  clearPosts() {
    this.page = 1;
    this.offset = 0;
    this.allPostsMap = new Map();
    this.posts = [];
    this.totalCount = 0;
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

  searchPosts = flow(function* fetch(filter: any, fetchMore: ?boolean) {
    if (fetchMore && this.fetchPending) return;
    this.fetchPending = true;
    if (!fetchMore) {
      this.loading = true;
      this.offset = 0;
    }
    try {
      const params = {
        filter: {
          ...filter,
          show_own_posts: true
        },
        page: {
          offset: this.offset,
          limit: this.offset === 0 ? 16 : 32
        },
        include: 'user.skin,photos,videos,last_third_replies.user.skin,last_third_replies.photos,last_third_replies.videos,repost.user.skin,repost.photos,repost.videos,repost_reply.user.skin',
        fields: {
          users: 'id,state,first_name,last_name,business_name,profile_type,avatar_url,level_of_connect,skin'
        },
        sort: '-created_at'
      };
      const resp = yield searchesApi.searchPosts(params);
      const { meta } = resp;
      let { data } = resp;
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

      this.totalCount = (meta && meta.total_count) || this.totalFetchedCount;
      this.fetchPending = false;
      this.loading = false;
      this.errors = [];

    } catch (error) {
      this.totalCount = 0;
      this.errors = error.errors;
      this.fetchPending = false;
      this.loading = false;
    }
  })
}

export default new SearchPostsStore();
