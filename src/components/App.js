import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeSearchQuery, getApiConfiguration } from '../redux/actions';
import SearchField from './SearchField';
import ResultCard from './ResultCard';
import './App.css';

class App extends Component {
  componentWillMount() {
    this.props.getApiConfiguration();
  }

  render() {
    const { updateQuery, query, response, basePosterUrl } = this.props;

    const results = response.get('results');

    console.log(results.toJS());

    return (
      <div className="App">
        <div className="header row App-header box-shadow">
          <h2>Movie List.</h2>
        </div>
        <div className="body row scroll-y App-body">
          <h2>Search for a film below</h2>
          <hr className="search-break" />
          <SearchField query={query} updateQuery={updateQuery} />
          <div className="card-container">
            {results.map(movie =>
                <ResultCard
                  key={movie.get('id')}
                  movie={movie}
                  basePosterUrl={basePosterUrl}/>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    query: state.get('query'),
    response: state.get('response'),
    count: state.get('count'),
    basePosterUrl: state.get('basePosterUrl')
  }
}

export default connect(
  mapStateToProps,
  {
    updateQuery: changeSearchQuery,
    getApiConfiguration
  }
)(App);
