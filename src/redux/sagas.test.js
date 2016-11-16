import { takeLatest, takeEvery, delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { getArgs } from '../utils';
import { searchMovies } from '../api/search';
import { getMovie } from '../api/items';
import { getConfig, getGenres } from '../api/config';

import * as sagas from './sagas';

describe('sagas', () => {
  jest.mock('../api/search');
  jest.mock('../api/items');
  jest.mock('../api/config');

  it('makeRequestActionSet', () => {
    expect(
      sagas.makeRequestActionSet('blah')
    ).toEqual(
      {
        REQUEST: 'blahREQUEST',
        SUCCESS: 'blahSUCCESS',
        FAILURE: 'blahFAILURE',
      }
    );
  });

  xit('fetchMovieResults', () => {
    jest.useFakeTimers();

    const { searchMovies } = require('../api/search');
    searchMovies.mockImplementation(() => {results: 'the results'});

    const generator =
      sagas
        .fetchMovieResults({type: 'blah', payload: {query: 'lolol'}});
    console.log({done: false, value: call(searchMovies, 'lolol', { page: 2})}, getArgs({done: false, value: delay(400)}));

    expect(generator.next()).toEqual({done: false, value: delay(400)});
    jest.runAllTimers();
    expect(generator.next()).toEqual({done: false, value: call(searchMovies, 'lolol')});
    expect(generator.next())
      .toEqual({done: false, value: put({type: sagas.GET_MOVIES.SUCCESS, payload: 'the results'})});
    expect(generator.next()).toEqual({done: false, value: delay(500)});
    jest.runAllTimers();
    expect(generator.next()).toEqual({done: false, value: call(searchMovies, 'lolol', { page: 2})});
    expect(generator.next())
      .toEqual({done: false, value: put({type: sagas.GET_FURTHER_MOVIES.SUCCESS, payload: 'the results'})});
    expect(generator.next()).toEqual({done: false, value: call(searchMovies, 'lolol', { page: 3})});
    expect(generator.next())
      .toEqual({done: false, value: put({type: sagas.GET_FURTHER_MOVIES.SUCCESS, payload: 'the results'})});
    expect(generator.next()).toEqual({done: false, value: call(searchMovies, 'lolol', { page: 4})});
    expect(generator.next())
      .toEqual({done: false, value: put({type: sagas.GET_FURTHER_MOVIES.SUCCESS, payload: 'the results'})});
    expect(generator.next()).toEqual({done: false, value: call(searchMovies, 'lolol', { page: 5})});
    expect(generator.next())
      .toEqual({done: false, value: put({type: sagas.GET_FURTHER_MOVIES.SUCCESS, payload: 'the results'})});
    expect(generator.next()).toEqual({done: false, value: call(searchMovies, 'lolol', { page: 6})});
    expect(generator.next())
      .toEqual({done: false, value: put({type: sagas.GET_FURTHER_MOVIES.SUCCESS, payload: 'the results'})});
    expect(generator.next()).toEqual({done: false, value: call(searchMovies, 'lolol', { page: 7})});
    expect(generator.next())
      .toEqual({done: false, value: put({type: sagas.GET_FURTHER_MOVIES.SUCCESS, payload: 'the results'})});
    expect(generator.next()).toEqual({done: false, value: call(searchMovies, 'lolol', { page: 8})});
    expect(generator.next())
      .toEqual({done: false, value: put({type: sagas.GET_FURTHER_MOVIES.SUCCESS, payload: 'the results'})});
  });

});
