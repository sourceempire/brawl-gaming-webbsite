import React, { Component } from 'react';

import InterestForm from '../InterestForm/InterestForm';
import RegistrationForm from '../Registration/RegistrationForm/RegistrationForm';
import Navigation from '../Navigation/Navigation';

import './Registration.scss';

class Registration extends Component {
	render() {
		return (
            <React.Fragment>
            <Navigation/>
      <div className="registration-container">
        <div className="registration-container-inner">
            <div className="registration-container-content">
            <div className="registration-header"><h1>REGISTER</h1></div>
            <div className="registration-text"><p>Why join Brawl Gaming?</p></div>
            <div className="registration-info-box">
                <div className="registration-info-box-text">
                    <p>Ready up and join the Brawl Gaming Community</p>
                    <p>Bet with or against your friends</p>
                    <p>Brawl for the pot</p>
                </div>
            </div>
        </div>
    </div>
        <div className="registration-container-form">
            <RegistrationForm/>
        </div>
      </div>
      </React.Fragment>
		)
	}
}

export default Registration;
