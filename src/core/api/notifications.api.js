// @flow

import qs from 'qs';
import Api from './ApiBase';

const defaultQueryParams = {
  fields: {
    posts: 'content'
  },
  include: 'user.skin,actor.skin,target.skin',
  sort: '-created_at'
};

class NotificationsApi extends Api {

  getAllNotifications = async (params: any) => {
    const encodedValues = qs.stringify({ ...defaultQueryParams, ...params }, { encodeValuesOnly: true });
    const json = await this.request(`notifications?${encodedValues}`);
    const data = await this.deserialize(json);

    return { data };
  };

  readAllNotifications = async () => {
    const json = await this.request('notifications', { method: 'PATCH' });
    const data = await this.deserialize(json);

    return { data };
  };

  readNotification = async (notificationId: any) => {
    const json = await this.request(`notifications/${notificationId}`, { method: 'PATCH' });
    const data = await this.deserialize(json);

    return { data };
  };

}

export default new NotificationsApi();
