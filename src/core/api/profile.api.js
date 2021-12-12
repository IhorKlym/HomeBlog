// @flow

import qs from 'qs';
import Api from './ApiBase';

const defaultParams = {
  include: 'skin' 
};

class UserProfileApi extends Api {
  serializerType = 'users';

  serializerOptions = {
    attributes: [
      'avatarData',
      'profileType',
      'businessName',
      'firstName',
      'lastName',
      'bio',
      'phone',
      'education',
      'companyPosition',
      'avatar',
      'birthDay',
      'birthMonth',
      'birthYear',
      'gender',
      'location',
      'latitude',
      'longitude',
      'zipCode',
      'city',
      'stateCode',
      'country',
      'tagList',
      'antogonistTagList',
      'visibility',
      'state',
      'skin'
    ],
    skin: {
      ref: 'id',
      attributes: ['id', 'type']
    }
  };

  updateProfile = async (user: {}) => {
    const encodedValues = qs.stringify(defaultParams, { encodeValuesOnly: true });
    const body = await this.serialize(user);
    const json = await this.request(`me?${encodedValues}`, { body: JSON.stringify(body), method: 'PUT' });
    const data = await this.deserialize(json);

    return { data };
  };
}

export default new UserProfileApi();
