import { Map } from 'immutable';

import * as actions from './actions';


export default function(state = Map({count: 0}), action) {
  switch (action.type) {
    case actions.INCREMENT:
      return state.update('count', count => count + 1);
    default:
      return state;
  }
}
