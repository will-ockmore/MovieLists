import React from 'react';
import { Map } from 'immutable';
import { shallow } from 'enzyme';

import { MOVIE_DETAILS } from '../../test/testFixtures';

import { Loading } from './Loading';
import { MovieDetails, PropertyRow } from './MovieDetails';


describe('MovieDetails shallow rendering', () => {

  it('calls loadDetails on mount', () => {
    const loadDetails = jest.fn();
    shallow(
      <MovieDetails
        details={Map({result: MOVIE_DETAILS, status: 'COMPLETE'})}
        loadDetails={loadDetails}/>
    );

    expect(loadDetails).toHaveBeenCalled();
  });

  it('renders Loading if request is pending', () => {
    const wrapper = shallow(
      <MovieDetails
        details={Map({result: MOVIE_DETAILS, status: 'PENDING'})}
        loadDetails={jest.fn}/>
    );

    expect(wrapper.find(Loading).length).toBe(1);
  });
});
