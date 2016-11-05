import { fromJS } from 'immutable';

import * as actions from './actions';

const initialState = fromJS({
  query: '',
  response: {results: []},
  basePosterUrl: ''
})

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.CHANGE_SEARCH_QUERY:
      return state.set('query', action.payload);
    case 'GET_MOVIES_SUCCESS':
      return state.set('response', fromJS(action.payload));
    case 'GET_POSTER_URL_SUCCESS':
      return state.set('basePosterUrl', fromJS(action.payload));
    default:
      return state;
  }
}
