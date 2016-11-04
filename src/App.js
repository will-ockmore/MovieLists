import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, incrementAsync } from './actions';

import './App.css';

class App extends Component {
  render() {
  const { incrementCounter, incrementCounterAsync, count } = this.props;

    return (
      <div className="App">
        <div className="App-header">
          <img src="https://placekitten.com/100/100" alt="logo" />
          <h2>Movie List</h2>
        </div>
        <button onClick={incrementCounter}>
          Increment
        </button>
        <button onClick={incrementCounterAsync}>
          Increment Async
        </button>
        <p className="App-intro">
          {count}
        </p>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    count: state.get('count')
  }
}

export default connect(
  mapStateToProps,
  {
    incrementCounter: increment,
    incrementCounterAsync: incrementAsync
  }
)(App);
