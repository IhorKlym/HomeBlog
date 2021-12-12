// @flow

const defaultFieldsMapping = {
  address: [
    {
      type: 'street_number',
      value: 'short_name',
      format: (state = '', val) => `${state} ${val}`
    },
    {
      type: 'route',
      value: 'long_name',
      format: (state = '', val) => `${val}${state}`
    },
    {
      type: 'premise',
      value: 'long_name',
      format: (state = '', val = '') => state || val
    }
  ],
  postalCode: {
    value: 'short_name',
    type: 'postal_code'
  },
  city: {
    value: 'long_name',
    type: 'locality'
  },
  stateCode: [
    {
      value: 'short_name',
      type: 'administrative_area_level_1'
    },
    {
      value: 'short_name',
      type: 'administrative_area_level_2',
      format: (state = '', val = '') => state || val
    },
    {
      value: 'short_name',
      type: 'locality',
      format: (state = '', val = '') => state || val
    }
  ],
  regionName: [
    {
      value: 'short_name',
      type: 'administrative_area_level_1'
    },
    {
      value: 'short_name',
      type: 'administrative_area_level_2',
      format: (state = '', val = '') => state || val
    },
    {
      value: 'short_name',
      type: 'locality',
      format: (state = '', val = '') => state || val
    }
  ],
  regionCountry: {
    value: 'long_name',
    type: 'country'
  }
};

export const parseAddress = (place: any, fieldsMapping: any = defaultFieldsMapping): any => {
  if (!place) {
    return {};
  }
  const { lat, lng } = place.geometry.location;

  const getValue = (address, item, prevValue = '') =>
    (item.format ? item.format(prevValue, address[item.value]) : address[item.value]);

  const addressComponents = place.address_components || [];

  const types = addressComponents.reduce((res, item) => {
    res[item.types[0]] = item;
    return res;
  }, {});

  const data = Object.keys(fieldsMapping).reduce((res, field) => {
    res[field] = ((fieldMappingItem) => {
      if (Array.isArray(fieldMappingItem)) {
        return fieldMappingItem.reduce((res2, item) =>
          (types[item.type] ? getValue(types[item.type], item, res2) : res2)
        , '');
      }
      return types[fieldMappingItem.type] ?
        getValue(types[fieldMappingItem.type], fieldMappingItem) : '';
    })(fieldsMapping[field]);

    return res;
  }, {});

  return {
    location: place.formatted_address,
    latitude: typeof lat === 'function' ? lat() : lat,
    longitude: typeof lng === 'function' ? lng() : lng,
    zipCode: data.postalCode,
    city: data.city,
    stateCode: data.regionName,
    country: data.regionCountry
  };
};

export const getCurrentPosition = (): any => (
  new Promise<any>((resolve, reject): any => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      }, (e) => {
        throw (e);
      });
    } catch (e) {
      reject(e);
    }
  })
);

export const findPlacesByCurrentPosition = (): any => (
  new Promise<any>(async (resolve, reject): any => {
    try {
      const position = await getCurrentPosition();
      const { coords: { latitude, longitude } } = position;
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=locality&key=${process.env.GOOGLE_APP_KEY || ''}`);
      const json = await response.json();
      resolve(json.results || []);
    } catch (e) {
      reject(e);
    }
  })
);
