// @flow

import qs from 'qs';
import Api from './ApiBase';

const defaultQueryParams = {
  filter: {
    state: 'active'
  },
  fields: {
    users: 'id,state,first_name,last_name,business_name,profile_type,avatar_url,level_of_connect,skin'
  },
  include: 'participants.user.skin,message',
  sort: '-updated_at'
};

class ConversationsApi extends Api {
  serializerType = 'conversations';

  serializerOptions = {
    attributes: [
      'name'
    ]
  };

  getAllConversations = async (params: any) => {
    const encodedValues = qs.stringify({ ...defaultQueryParams, ...params }, { encodeValuesOnly: true });
    const json = await this.request(`conversations?${encodedValues}`);
    const data = await this.deserialize(json);

    return { data };
  };

  getConversation = async (id: any, params: any) => {
    const encodedValues = qs.stringify({ ...defaultQueryParams, ...params }, { encodeValuesOnly: true });
    const json = await this.request(`conversations/${id}?${encodedValues}`);
    const data = await this.deserialize(json);

    return { data };
  };

  createConversation = async (conversation: any, params: ?any = {}) => {
    const encodedValues = qs.stringify({ ...defaultQueryParams, ...params }, { encodeValuesOnly: true });
    const body = await this.serialize(conversation);
    const json = await this.request(`conversations?${encodedValues}`, { body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

}

export default new ConversationsApi();
