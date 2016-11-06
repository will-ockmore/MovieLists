import React from 'react';
import { connect } from 'react-redux';

import { changeSearchQuery, getApiConfiguration } from '../redux/actions';

import SearchField from './SearchField';
import CardList from './CardList';

export const MovieSearch = props => {
  const { updateQuery, query, response, baseBackdropUrl } = props;

  const results = response.get('results');

  return (
    <div>
      <h2>Search for a film below</h2>
      <hr className="search-break" />
      <SearchField query={query} updateQuery={updateQuery} />
      <CardList results={results} baseBackdropUrl={baseBackdropUrl} />
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    query: state.get('query'),
    response: state.getIn(['responses', 'movies']),
    baseBackdropUrl: state.get('baseBackdropUrl')
  }
}

export default connect(
  mapStateToProps,
  {
    updateQuery: changeSearchQuery,
    getApiConfiguration
  }
)(MovieSearch);
