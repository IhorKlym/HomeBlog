// @flow

import qs from 'qs';
import { getRandomArrayItem } from 'helpers/methods';
import Api from './ApiBase';

const shapes = ['square', 'round'];
const colorSchemes = [
  { bg: '#56624E', text: '#fff' },
  { bg: '#264697', text: '#fff' },
  { bg: '#EEC5B2', text: '#333' },
  { bg: '#491928', text: '#fff' },
  { bg: '#F9E9E2', text: '#333' },
  { bg: '#BEC7E0', text: '#333' }
];
const generateSkin = (systemTag: any) => {
  const hasImage = !!systemTag.imageUrl;
  const shape = hasImage ? getRandomArrayItem(shapes) : 'round';
  const borderRadius = (!hasImage && shape === 'round') ? '50%' : `${Math.floor(Math.random() * 3) * 20}px`;
  const colorScheme = getRandomArrayItem(colorSchemes);
  return { hasImage, shape, borderRadius, colorScheme };
};

class SystemTagsApi extends Api {
  serializerType = 'system_tags';

  skinsMap = new Map<any, any>();
  getSkin = (systemTag: any) => {
    let skin = this.skinsMap.get(systemTag.id);
    if (!skin) {
      skin = generateSkin(systemTag);
      this.skinsMap.set(systemTag.id, skin);
    }
    return skin;
  };

  fetchSystemTags = async (params: any) => {
    const encodedValues = qs.stringify(params, { encodeValuesOnly: true });
    const json = await this.request(`system_tags?${encodedValues}`);
    let data = await this.deserialize(json);

    data = data.map(item => ({ ...item, skin: this.getSkin(item) }));

    return { data };
  };
  
  getSystemTag = async (id: any, params: any) => {
    const encodedValues = qs.stringify(params, { encodeValuesOnly: true });
    const json = await this.request(`system_tags/${id}?${encodedValues}`);
    let data = await this.deserialize(json);

    data = { ...data, skin: this.getSkin(data) };

    return { data };
  };
}

export default new SystemTagsApi();
