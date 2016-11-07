import { takeLatest, takeEvery, delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { Map } from 'immutable';

import { searchMovies } from '../api/search';
import { getMovie } from '../api/items';
import { getConfig } from '../api/config';

import * as actions from './actions';

export function makeRequestActionSet(actionType) {
  return {
    REQUEST: actionType + 'REQUEST',
    SUCCESS: actionType + 'SUCCESS',
    FAILURE: actionType + 'FAILURE',
  }
}

// worker Saga: will be fired on actions
export const GET_MOVIES = makeRequestActionSet('GET_MOVIES');

function* fetchMovieResults(action) {
  const { query, noDelay } = action.payload;
  if (query) {
   try {
    if (!noDelay) {
      yield delay(200);
    }
    const results = yield call(searchMovies, action.payload.query);
    yield put({type: GET_MOVIES.SUCCESS, payload: results});
    } catch (e) {
      yield put({type: GET_MOVIES.FAILURE, payload: e.message});
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
export const GET_BACKDROP_URL = makeRequestActionSet('GET_BACKDROP_URL');

function* fetchBackdropUrl(action) {
 try {
  const response = yield call(getConfig);

  yield put({type: GET_BACKDROP_URL.SUCCESS, payload: response.images});
  } catch (e) {
    yield put({type: GET_BACKDROP_URL.FAILURE, payload: e.message});
  }
}

function* getBackdropUrl() {
  yield* takeEvery(actions.GET_API_CONFIG, fetchBackdropUrl);
}

// worker Saga: will be fired on actions
export const GET_MOVIE_DETAILS = makeRequestActionSet('GET_MOVIE_DETAILS');

function* fetchMovieDetails(action) {
 try {
  yield put({type: GET_MOVIE_DETAILS.REQUEST, payload: action.payload});
  const response = yield call(getMovie, action.payload.id, Map({append_to_response: 'credits,recommendations'}));

  yield put({type: GET_MOVIE_DETAILS.SUCCESS, payload: response});
  } catch (e) {
    yield put({type: GET_MOVIE_DETAILS.FAILURE, payload: e.message});
  }
}

function* getMovieDetails() {
  yield* takeEvery(actions.LOAD_MOVIE_DETAILS, fetchMovieDetails);
}

export default function* rootSaga() {
  yield [
    searchForMovies(),
    getBackdropUrl(),
    getMovieDetails(),
  ]
};
