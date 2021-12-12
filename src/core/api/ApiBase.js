// @flow

// import { serialize, deserialize } from 'services/serialization';

export default class Api {
  backendUrl: string;
  serializerType: string;
  serializerOptions: any;

  constructor(backendUrl: string = 'https://reqres.in/api') {
    this.backendUrl = backendUrl;
    this.serializerType = '';
    this.serializerOptions = {};
  }

  request = async (
    url: string,
    params: any = {}
  ) => new Promise<any>(async (resolve, reject): any => {
    const headers = {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    };

    try {
      const response = await fetch(`${this.backendUrl}/${url}`, { headers, ...params });
      try {
        if (response.status === 204) return resolve({ data: {}, meta: {} });
        const json = await response.json();
        return resolve(json);
      } catch (error) {
        const { message } = error;
        return reject(message);
      }
    } catch (error) {
      const { message } = error;
      return reject(message);
    }
  });
}
