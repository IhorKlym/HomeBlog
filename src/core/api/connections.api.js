// @flow

import qs from 'qs';
import Api from './ApiBase';

const defaultQueryParams = {
  include: 'user_source,user_target',
  sort: '-created_at'
};

class ConnectionsApi extends Api {
  serializerType = 'connections_pools';

  serializerOptions = {
    attributes: [
      'target'
    ],
    target: {
      ref: 'id',
      included: false
    }
  };

  getMutualConnections = async (userId: any, params: any = {}) => {
    const encodedValues = qs.stringify(params, { encodeValuesOnly: true });
    const json = await this.request(`connections/${userId}/mutual_friends?${encodedValues}`);
    const data = await this.deserialize(json);

    return { data };
  };

  getPendingRequests = async (params: any = {}) => {
    const encodedValues = qs.stringify({ ...defaultQueryParams, ...params }, { encodeValuesOnly: true });
    const json = await this.request(`connections/pending?${encodedValues}`);
    const data = await this.deserialize(json);

    return { data };
  };

  createRequest = async (user: {}) => {
    const body = await this.serialize({ target: user });
    const json = await this.request('connections/request_connect', { body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

  acceptRequest = async (user: {}) => {
    const body = await this.serialize({ target: user });
    const json = await this.request('connections/request_accept', { body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

  declineRequest = async (user: {}) => {
    const body = await this.serialize({ target: user });
    const json = await this.request('connections/request_decline', { body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

  disconnect = async (user: {}) => {
    const body = await this.serialize({ target: user });
    const json = await this.request('connections/friend_disconnect', { body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };
}

export default new ConnectionsApi();
