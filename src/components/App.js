import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeSearchQuery } from '../redux/actions';
import SearchField from './SearchField';
import ResultCard from './ResultCard';
import './App.css';

class App extends Component {
  render() {
    const { updateQuery, query, response } = this.props;

    const results = response && response.get('results');

    return (
      <div className="App">
        <div className="header row App-header box-shadow">
          <h2>Movie List.</h2>
        </div>
        <div className="body row scroll-y App-body">
          <h2>Search for a film below</h2>
          <hr className="search-break" />
          <SearchField query={query} updateQuery={updateQuery} />

          {results.map(movie =>
              <ResultCard key={movie.get('id')} movie={movie} />
          )}
        </div>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    query: state.get('query'),
    response: state.get('response'),
    count: state.get('count')
  }
}

export default connect(
  mapStateToProps,
  {
    updateQuery: changeSearchQuery,
  }
)(App);
