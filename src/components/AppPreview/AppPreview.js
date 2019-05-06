import React, { Component } from 'react';

import './AppPreview.scss';

class AppPreview extends Component {
    render() {
	    return (
          <div className="app-preview">
            <h1 className="title-text">Increase your gaming experience</h1>
            <p className="description">Match with other players and compete for money. All automated through our platform. Launching matches through our app, transfering money directly to your account when match finishes.</p>
            <img className="screenshot" src="/app-start.png" />
            <img className="screenshot" src="/app-lobby.png" />
            <p className="description">You play to win money, we automated everything else.</p>
          </div>
		)
	}
}

export default AppPreview;
