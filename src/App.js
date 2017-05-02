import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import Main from './components/Main';
import MovieSearch from './components/MovieSearch';
import MovieDetails from './components/MovieDetails';
import './index.css';
import { ROOT_ROUTE } from './index.js';


export const App = ({ store }) =>
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={ROOT_ROUTE} component={Main}>
        <IndexRoute component={MovieSearch} />
        <Route path={`${ROOT_ROUTE}:id`} component={MovieDetails} />
      </Route>
    </Router>
  </Provider>;

export default App;
