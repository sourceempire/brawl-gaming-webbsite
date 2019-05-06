import React, { Component } from 'react';
import './Header.scss';

class Header extends Component {

    render() {
      return (
        <div className="header-container">
            <div className="div-content">
                <img className="icon" src="/brawl-logo-keyboard.png" />
                <img className="logo" src="/brawl-gaming-logo-colored.png" />
                <div className="header-title">
                </div>
                <div className="header-subtitle">
                </div>
            </div>
        </div>
      );
    }
  }

  export default Header;
