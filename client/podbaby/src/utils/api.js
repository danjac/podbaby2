import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { partial } from 'lodash';
import { SubmissionError } from 'redux-form';

import config from '../config';
import { getAuthToken } from './storage';

const instance = axios.create({
  baseURL: config.API_URL,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true,
  transformRequest: axios.defaults.transformRequest.concat(decamelizeKeys),
  transformResponse: axios.defaults.transformResponse.concat(camelizeKeys),
  validateStatus(status) {
    return status < 401;
  },
});

const doReq = (method, url, data) => {

  const headers = {};

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = 'Token ' + token;
  }

  return instance.request({
      url,
      method,
      headers,
      data,
  }).then(response => {
    if (response.status === 400) {
      throw new SubmissionError(response.data);
    }
    return response.data;
  });
};


export const get = partial(doReq, 'get');
export const post = partial(doReq, 'post');
export const put = partial(doReq, 'put');
export const patch = partial(doReq, 'patch');
export const del = partial(doReq, 'delete');
