import { createStore } from 'redux';

import rootReducer from './rootReducer';


const store = createStore(rootReducer);

store.dispatch({
  type: 'CREATED'
});

export default store;
