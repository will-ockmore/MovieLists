import React from 'react';
import { Map, fromJS } from 'immutable';
import renderer from 'react-test-renderer';

import { MOVIE_DETAILS } from '../../test/testFixtures';

import { MovieDetails, PropertyRow, mapStateToProps } from './MovieDetails';


jest.mock('react-dom');

describe('MovieDetails', () => {

  it('renders the full tree', () => {
    const tree = renderer.create(
      <MovieDetails
        details={Map({result: MOVIE_DETAILS, status: 'COMPLETE'})}
        loadDetails={jest.fn}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Loading if request is pending', () => {
    const tree = renderer.create(
      <MovieDetails
        details={Map({result: MOVIE_DETAILS, status: 'PENDING'})}
        loadDetails={jest.fn}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('calls loadDetails on mount', () => {
    const loadDetails = jest.fn();

    renderer.create(
      <MovieDetails
        params={{id: 123}}
        details={Map({result: MOVIE_DETAILS, status: 'SUCCESS'})}
        loadDetails={loadDetails}/>
    ).toJSON();

    expect(loadDetails).toHaveBeenCalledTimes(1);
  });

  it('renders PropertyRow', () => {
    const tree = renderer.create(
      <PropertyRow propertyTitle="The title">
        <span>The children</span>
      </PropertyRow>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('calls loadDetails on componentWillReceiveProps', () => {
    const loadDetails = jest.fn();

    const component = new MovieDetails({loadDetails, id: 123});

    component.componentWillReceiveProps({params: {id: 345}});
    expect(loadDetails).toHaveBeenCalledTimes(1);

    component.componentWillReceiveProps({params: {id: 678}});
    expect(loadDetails).toHaveBeenCalledTimes(2);
  });

  it('mapStateToProps', () => {
    const initialState = fromJS({
      responses: {
        movieDetails: 'details yo'
      },
      imageUrls: {
        largeBackdropUrl: 'www.cat.com'
      }
    });

    expect(
      mapStateToProps(initialState, {params: {id: 123}})
    ).toEqual(
      {id: 123, details: 'details yo', largeBackdropUrl: 'www.cat.com'}
    );
  });
});
