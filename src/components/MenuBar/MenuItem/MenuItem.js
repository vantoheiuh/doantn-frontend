import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './MenuItem.css';

const menuItem = (props) => {
    return (
        <li onClick={props.clicked} className={classes.MenuItem}>
            <NavLink to={props.link} exact={props.exact} >{props.children}</NavLink>
        </li>
    );
}

export default menuItem;