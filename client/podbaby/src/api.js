import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import {
  partial
} from 'lodash';

const parseJSON = response => response.json();

const checkStatus = response => {
  if (response.ok) {
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

  const token = window.localStorage.getItem('auth-token');
  if (token) {
    headers['Authorization'] = 'Token ' + token;
  }

  let body;

  if (data) {
    body = JSON.stringify(data);
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
