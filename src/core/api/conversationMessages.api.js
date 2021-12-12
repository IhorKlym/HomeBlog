// @flow

import qs from 'qs';
import Api from './ApiBase';

const defaultQueryParams = {
  include: 'participant.user.skin,share.user.skin,share.photos,share.videos,share.post.user.skin,share.post.photos,share.post.videos',
  fields: {
    users: 'id,state,first_name,last_name,business_name,profile_type,avatar_url,level_of_connect,skin'
  },
  sort: '-created_at'
};

class ConversationMessagesApi extends Api {
  serializerType = 'messages';

  serializerOptions = {
    attributes: [
      'body'
    ]
  };

  getAllMessages = async (conversationId: string, params: any) => {
    const encodedValues = qs.stringify({ ...defaultQueryParams, ...params }, { encodeValuesOnly: true });
    const json = await this.request(`conversations/${conversationId}/messages?${encodedValues}`);
    const data = await this.deserialize(json);

    return { data };
  };

  sendMessage = async (conversationId: string, msg: string, params: any) => {
    const encodedValues = qs.stringify({ ...defaultQueryParams, ...params }, { encodeValuesOnly: true });
    const body = await this.serialize({ body: msg });
    const json = await this.request(`conversations/${conversationId}/messages?${encodedValues}`, { body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

  sharePost = async (id: any, msg: string, params: any) => {
    const encodedValues = qs.stringify(params, { encodeValuesOnly: true });
    const body = await this.serialize({ body: msg });
    const json = await this.request(`posts/${id}/share?${encodedValues}`, { body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

  shareReply = async (id: any, msg: string, params: any) => {
    const encodedValues = qs.stringify({ ...defaultQueryParams, ...params }, { encodeValuesOnly: true });
    const body = await this.serialize({ body: msg });
    const json = await this.request(`replies/${id}/share?${encodedValues}`, { body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

}

export default new ConversationMessagesApi();
