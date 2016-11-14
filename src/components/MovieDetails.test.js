import React from 'react';
import { Map } from 'immutable';
import renderer from 'react-test-renderer';

import { MOVIE_DETAILS } from '../../test/testFixtures';

import { MovieDetails, PropertyRow } from './MovieDetails';

describe('MovieDetails', () => {

  jest.mock('react-dom');

  it('renders the full tree', () => {
    const tree = renderer.create(
      <MovieDetails
        details={Map({result: MOVIE_DETAILS, status: 'COMPLETE'})}
        loadDetails={jest.fn}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders PropertyRow', () => {
    const tree = renderer.create(
      <PropertyRow propertyTitle="The title">
        <span>The children</span>
      </PropertyRow>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
