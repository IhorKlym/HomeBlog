// @flow

import qs from 'qs';
import Api from './ApiBase';

class InvitationsApi extends Api {
  serializerType = 'users';

  serializerOptions = {
    attributes: [
      'accessToken',
      'provider',
      'socialData'
    ]
  };

  inviteViaEmail = async (email: string) => {
    const params = {
      filter: { email }
    };
    const encodedValues = qs.stringify(params, { encodeValuesOnly: true });
    const json = await this.request(`invitations/email?${encodedValues}`, { method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

  inviteViaText = async (phone: string) => {
    const params = {
      filter: { phone }
    };
    const encodedValues = qs.stringify(params, { encodeValuesOnly: true });
    const json = await this.request(`invitations/phone?${encodedValues}`, { method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

  getGoogleContacts = async (socialData: any) => {
    const body = await this.serialize({ provider: 'google', socialData });
    const json = await this.request('invitations/from_google', {  body: JSON.stringify(body), method: 'POST' });
    const data = await this.deserialize(json);

    return { data };
  };

}

export default new InvitationsApi();
