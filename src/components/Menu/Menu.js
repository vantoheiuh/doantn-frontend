import React, { Component } from 'react';
import classes from './Menu.css';
import { connect } from 'react-redux';
import MenuItem from '../MenuBar/MenuItem/MenuItem';
import DevicesIcon from '@material-ui/icons/Devices';

class Menu extends Component {
    render() {
        return (
            <header className={classes.Menu}>
                <nav>
                    <ul>
                        <div>
                            <MenuItem link="/"><DevicesIcon fontSize="large" /> Dash board</MenuItem>
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