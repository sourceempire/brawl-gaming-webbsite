import React, { Component } from 'react';

import './AppPreview.scss';

class AppPreview extends Component {
    render() {
	    return (
          <div className="app-preview">
            <h1 className="title-text">Increase your gaming experience</h1>
            <p className="description">Play your favorite game and compete for money. Matching with other players, transfer money directly after match and setting up game matches, all automated through our platform.</p>
            <div className="screenshots">
              <img className="screenshot" src="/app-start.png" />
              <img className="screenshot" src="/app-lobby.png" />
            </div>
            <p className="description">Currently in beta. Stay tuned for public release soon.</p>
          </div>
		)
	}
}

export default AppPreview;
