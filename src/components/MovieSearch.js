import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { changeSearchQuery, getApiConfiguration } from '../redux/actions';

import SearchField from './SearchField';
import SearchFilters from './SearchFilters';
import CardList from './CardList';

export const MovieSearch = props => {
  const { updateQuery, query, results, groupedResults, smallBackdropUrl, decadeFilterValue } = props;

  const displayedResults = decadeFilterValue ? groupedResults.get(decadeFilterValue, List()) : results;

  console.log(groupedResults.toJS());

  return (
    <div>
      <h2>Search for a film below</h2>
      <hr className="search-break" />
      <SearchField query={query} updateQuery={updateQuery} />
      <SearchFilters />
      <CardList results={displayedResults} smallBackdropUrl={smallBackdropUrl} />
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    query: state.get('query'),
    results: state.getIn(['responses', 'movies', 'results']),
    groupedResults: state.getIn(['responses', 'movies', 'groupedResults']),
    smallBackdropUrl: state.getIn(['imageUrls', 'smallBackdropUrl']),
    decadeFilterValue: state.getIn(['filters', 'decade', 'filterValue'])
  }
}

export default connect(
  mapStateToProps,
  {
    updateQuery: changeSearchQuery,
    getApiConfiguration
  }
)(MovieSearch);
