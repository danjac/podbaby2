import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import _ from 'lodash';
import { SubmissionError } from 'redux-form';

import { getAuthToken } from '../utils/storage';

const transformRequest = [...axios.defaults.transformRequest, decamelizeKeys];
const transformResponse = [...axios.defaults.transformResponse, camelizeKeys];

const baseURL = process.env.NODE_ENV === 'production' ? 'https://podbaby.me/' : 'http://localhost:8000/';

const instance = axios.create({
  baseURL,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true,
  transformRequest,
  transformResponse,
});

const request = (method, url, data, options) => {

  const headers = {};

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = 'Token ' + token;
  }

  return instance
    .request({
      url,
      method,
      headers,
      data,
      ...options,
   })
  .then(response => response.data)
    .catch(err => {
      if (err.response) {
        switch (err.response.status) {
          case 400:
          throw new SubmissionError(err.response.data);
          default:
        }
      }
      throw err;
    });

};


export const get = _.partial(request, 'get', _, undefined);
export const post = _.partial(request, 'post');
export const put = _.partial(request, 'put');
export const patch = _.partial(request, 'patch');
export const del = _.partial(request, 'delete');
