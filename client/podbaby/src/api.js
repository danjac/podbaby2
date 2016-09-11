import fetch from 'isomorphic-fetch';
import { decamelizeKeys, camelizeKeys } from 'humps';
import {
  partial
} from 'lodash';

import { getAuthToken } from './storage';

const parseJSON = response => {
  return response.json().then(data => {
    if (response.status === 400) {
      return { errors: data };
    }
    return data;
  });
}

const checkStatus = response => {
  if (response.ok || response.status === 400) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};


const normalizeUrl = url => {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://podbaby.me' : 'http://localhost:8000';
  if (!url.startsWith(baseUrl)) {
    url = baseUrl + url;
  }
  return url;
}

const doReq = (method, url, data) => {

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const token = getAuthToken();

  if (token) {
    headers['Authorization'] = 'Token ' + token;
  }

  let body;

  if (data) {
    body = JSON.stringify(decamelizeKeys(data));
  }

  return fetch(normalizeUrl(url), {
      mode: 'cors',
      method,
      body,
      headers,
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(camelizeKeys)
};


export const get = partial(doReq, 'GET');
export const post = partial(doReq, 'POST');
export const put = partial(doReq, 'PUT');
export const patch = partial(doReq, 'PATCH');
export const del = partial(doReq, 'DELETE');
