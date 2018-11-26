import React, { Component } from 'react';
import Maps from './components/Maps/Maps';
import AvailableGames from './components/AvailableGames/AvailableGames';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AvailableGames />
        <Maps />
      </div>
    );
  }
}

export default App;