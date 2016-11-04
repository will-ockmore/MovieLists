import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeSearchQuery } from '../redux/actions';
import './App.css';

class App extends Component {
  render() {
  const { updateQuery, query, text } = this.props;

    return (
      <div className="App">
        <div className="App-header">
          <img src="https://placekitten.com/100/100" alt="logo" />
          <h2>Movie List</h2>
        </div>
        <input type="text" value={query} onChange={e => updateQuery(e.target.value)} />
        <p className="App-intro">
          {text}
        </p>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    query: state.get('query'),
    text: state.get('text'),
    count: state.get('count')
  }
}

export default connect(
  mapStateToProps,
  {
    updateQuery: changeSearchQuery,
  }
)(App);
