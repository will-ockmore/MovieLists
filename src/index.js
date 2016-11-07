import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import App from './components/App';
import MovieSearch from './components/MovieSearch';
import MovieDetails from './components/MovieDetails';
import store from './redux/store';
import './index.css';

export const ROOT_ROUTE = process.env.NODE_ENV === 'development' ? '/' : '/MovieLists/';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={ROOT_ROUTE} component={App}>
        <IndexRoute component={MovieSearch} />
        <Route path="/:id" component={MovieDetails} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
