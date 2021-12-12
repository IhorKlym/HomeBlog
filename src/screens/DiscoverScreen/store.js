// @flow

import { observable, flow, configure } from 'mobx';
import systemTagsApi from 'api/systemTags.api';

configure({ enforceActions: 'observed' });

class DiscoverStore {
  @observable loading: boolean = false;
  @observable fetchPending: boolean = false;
  @observable page: number = 1;
  @observable offset: number = 0;
  @observable data: any[] = [];
  @observable errors: [] = [];

  fetchDiscoverData = flow(function* fetch(fetchMore: ?boolean) {
    if (fetchMore && this.fetchPending) return;
    this.fetchPending = true;
    if (!fetchMore) {
      this.loading = true;
      this.offset = 0;
    }
    try {
      const params = {
        page: {
          offset: this.offset,
          limit: this.offset === 0 ? 16 : 32
        },
        sort: '-created_at'
      };
      const { data } = yield systemTagsApi.fetchSystemTags(params);
      this.offset += data.length;

      if (fetchMore) {
        this.data = [...this.data, ...data];

      } else {
        this.page = 1;
        this.data = data;
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

export default new DiscoverStore();
