import { fromJS } from 'immutable';

import * as actions from './actions';


export default function(state = fromJS({query: '', response: {results: []}}), action) {
  switch (action.type) {
    case actions.CHANGE_SEARCH_QUERY:
      return state.set('query', action.payload);
    case 'GET_MOVIES_SUCCESS':
      return state.set('response', fromJS(action.payload));
    default:
      return state;
  }
}
