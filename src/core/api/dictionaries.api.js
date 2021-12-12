// @flow

import qs from 'qs';
import Api from './ApiBase';

class DictionariesApi extends Api {

  fetchTags = async (params: any) => {
    const encodedValues = qs.stringify(params, { encodeValuesOnly: true });
    const json = await this.request(`tags?${encodedValues}`);
    const data = await this.deserialize(json);

    return { data };
  };
}

export default new DictionariesApi();
