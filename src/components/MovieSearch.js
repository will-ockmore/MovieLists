import React from 'react';
import { connect } from 'react-redux';

import { isInGenre, isInDecade } from '../utils';
import { changeSearchQuery, getApiConfiguration } from '../redux/actions';

import SearchField from './SearchField';
import SearchFilters from './SearchFilters';
import CardList from './CardList';

export const MovieSearch = props => {
  const {
    updateQuery,
    query,
    results,
    smallBackdropUrl,
    decadeFilterValue,
    genreFilterValue,
    genres,
  } = props;

  const displayedResults = results
    .filter(movie => isInDecade(movie, decadeFilterValue))
    .filter(movie => isInGenre(movie, genreFilterValue, genres));

  return (
    <div>
      <h2>Search for a film below</h2>
      <hr className="search-break" />
      <SearchField query={query} updateQuery={updateQuery} />
      <SearchFilters />
      <CardList
        results={displayedResults}
        smallBackdropUrl={smallBackdropUrl}
      />
    </div>
  );
};

export function mapStateToProps(state) {
  return {
    query: state.get('query'),
    results: state.getIn(['responses', 'movies', 'results']),
    smallBackdropUrl: state.getIn(['imageUrls', 'smallBackdropUrl']),
    decadeFilterValue: state.getIn(['filters', 'decade']),
    genreFilterValue: state.getIn(['filters', 'genre']),
    genres: state.get('genres'),
  };
}

export default connect(mapStateToProps, {
  updateQuery: changeSearchQuery,
  getApiConfiguration,
})(MovieSearch);
