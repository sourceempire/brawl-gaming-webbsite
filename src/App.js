import React, { Component } from 'react';
import Header from './components/Header/Header';
import Maps from './components/Maps/Maps';
import AvailableGames from './components/AvailableGames/AvailableGames';
import InterestForm from './components/InterestForm/InterestForm';
import './App.scss';
require('dotenv').config();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <AvailableGames />
        <Maps />
        <InterestForm />
      </div>
    );
  }
}

export default App;


// {
//   "rules": {
//     "maillist": {
//       "$id": {
//         ".read": true,
//         ".write": true,
//         ".validate": "newData.child('email').val().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$/i)"
//       }
//     }
//   }
// }