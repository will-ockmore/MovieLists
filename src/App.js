import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="https://placekitten.com/100/100" alt="logo" />
          <h2>Movie List</h2>
        </div>
        <p className="App-intro">
          {this.props.hi}
        </p>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  console.log(state && state.toJS())
  return {
    hi: state.get('hello')
  }
}

export default connect(mapStateToProps)(App);
