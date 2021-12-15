// @flow

// import { serialize, deserialize } from 'services/serialization';

export default class Api {
  backendUrl: string;
  serializerType: string;
  serializerOptions: any;

  constructor(backendUrl: string = "http://localhost:3000/api/v1") {
    this.backendUrl = backendUrl;
    this.serializerType = "";
    this.serializerOptions = {};
  }

  request = async (url: string, params: any = {}) =>
    new Promise<any>(async (resolve, reject): any => {
      const headers = {
        'Accept': "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, Content-Type, Accept"
      };

      try {
        const response = await fetch(`${this.backendUrl}/${url}`, {
          headers,
          ...params,
        });
        try {
          if (response.status === 204) return resolve({ data: {}, meta: {} });
          let json = response.data;
          if (response.json) json = await response.json();

          if (response.ok || (response.status >= 200 && response.status < 204))
            return resolve(json);

          return reject(json);
        } catch (error) {
          return reject(error);
        }
      } catch (error) {
        const { message } = error;
        console.log(message);
        return reject(message);
      }
    });
}
