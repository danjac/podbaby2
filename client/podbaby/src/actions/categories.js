import * as api from '../api';

import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from '../action-types';

export const fetchCategories = () => {
  return dispatch => {

    dispatch({
      type: FETCH_CATEGORIES_REQUEST,
    });

    return api.categories.fetchAll()
      .then(payload => {
        dispatch({
          type: FETCH_CATEGORIES_SUCCESS,
          payload,
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_CATEGORIES_FAILURE,
          error,
        });
      });
  };
};
