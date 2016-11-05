import { takeLatest, delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { searchMovies } from '../api/search';

import * as actions from './actions';

// worker Saga: will be fired on actions
function* fetchMovieResults(action) {
   try {
      yield delay(200);
      const results = yield call(searchMovies, action.payload);
      yield put({type: 'GET_MOVIES_SUCCESS', payload: results});
   } catch (e) {
      yield put({type: "GET_MOVIES_FAILED", payload: e.message});
   }
}

/*
  Starts fetchMovieResults on each dispatched `USER_FETCH_REQUESTED` action.
*/
function* searchForMovies() {
  yield* takeLatest(actions.CHANGE_SEARCH_QUERY, fetchMovieResults);
}

export default function* rootSaga() {
  yield [
    searchForMovies(),
  ]
};
