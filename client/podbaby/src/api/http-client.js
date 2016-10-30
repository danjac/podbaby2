import axios from 'axios';

import {
  camelizeKeys,
  decamelizeKeys,
} from 'humps';

import _ from 'lodash';

import {
  SubmissionError,
} from 'redux-form';

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
        if (err.response) {
          switch (err.response.status) {
            case 400:
              throw new SubmissionError(err.response.data);
            default:

          }
        }
        throw err;
      });
  }

  get(url, params, options) {
    return this.handleRequest('GET', url, {...options,
      params,
    });
  }

  post(url, data, options) {
    return this.handleRequest('POST', {...options,
      data,
    });
  }


  put(url, data, options) {
    return this.handleRequest('PUT', {...options,
      data,
    });
  }

  patch(url, data, options) {
    return this.handleRequest('PATCH', {...options,
      data,
    });
  }

  del(url, options) {
    return this.handleRequest('DELETE', options);
  }

}

export default new HttpClient();
