import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, HashRouter } from 'react-router-dom';

import Home from './components/Home/Home'
import Registration from './components/Registration/Registration'
import Navigation from './components/Navigation/Navigation'

import './App.scss';
import './styles/reset.scss';

class App extends Component {
  render() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div className="app">
            <Switch>
              <Route path='/' component={Home} exact/>
              <Route path='/registration' component={Registration} exact/>
              <Route component={() => (<div>404 Not found </div>)} />
            </Switch>
          </div>
        </BrowserRouter>
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
