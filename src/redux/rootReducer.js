import { Map } from 'immutable';

import * as actions from './actions';


export default function(state = Map({query: '', text: ''}), action) {
  switch (action.type) {
    case actions.CHANGE_SEARCH_QUERY:
      return state.set('query', action.payload);
    case 'CHANGE_IT':
      return state.set('text', action.payload);
    default:
      return state;
  }
}
