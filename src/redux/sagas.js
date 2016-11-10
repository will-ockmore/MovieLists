import { takeLatest, takeEvery, delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { Map, Range } from 'immutable';

import { searchMovies } from '../api/search';
import { getMovie } from '../api/items';
import { getConfig, getGenres } from '../api/config';

import * as actions from './actions';

export function makeRequestActionSet(actionType) {
  return {
    REQUEST: actionType + 'REQUEST',
    SUCCESS: actionType + 'SUCCESS',
    FAILURE: actionType + 'FAILURE',
  }
}

// get movies saga
export const GET_MOVIES = makeRequestActionSet('GET_MOVIES');
export const GET_FURTHER_MOVIES = makeRequestActionSet('GET_FURTHER_MOVIES');

// worker Saga: will be fired on actions
function* fetchMovieResults(action) {
  const { query, noDelay } = action.payload;

  if (query) {
   try {
    if (!noDelay) {
      yield delay(200);
    }
    const response = yield call(searchMovies, action.payload.query);

    yield put({type: GET_MOVIES.SUCCESS, payload: response.results});

    } catch (e) {
      yield put({type: GET_MOVIES.FAILURE, payload: e.message});
    }

    yield delay(500);

    // get more results from later pages once the user stays on a result set
    try {
      let furtherResponse = {results: []};
      for(let i of Range(2, 8)) {
        furtherResponse = yield call(searchMovies, action.payload.query, { page: i });

        yield put({type: GET_FURTHER_MOVIES.SUCCESS, payload: furtherResponse.results});
      }

    } catch (e) {
      yield put({type: GET_FURTHER_MOVIES.FAILURE, payload: e.message})
    }

  }
}

/*
  Starts fetchMovieResults on each dispatched action.
*/
function* searchForMovies() {
  yield* takeLatest(actions.CHANGE_SEARCH_QUERY, fetchMovieResults);
}

// worker Saga: will be fired on actions
export const GET_BACKDROP_URL = makeRequestActionSet('GET_BACKDROP_URL');
export const GET_GENRES = makeRequestActionSet('GET_GENRES');

function* fetchConfig(action) {
  try {
    const response = yield call(getConfig);

    yield put({type: GET_BACKDROP_URL.SUCCESS, payload: response.images});
  } catch (e) {
    yield put({type: GET_BACKDROP_URL.FAILURE, payload: e.message});
  }

  try {
    const response = yield call(getGenres);

    yield put({type: GET_GENRES.SUCCESS, payload: response.genres});
  } catch(e) {
    yield put({type: GET_GENRES.FAILURE, payload: e.message});
  }
}

function* getConfiguration() {
  yield* takeEvery(actions.GET_API_CONFIG, fetchConfig);
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
    getConfiguration(),
    getMovieDetails(),
  ]
};
