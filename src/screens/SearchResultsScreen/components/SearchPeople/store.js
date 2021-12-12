// @flow

import { observable, flow, action, configure, computed } from 'mobx';
import searchesApi from 'api/searches.api';

configure({ enforceActions: 'observed' });

const defaultFilters = {
  levels: []
};

class SearchPeopleStore {
  @observable loading: any = false;
  @observable fetchPending: boolean = false;
  @observable totalCount: number = 0;
  @observable page: number = 1;
  @observable offset: number = 0;
  @observable itemsCountOnPage: number = 8;
  @observable allUsersMap: any = new Map();
  @observable users: any[] = [];
  @observable filters: any = defaultFilters;
  @observable lastFiltersChange: any = new Date();
  @observable errors: any[] = [];
  @computed get allUsers() { return Array.from<any>(this.allUsersMap.values()) || []; }
  @computed get totalFetchedCount() { return this.allUsersMap.size || 0; }

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
    const { levels } = this.filters;
    const serialized: any = {};
    if (levels.length) serialized.connection_level = levels.join(',');
    return serialized;
  };

  @action.bound
  clearUsers() {
    this.page = 1;
    this.offset = 0;
    this.allUsersMap = new Map();
    this.users = [];
    this.totalCount = 0;
  };

  @action.bound
  loadMoreUsers() {
    try {
      this.users = this.allUsers.slice(0, this.page * this.itemsCountOnPage);
      this.page += 1;
      this.errors = [];
    } catch (error) {
      this.errors = error.errors;
    }
  };

  searchUsers = flow(function* fetch(conf: { filter: any, fetchMore: ?boolean }) {
    const { filter, fetchMore } = conf;
    if (fetchMore && this.fetchPending) return;
    this.fetchPending = true;
    if (!fetchMore) {
      this.loading = true;
      this.offset = 0;
    }
    try {
      const offset = fetchMore ? this.offset : 0;
      const limit = 10;
      const params = {
        filter,
        include: 'skin',
        page: { offset, limit },
        sort: '-created_at'
      };

      const { data, meta } = yield searchesApi.searchUsers(params);
      this.offset += data.length;

      if (fetchMore) {
        const merged = this.allUsers.concat(data);
        this.allUsersMap = new Map();
        merged.forEach(user => {
          this.allUsersMap.set(user.id, user);
        });

      } else {
        this.page = 1;
        this.allUsersMap = new Map();
        data.forEach(user => {
          this.allUsersMap.set(user.id, user);
        });
        this.loadMoreUsers();
      }

      this.totalCount = (meta && meta.total_count) || this.totalFetchedCount;
      this.fetchPending = false;
      this.loading = false;
      this.errors = [];
    } catch (error) {
      this.totalCount = this.totalFetchedCount;
      this.errors = error.errors;
      this.loading = false;
    }
  }).bind(this)
}

export default new SearchPeopleStore();
