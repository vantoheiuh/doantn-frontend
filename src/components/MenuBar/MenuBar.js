import React, { Component } from 'react';
import MenuItem from './MenuItem/MenuItem';
import classes from './MenuBar.css';
import { connect } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


class MenuBar extends Component {


    render() {
        return (
            <div className={classes.MenuBar}>
                <div>
                    <h5> <AccountCircleIcon htmlColor="gray" fontSize="large" />  Hi, {this.props.userName} </h5>
                    <span> <FiberManualRecordIcon fontSize="small" htmlColor="green"/> Online</span>
                </div>
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

const mapStateToProps = state => {
    return {
        userName: state.auth.userName
    }
}

export default connect(mapStateToProps)(MenuBar);