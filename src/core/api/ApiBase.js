// @flow

import { serialize, deserialize } from 'services/serialization';
import toaster from 'services/toaster';
import { getToken } from 'helpers/token';
import { redirectToAuth } from 'helpers/auth';
import { apiServerUrl } from '../config/env';

export default class Api {
  backendUrl: string;
  serializerType: string;
  serializerOptions: any;

  constructor(backendUrl: string = apiServerUrl) {
    this.backendUrl = backendUrl;
    this.serializerType = '';
    this.serializerOptions = {};
  }

  request = async (
    url: string,
    params: any = {}
  ) => new Promise<any>(async (resolve, reject): any => {
    const {
      showNotFountErrorNotice = true,
      customErrorHundlingFor = []
    } = params;
    const headers = {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Bearer ${getToken() || ''}`,
      'Access-Control-Allow-Origin': '*'
    };

    try {
      const response = await fetch(`${this.backendUrl}/${url}`, { headers, ...params });

      try {
        if (response.status === 204) return resolve({ data: {}, meta: {} });
        const json = await response.json();
        if (response.ok) return resolve(json);
        if (response.status === 401) return redirectToAuth();
        if (customErrorHundlingFor.includes(response.status)) return reject(json);
        if (response.status > 399 && (response.status === 404 ? showNotFountErrorNotice : true)) {
          toaster.notify((json && json.errors)
            ? json.errors.map(err => err.detail).join('<br>')
            : (json.error || 'Something went wrong'));
        }
        return reject(json);
      } catch (error) {
        const { message } = error;
        if (response.status !== 204) toaster.notify(message);
        return reject(new Error(`Received a non-JSON response, aborting. | ${message}`));
      }
    } catch (error) {
      const { message } = error;
      toaster.notify(message);
      return reject(message);
    }
  });

  upload = async (url: string, body: any, params: any = {}): Promise<any> => new Promise(async (resolve, reject) => {
    try {

      const xhr = new XMLHttpRequest();
      xhr.open(params.method || 'PUT', params.isS3 ? url : `${this.backendUrl}/${url}`, true);

      if (!params.isS3) xhr.setRequestHeader('Authorization', `Bearer ${getToken() || ''}`);
      if (params.onUploadProgress) xhr.upload.onprogress = params.onUploadProgress;

      xhr.onload = function onload() {
        const response = this;

        try {
          if (response.status === 204) return resolve({ data: {}, meta: {} });
          let json;
          if (response.response) json = JSON.parse(response.response);
          if (response.ok || response.status === 200) return resolve(json);
          if (response.status === 401) return redirectToAuth();
          if (response.status > 399) toaster.notify((json && json.errors) ? json.errors.map(err => err.detail).join('<br>') : ((json && json.error) || 'Something went wrong'));
          return reject(json);
        } catch (error) {
          const { message } = error;
          if (response.status !== 204) toaster.notify(message);
          return reject(new Error(`Received a non-JSON response, aborting. | ${message}`));
        }
      };

      xhr.onerror = function onerror() {
        reject(new Error({
          status: this.status,
          statusText: xhr.statusText
        }));
      };

      xhr.send(body);

    } catch (error) {
      const { message } = error;
      toaster.notify(message);
      return reject(message);
    }

  });

  serialize = (dataSet: {}) => (
    serialize(dataSet, this.serializerType, { ...this.serializerOptions, keyForAttribute: 'snake_case' })
  );

  deserialize = deserialize
}
