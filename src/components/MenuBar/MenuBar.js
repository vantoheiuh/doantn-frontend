import React, { Component } from 'react';
import MenuItem from './MenuItem/MenuItem';
import classes from './MenuBar.css';


class MenuBar extends Component {


    render() {
        return (
            <div className={classes.MenuBar}>
                <ul>
                    <MenuItem link="/admin">HOME HOME</MenuItem>
                    <MenuItem link="/">HOME HOME</MenuItem>
                    <MenuItem link="/">HOME HOME</MenuItem>
                    <MenuItem link="/">HOME HOME</MenuItem>
                </ul>
            </div>
        )
    }
}

export default MenuBar;