import React, { Component } from 'react';
import './Header.scss';

class Header extends Component {

    render() {

      return (
        <div className="header-container">
            <div className="div-content">
                <div className="header-title">
                    <p className="title-text">Increase your gaming experience</p>
                </div>
                <div className="header-subtitle">
                    <p className="subtitle-text">Brawl against anyone in the supported countries and win money. </p>
                </div>
                <div className="button-container">
                    <button className="header-button">Get early access</button>
                    <a href="#available-countries" className="header-button-link"><button className="header-button">Supported countries</button></a>
                </div>
            </div>
        </div>
      );
    }
  }
  
  export default Header;
  