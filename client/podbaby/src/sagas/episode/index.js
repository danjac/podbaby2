import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import {
  FETCH_EPISODE_FAILURE,
  FETCH_EPISODE_REQUEST,
  FETCH_EPISODE_SUCCESS,
} from '../../actionTypes';

import * as api from '../../api';

function* fetchEpisode({ payload: { id } }) {

  try {
    const payload = yield call(api.episodes.get, id);
    yield put({
      type: FETCH_EPISODE_SUCCESS,
      payload,
    });
  } catch(error) {
    yield put({
      type: FETCH_EPISODE_FAILURE,
      error,
    });
  }
}

export default function* watch() {
  yield takeLatest(FETCH_EPISODE_REQUEST, fetchEpisode);
}
