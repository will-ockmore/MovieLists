import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeSearchQuery } from '../redux/actions';
import './App.css';

class App extends Component {
  render() {
    const { updateQuery, query, response } = this.props;

    const results = response && response.get('results');

    console.log(results && results.toJS())

    return (
      <div className="App">
        <div className="header row App-header box-shadow">
          <h2>Movie List.</h2>
        </div>
        <div className="body row scroll-y App-body">
          <h2>Search for a film below</h2>
          <hr className="search-break" />
          <div className="search-input">
            <input type="text" value={query} onChange={e => updateQuery(e.target.value)} />
          </div>

          {results && results.map(movie =>
              <p className="App-intro">{movie.get('title')}</p>
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
