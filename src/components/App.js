import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { ROOT_ROUTE } from '../index.js';
import { getApiConfiguration } from '../redux/actions';

import './App.css';

export class App extends Component {

  componentWillMount() {
    this.props.getApiConfiguration();
  }

  render() {
    const { children } = this.props;

    return (
      <div className="App">
        <Link to={ROOT_ROUTE}>
          <div className="header row App-header">
            <h2 id="header-title">Movie List.</h2>
          </div>
        </Link>
        <div className="body row scroll-y App-body">
          {children}
        </div>
      </div>
    );
  }
}

export default connect(null, { getApiConfiguration })(App);
