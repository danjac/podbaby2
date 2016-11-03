import * as api from '../api';
import  { dispatchApiCall} from '../utils';

import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from '../action-types';

export const fetchCategories = () => dispatch => dispatchApiCall(
  dispatch,
  api.categories.fetchAll(),
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
);
