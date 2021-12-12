// @flow

import qs from 'qs';
import Api from './ApiBase';

const defaultQueryParams = {
  include: 'user.skin',
  fields: {
    users: 'id,state,first_name,last_name,business_name,profile_type,avatar_url,level_of_connect,skin'
  },
  sort: '-updated_at'
};

class ConversationParticipantsApi extends Api {
  serializerType = 'participants';

  serializerOptions = {
    attributes: [
      'user'
    ],
    user: {
      ref: 'id',
      attributes: ['id', 'type']
    }
  };

  getAllParticipants = async (conversationId: string, params: any) => {
    const encodedValues = qs.stringify({ ...defaultQueryParams, ...params }, { encodeValuesOnly: true });
    const json = await this.request(`conversations/${conversationId}/participants?${encodedValues}`);
    const data = await this.deserialize(json);

    return { data };
  };

  inviteParticipant = async (conversationId: string, user: any, params: any) => {
    const encodedValues = qs.stringify({ ...defaultQueryParams, ...params }, { encodeValuesOnly: true });
    const body = await this.serialize({ user });
    const json = await this.request(`conversations/${conversationId}/participants?${encodedValues}`, { body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

}

export default new ConversationParticipantsApi();
