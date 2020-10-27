import React, { Component } from 'react';
import classes from './Menu.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import Aux from '../../hoc/Aux/Aux';
import MenuItem from '../MenuBar/MenuItem/MenuItem';

class Menu extends Component {
    render() {
        return (
            <header className={classes.Menu}>
                <nav>
                    <ul>
                        <div>
                            <MenuItem link="/">Device Manager</MenuItem>
                        </div>
                        <div>
                            {this.props.isAuthenticate ?
                                <MenuItem link="/logout">LOGOUT</MenuItem>
                                : <MenuItem link="/login">LOGIN</MenuItem>}
                        </div>
                    </ul>
                </nav>
            </header>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticate: state.auth.token !== null,
        role: state.auth.role
    }
}

export default connect(mapStateToProps)(Menu);