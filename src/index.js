import React from 'react';
import ReactDOM from 'react-dom';

import store from './redux/store';

export const ROOT_ROUTE = '/';


const render = () => {
  const App = require('./App').default;

  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  );
};

if (module.hot) {
  // Support hot reloading of components
  module.hot.accept('./App', () => {
    render();
  });
}

render();
