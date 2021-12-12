// @flow

import qs from 'qs';
import Api from './ApiBase';

class SearchesApi extends Api {

  searchPosts = async (params: any) => {
    const encodedValues = qs.stringify(params, { encodeValuesOnly: true });
    const json = await this.request(`searches?${encodedValues}`);
    const data = await this.deserialize(json, { deserializeIncluded: true });

    return { data, meta: json.meta };
  };

  fetchActivity = async (params: any) => {
    const encodedValues = qs.stringify(params, { encodeValuesOnly: true });
    const json = await this.request(`searches/activity?${encodedValues}`, { showNotFountErrorNotice: false });
    const data = await this.deserialize(json, { deserializeIncluded: true });

    return { data };
  };

  searchUsers = async (params: any) => {
    const encodedValues = qs.stringify(params, { encodeValuesOnly: true });
    const json = await this.request(`searches/users?${encodedValues}`);
    const data = await this.deserialize(json);

    return { data, meta: json.meta };
  };

  fetchUsersMentions = async (params: any) => {
    const encodedValues = qs.stringify(params, { encodeValuesOnly: true });
    const json = await this.request(`searches/mention_users?${encodedValues}`);
    const data = await this.deserialize(json);

    return { data, meta: json.meta };
  };

  fetchSuggestedConnections = async (params: any) => {
    const encodedValues = qs.stringify(params, { encodeValuesOnly: true });
    const json = await this.request(`searches/people_may_know?${encodedValues}`);
    const data = await this.deserialize(json);

    return { data };
  };
}

export default new SearchesApi();
