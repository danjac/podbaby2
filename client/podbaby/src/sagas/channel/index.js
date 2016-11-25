import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import {
  FETCH_CHANNEL_EPISODES_REQUEST,
  FETCH_CHANNEL_FAILURE,
  FETCH_CHANNEL_REQUEST,
  FETCH_CHANNEL_SUCCESS,
} from '../../actionTypes';

import * as api from '../../api';

import { fetch } from '../episodes';

function* fetchChannel({ payload: { id } }) {
  try {
    const channel = yield call(api.channels.get, id);
    yield put({
      type: FETCH_CHANNEL_SUCCESS,
      payload: channel,
    });
  } catch (error) {
    yield put({
      type: FETCH_CHANNEL_FAILURE,
      error,
    });
  }
}

function* fetchEpisodes({ payload, payload: { id } }) {
  const apiCall = (page, searchQuery) => api.channels.fetchEpisodes(
    id,
    page,
    searchQuery,
  );
  yield call(fetch, apiCall, { payload });
}

export default function* watch() {
  yield takeLatest(FETCH_CHANNEL_REQUEST, fetchChannel);
  yield takeLatest(FETCH_CHANNEL_EPISODES_REQUEST, fetchEpisodes);
}
