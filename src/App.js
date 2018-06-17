//@flow
import './App.css';

import React, { Component } from 'react';

import Board from './components/Board';
import logo from './logo.svg';

type Props = {
  // This type intentionally left blank
};

class App extends Component<Props> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Board />
      </div>
    );
  }
}

export default App;
