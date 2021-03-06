import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { isPlainObject } from 'lodash';
import { SubmissionError } from 'redux-form';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://podbaby.me/' : 'http://localhost:8000/';

const transformRequest = [
  ...axios.defaults.transformRequest,
  decamelizeKeys,
];

const transformResponse = [
  ...axios.defaults.transformResponse,
  camelizeKeys,
];


class HttpClient {

  constructor() {

    this.client = axios.create({
      baseURL,
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken',
      withCredentials: true,
      transformRequest,
      transformResponse,
    });

  }

  handleRequest(method, url, options) {
    const headers = {};

    const token = window.localStorage.getItem('auth-token');

    if (token) {
      headers['Authorization'] = 'Token ' + token;
    }

    return this.client
      .request({
        url,
        method,
        headers,
        ...options,
      })
      .then(response => response.data)
      .catch(err => {
        if (err.response &&
          err.response.status === 400 &&
          isPlainObject(err.response.data)) {
          throw new SubmissionError(err.response.data);
        }
        throw err;
      });
  }

  fetchMany(url, page, searchQuery) {
    const params = {};
    if (page) {
      params.page = page;
    }
    if (searchQuery) {
      params.q = searchQuery;
    }
    return this.get(url, params);
  };

  get(url, params, options) {
    return this.handleRequest('GET', url, {...options, params });
  }

  post(url, data, options) {
    return this.handleRequest('POST', url, {...options, data });
  }


  put(url, data, options) {
    return this.handleRequest('PUT', url, {...options, data });
  }

  patch(url, data, options) {
    return this.handleRequest('PATCH', url, {...options, data });
  }

  del(url, options) {
    return this.handleRequest('DELETE', url, options);
  }

}

export default new HttpClient();
