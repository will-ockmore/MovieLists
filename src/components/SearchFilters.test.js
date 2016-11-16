import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';

import { DECADES, GENRES } from '../../test/testFixtures';

import { SearchFilters, mapStateToProps } from './SearchFilters';


describe('SearchFilters', () => {

  it('renders', () => {
    const wrapper = mount(
      <SearchFilters
        query="query"
        decadeFilterValue=""
        genreFilterValue=""
        decades={DECADES}
        resultGenres={GENRES}/>
    );

    expect(wrapper.find('.filter-card').length).toBe(1);
    expect(wrapper.find('select').length).toBe(2);
    expect(wrapper.find('option').map(node => node.text())).toContain(`The '60s`);
    expect(wrapper.find('option').map(node => node.text())).toContain(GENRES.first());
  });

  it('calls onChange functions', () => {
    const onDecadeFilterChange = jest.fn();
    const onGenreFilterChange = jest.fn();

    const wrapper = mount(
      <SearchFilters
        query="query"
        onDecadeFilterChange={onDecadeFilterChange}
        onGenreFilterChange={onGenreFilterChange}
        decadeFilterValue=""
        genreFilterValue=""
        decades={DECADES}
        resultGenres={GENRES}/>
    );

    wrapper.find('select').forEach(node => node.simulate('change'));

    expect(onDecadeFilterChange).toHaveBeenCalled();
    expect(onGenreFilterChange).toHaveBeenCalled();
  });

  it('mapStateToProps', () => {
    const initialState = fromJS({
      query: 'bleh',
      responses: {
        movies: {
          resultGenres: 'all the genres',
          decades: 'all the decades',
        }
      },
      filters: {
        decade: 'the decade',
        genre: 'the genre',
      }
    });

    expect(mapStateToProps(initialState, {params: {id: 123}}))
    .toEqual(
      {
        query: 'bleh',
        decades: 'all the decades',
        resultGenres: 'all the genres',
        decadeFilterValue: 'the decade',
        genreFilterValue: 'the genre',
      }
      );
    });
});
