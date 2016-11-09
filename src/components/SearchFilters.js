import React from 'react';
import { connect } from 'react-redux';

import { changeDecadeFilter, changeGenreFilter } from '../redux/actions';


export const SearchFilters = ({
  decadeFilterValue, genreFilterValue, onDecadeFilterChange,
  onGenreFilterChange, decades, resultGenres
}) =>
  <div className="filter-card">
    <select
      className="mr-1"
      onChange={e => onDecadeFilterChange(e.target.value)}
      value={decadeFilterValue}>
      <option value="">Filter by decade&hellip;</option>
      {decades.map((_, decade) =>
        decade && <option key={decade} value={decade}>The '{decade.charAt(2)}0s</option>
      )}
    </select>
    <select
      className="ml-1"
      onChange={e => onGenreFilterChange(e.target.value)}
      value={genreFilterValue}>
      <option value="">Filter by genre&hellip;</option>
      {resultGenres.map((_, genre) =>
        genre && <option key={genre} value={genre}>{genre}</option>
      )}
    </select>
  </div>;

export function mapStateToProps(state) {
  return {
    decades: state.getIn(['responses', 'movies', 'decades']),
    resultGenres: state.getIn(['responses', 'movies', 'resultGenres']),
    decadeFilterValue: state.getIn(['filters', 'decade']),
    genreFilterValue: state.getIn(['filters', 'genre'])
  }
}

export default connect(
  mapStateToProps,
  {
    onDecadeFilterChange: changeDecadeFilter,
    onGenreFilterChange: changeGenreFilter,
  }
)(SearchFilters);



