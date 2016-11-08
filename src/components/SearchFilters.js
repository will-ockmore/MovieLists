import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeDecadeFilter } from '../redux/actions';


export const SearchFilters = ({ decadeFilterValue, groupedResults, onDecadeFilterChange }) =>
  <div className="filter-card">
    <select
      onChange={e => onDecadeFilterChange(e.target.value)}
      value={decadeFilterValue}>
      <option value="">Filter by decade&hellip;</option>
      {groupedResults.map((_, decade) =>
        decade && <option value={decade}>The '{decade}0s</option>
      )}
    </select>
  </div>;

export function mapStateToProps(state) {
  return {
    groupedResults: state.getIn(['responses', 'movies', 'groupedResults']),
    decadeFilterValue: state.getIn(['filters', 'decade', 'filterValue'])
  }
}

export default connect(mapStateToProps, {onDecadeFilterChange: changeDecadeFilter})(SearchFilters);



