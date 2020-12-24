import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import classes from './MenuItem.css';

const menuItem = (props) => {
    return (
        <li onClick={props.clicked} className={classes.MenuItem}>
            {props.link === "/" && props.logo !== "true" ?
                <NavLink activeStyle={{ color: 'blue' }} exact to={props.link} >{props.children}</NavLink>
                : props.logo === "true"
                    ? <Link path={props.link} >{props.children}</Link>
                    : <NavLink activeStyle={{ color: 'blue' }} to={props.link} >{props.children}</NavLink>
            }
        </li>
    );
}

export default menuItem;