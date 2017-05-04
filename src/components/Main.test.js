import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';
import { Main } from './Main';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Main getApiConfiguration={() => {}} />, div);
});

it('calls getApiConfiguration on mount', () => {
  const getApiConfiguration = jest.fn();

  shallow(<Main getApiConfiguration={getApiConfiguration} />);

  expect(getApiConfiguration).toHaveBeenCalled();
});
