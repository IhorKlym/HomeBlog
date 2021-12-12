// @flow

import { Serializer, Deserializer } from 'jsonapi-serializer';

export const serialize = async (dataSet: {}, type: any, options: any = {}) => new Promise(async (resolve, reject) => {
  try {
    const data = await new Serializer(type, options).serialize(dataSet);
    return resolve(data);
  } catch (error) {
    const { message } = error;
    return reject(new Error(`Serialize aborting. | ${message}`));
  }
});

export const deserialize = async (json: any, options: any = {}) => new Promise(async (resolve, reject) => {
  try {
    const deserializer = new Deserializer({ ...options, keyForAttribute: 'camelCase', typeAsAttribute: true });

    if (options.deserializeIncluded && json.included) {
      const includedDeserialized = [];

      const promises = json.included.map(async (item) => {
        const itemJson = { ...json, data: item };
        return deserializer.deserialize(itemJson).then(data => includedDeserialized.push(data));
      });
      await Promise.all(promises);

      const applyRelationsipForDataItem = (dataItem: any) => {  /* eslint-disable no-param-reassign */
        const { attributes, relationships = {} } = dataItem;
        delete dataItem.relationships;

        const getFromIncludedDeserialized = (relationship: any) => (
          includedDeserialized.find(item => (
            relationship && item.type === relationship.type && item.id === relationship.id
          )) || relationship
        );

        Object.keys(relationships).forEach(relationshipName => {
          const relationship = relationships[relationshipName].data;
          if (!relationship) attributes[relationshipName] = relationship;
          else if (Array.isArray(relationship)) {
            attributes[relationshipName] = relationship.map(getFromIncludedDeserialized);
          } else {
            attributes[relationshipName] = getFromIncludedDeserialized(relationship);
          }
        });
      };

      if (Array.isArray(json.data)) {
        json.data.forEach(applyRelationsipForDataItem);
      } else {
        applyRelationsipForDataItem(json.data);
      }

      const data = await deserializer.deserialize(json);
      return resolve(data);
    }

    const data = await deserializer.deserialize(json);
    return resolve(data);

  } catch (error) {
    const { message } = error;
    return reject(new Error(`Deserialize aborting. | ${message}`));
  }
});
