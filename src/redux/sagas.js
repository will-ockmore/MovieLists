import { takeLatest, takeEvery, delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { searchMovies } from '../api/search';
import { getConfig } from '../api/config';

import * as actions from './actions';

// worker Saga: will be fired on actions
function* fetchMovieResults(action) {
  if (action.payload) {
   try {
    yield delay(200);
    const results = yield call(searchMovies, action.payload);
    yield put({type: 'GET_MOVIES_SUCCESS', payload: results});
    } catch (e) {
      yield put({type: "GET_MOVIES_FAILED", payload: e.message});
    }
  }
}

/*
  Starts fetchMovieResults on each dispatched `USER_FETCH_REQUESTED` action.
*/
function* searchForMovies() {
  yield* takeLatest(actions.CHANGE_SEARCH_QUERY, fetchMovieResults);
}

// worker Saga: will be fired on actions
function* fetchPosterUrl(action) {
 try {
  const response = yield call(getConfig);
  console.log(response);
  const { secure_base_url, backdrop_sizes } = response.images;
  const imageUrl = secure_base_url + backdrop_sizes[0];

  yield put({type: 'GET_POSTER_URL_SUCCESS', payload: imageUrl});
  } catch (e) {
    yield put({type: "GET_POSTER_URL_FAILED", payload: e.message});
  }
}

function* getPosterUrl() {
  yield* takeEvery(actions.GET_API_CONFIG, fetchPosterUrl);
}

export default function* rootSaga() {
  yield [
    searchForMovies(),
    getPosterUrl(),
  ]
};
