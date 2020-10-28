import React, { Component } from 'react';
import MenuItem from './MenuItem/MenuItem';
import classes from './MenuBar.css';


class MenuBar extends Component {


    render() {
        return (
            <div className={classes.MenuBar}>
                <ul>
                    <MenuItem link="/users">Manage Users</MenuItem>
                    <MenuItem link="/products">Manage Product</MenuItem>
                    <MenuItem link="/new-device">New Product</MenuItem>
                    <MenuItem link="/">HOME HOME</MenuItem>
                </ul>
            </div>
        )
    }
}

export default MenuBar;