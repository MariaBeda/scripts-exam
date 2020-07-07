import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Router} from './Router';

class Layout extends Component {
    render() {
        return (
            <div className="Layout">
                <div className="Layout__nav">
                    <h class="custom-colored-h">Beda1030</h>
                    <NavLink to='/shops' exact>Home</NavLink>
                    <NavLink to='/'>Info</NavLink>
                </div>
                <div className="Layout__content">
                    <Router />
                </div>
            </div>
        );
    }
}

export default Layout;