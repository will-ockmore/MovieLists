import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';
import { App } from './App';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App getApiConfiguration={() => {}}/>, div);
});

it('calls getApiConfiguration on mount', () => {
  const getApiConfiguration = jest.fn();

  shallow(
    <App getApiConfiguration={getApiConfiguration} />
  );

  expect(getApiConfiguration).toHaveBeenCalled();
});
