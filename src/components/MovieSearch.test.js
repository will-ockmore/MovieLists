import React from 'react';
import { List, Range, fromJS } from 'immutable';
import { shallow } from 'enzyme';

import { MOVIE } from '../../test/testFixtures';
import SearchField from './SearchField';
import SearchFilters from './SearchFilters';
import CardList from './CardList';

import { MovieSearch, mapStateToProps } from './MovieSearch';

describe('MovieSearch', () => {
  const results = List(Range(0, 8)).map(i => MOVIE.merge({ id: `${i}` }));

  it('renders', () => {
    const wrapper = shallow(<MovieSearch results={results} query="bleh" />);

    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h2').text()).toContain('Search for a film below');
    expect(wrapper.find(SearchField).length).toBe(1);
    expect(wrapper.find(SearchFilters).length).toBe(1);
    expect(wrapper.find(CardList).length).toBe(1);
  });

  it('mapStateToProps', () => {
    const initialState = fromJS({
      query: 'bleh',
      responses: {
        movies: {
          results: 'some results',
        },
      },
      imageUrls: {
        smallBackdropUrl: 'small backdrop',
      },
      filters: {
        decade: 'the decade filter',
        genre: 'the genre filter',
      },
      genres: 'some genres',
    });

    expect(mapStateToProps(initialState)).toEqual({
      query: 'bleh',
      results: 'some results',
      smallBackdropUrl: 'small backdrop',
      decadeFilterValue: 'the decade filter',
      genreFilterValue: 'the genre filter',
      genres: 'some genres',
    });
  });
});
