import React, { Component } from 'react';
import Flag from './Flag/Flag';
import * as maps from './svg-maps';

import '../../styles/_colors.scss'
import './Maps.scss';

class Maps extends Component {
	constructor(props) {
		super(props)
		this.state = {
      availableCountries: ['AU', 'AT', 'BE', 'CA', 'DK', 'FI', 'FR', 'DE', 'IE', 'IT', 'JP', 'HK', 'LU', 'NL', 'NZ', 'NO', 'PT', 'SG', 'ES', 'SE', 'CH', 'GB', 'US', 'IN', 'MX', 'BR'],
      flagsData: []
    }
    this.countryAnimation = this.countryAnmation.bind(this);
    this.createFlagData = this.createFlagData.bind(this)
  }
  
  componentDidMount() {
    this.setAvailableCountries()
    this.countryAnimation();
    this.createFlagData();
  }

  createFlagData() {
    var flagsData = []
    this.state.availableCountries.forEach(element => {
      var countryTag = document.getElementById(element)
      flagsData.push(
        {code: element, name: countryTag.attributes['name'].value}
      )
    });
    this.setState({
      flagsData: flagsData,
    })
  }

  setAvailableCountries() {
    for (var i = 0; i < this.state.availableCountries.length; i++) {
      var country = document.getElementById(this.state.availableCountries[i])
      country.style.opacity = 1;
    }
  }

  countryAnmation() {
    var countryCodes = this.state.availableCountries;
    var randCountryCode1 = countryCodes[Math.floor(Math.random()*countryCodes.length)];
    var randCountry1 = document.getElementById(randCountryCode1);
    for(var i = 0; i < randCountry1.children.length; i++) {
      randCountry1.children[i].style.fill = '#2C821F';
    }
   
    setTimeout(() => {
      for(var i = 0; i < randCountry1.children.length; i++) {
        randCountry1.children[i].style.fill = '#37392E';
      }
    }, 2000)
    setTimeout(() => {
      this.countryAnimation();
    }, 4000)
    
  }

	render() {
		return (
			<section id="available-countries">
				<div className="map-header-container">
					<p className="map-header">We Offer Our Service In These Countries</p>
          <div className="line" />
				</div>
				<div className="middle-section">
          <div className="map">
						{maps.world()}
					</div>
				</div>
				<div className="map-footer-container">
          <div className="flags-container">
            <p className="flags-header">Available in {this.state.availableCountries.length} countries world wide</p>
            <p className="flags-subheader">We expand internationally at the same rate as Stripe does, because we use their services for money transactions. Visit <a className="text-link" href="https://www.stripe.com/global">Stripe</a> for more information if you can't find your country in the list below.</p>
            <div className="line-container"><div className="line" /></div>
            <div className="flags">
              { this.state.flagsData.map((element, index) => {
                return <Flag key={index} code={element.code} name={element.name}/>
              })}
            </div>
          </div>
        </div>
			</section>
		);
	}
}

export default Maps;