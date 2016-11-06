import { fromJS } from 'immutable';

import * as actions from './actions';
import * as sagaActions from './sagas';

const initialState = fromJS({
  query: '',
  responses: {
    movies: {results: []},
    movieDetails: { status: '', result: {}}
  },
  baseBackdropUrl: ''
})

export const responseStates = {
  SUCCESS: 'SUCCESS',
  PENDING: 'PENDING',
  FAILED: 'FAILED',
}

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.CHANGE_SEARCH_QUERY:
      return state.set('query', action.payload);
    case sagaActions.GET_MOVIES.SUCCESS:
      return state.setIn(['responses', 'movies'], fromJS(action.payload));
    case sagaActions.GET_MOVIE_DETAILS.REQUEST:
      return state
        .setIn(['responses', 'movieDetails', 'status'], responseStates.PENDING);
    case sagaActions.GET_MOVIE_DETAILS.SUCCESS:
      return state
        .setIn(['responses', 'movieDetails', 'result'], fromJS(action.payload))
        .setIn(['responses', 'movieDetails', 'status'], responseStates.SUCCESS);
    case sagaActions.GET_BACKDROP_URL.SUCCESS:
      return state.set('baseBackdropUrl', fromJS(action.payload));
    default:
      return state;
  }
}
