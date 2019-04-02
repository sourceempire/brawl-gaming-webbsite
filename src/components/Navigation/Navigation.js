import React,{ Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

import './Navigation.scss'

class Navigation extends Component {
    render() {
        return (
            <nav className="navigation">
                <div className="navigation-container">
                    <NavLink to="/" className="navigation-logo-container">
                        <img src="" className="navigation-logo" />
                    </NavLink>
                    <div className="navigation-links">
                        <ul className="navigation-item-wrapper">
                            {/*<li className="navigation-item" ><NavLink to="/" activeClassName='is-active' style={{ textDecoration: 'none' }}><p className="navbar-text">HOME</p></NavLink></li>
                            <li className="navigation-item"><NavLink to="/registration" activeClassName='is-active' style={{ textDecoration: 'none' }}><p className="navbar-text">REGISTER</p></NavLink></li>*/}
                            <li className="navigation-item"><p className="navbar-text">EARLY ACCESS</p></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navigation;