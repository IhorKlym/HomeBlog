// @flow

import { observable, action, computed, configure, runInAction } from 'mobx';
import dictionariesApi from 'api/dictionaries.api';

configure({ enforceActions: 'observed' });

type Tag = {
  id: any,
  name: string,
  color: string,
}
type Data = {
  tags: Tag[]
}

class DictionariesStore {
  keywordsMap: any = new Map();
  @observable loading: boolean = true;
  @observable data: Data = {
    tags: []
  };
  @computed get tags() {
    return this.data.tags || [];
  }
  @observable errors: [] = [];

  @action.bound
  async fetchTags() {
    try {
      const params = {
        sort: 'position',
        page: {
          limit: 20,
          offset: 0
        }
      };
      const { data } = await dictionariesApi.fetchTags(params);
      
      runInAction(() => {
        this.data.tags = data;
        const newKeywordsMap = new Map();
        this.data.tags.forEach(tag => {
          tag.keywords.forEach(keyword => {
            newKeywordsMap.set(keyword, tag);
          });
        });
        this.keywordsMap = newKeywordsMap;
      });
    } catch (error) {
      runInAction(() => {
        this.errors = error.errors;
      });
    }
  }

  @action.bound
  getTagListByKeywords(text: string = '') {
    const str = text.toLowerCase();
    const tagList = [];
    try {
      this.keywordsMap.forEach((value, key) => {
        if (str.includes(key.toLowerCase()) && !tagList.includes(value)) {
          tagList.push(value);
        }
      });
      return tagList;
    } catch (error) {
      return [];
    }
  }

  @action.bound
  getTagSuggestions(text: string = '') {
    const str = text.toLowerCase();
    const tagList = [];
    try {
      this.tags.forEach((tag) => {
        if (tag.name.toLowerCase().startsWith(str)) {
          tagList.push(tag);
        }
      });
      return tagList;
    } catch (error) {
      return [];
    }
  }
}

export default new DictionariesStore();
