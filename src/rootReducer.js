import { Map } from 'immutable';

import * as actions from './actions';


export default function(state = Map(), action) {
  switch (action.type) {
    case 'CREATED':
      return state.set('hello', 'world');
    default:
      return state;
  }
}
