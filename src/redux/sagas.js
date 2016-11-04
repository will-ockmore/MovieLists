import { takeLatest, delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import * as actions from './actions';

// worker Saga: will be fired on actions
function* fetchMovieResults(action) {
   try {
      yield delay(2000)
      const fetchMovies = query =>
        fetch('https://api.themoviedb.org/3/search/movie?api_key=222b25964071b4f51f70335f0a47603d&query=' + query)
          .then(response => response.json());

      const results = yield call(fetchMovies, action.payload);
      console.log(results);
      yield put({type: 'GET_MOVIES_SUCCESS', payload: results});
   } catch (e) {
      yield put({type: "GET_MOVIES_FAILED", payload: e.message});
   }
}

/*
  Starts fetchMovieResults on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* searchMovies() {
  yield* takeLatest(actions.CHANGE_SEARCH_QUERY, fetchMovieResults);
}

export default function* rootSaga() {
  yield [
    searchMovies(),
  ]
};
