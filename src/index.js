import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import App from './components/App';
import MovieSearch from './components/MovieSearch';
import MovieDetails from './components/MovieDetails';
import store from './redux/store';
import './index.css';


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={MovieSearch} />
        <Route path="/:id" component={MovieDetails} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
