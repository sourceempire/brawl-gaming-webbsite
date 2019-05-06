import React, { Component } from 'react';

import Header from '../Header/Header';
import Maps from '../Maps/Maps';
import AvailableGames from '../AvailableGames/AvailableGames';
import InterestForm from '../InterestForm/InterestForm';
import AppPreview from '../AppPreview/AppPreview';
import Footer from '../Footer/Footer';

import './Home.scss';

class Home extends Component {
    render() {
	    return (
            <React.Fragment>
                 <Header />
                 <AppPreview />
                 <AvailableGames/>
                 <Footer />
                 {/*<InterestForm/>*/}
                 {/*<Maps />*/}
            </React.Fragment>
		)
	}
}

export default Home;
