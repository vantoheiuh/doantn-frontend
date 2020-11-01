import React, { Component } from 'react';
import MenuItem from './MenuItem/MenuItem';
import classes from './MenuBar.css';
import { connect } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { NavLink } from 'react-router-dom';
import GroupIcon from '@material-ui/icons/Group';
import SettingsCellIcon from '@material-ui/icons/SettingsCell';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PageviewIcon from '@material-ui/icons/Pageview';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';


class MenuBar extends Component {
    state = {
        classSubs: "SubMenu-root",
        isDown: true
    }

    showSubMenuHandler = () => {
        if (this.state.classSubs === "SubMenu-collapse") {
            this.setState({ classSubs: "SubMenu-root", isDown: true })
        } else {
            this.setState({ classSubs: "SubMenu-collapse", isDown: false })
        }
    }
    render() {
        return (
            <div className={classes.MenuBar}>
                <div>
                    <h5> <AccountCircleIcon htmlColor="gray" fontSize="large" />  Hi, {this.props.userName} </h5>
                    <span> <FiberManualRecordIcon fontSize="small" htmlColor="green" /> Online</span>
                </div>
                <ul>
                    <MenuItem link="/"><DashboardIcon /> DashBoard</MenuItem>
                    <MenuItem link="/users"> <GroupIcon /> Manage Users</MenuItem>
                    <MenuItem link="/products"><SettingsCellIcon /> Manage Product</MenuItem>
                    <MenuItem link="/new-device"><AddCircleIcon /> New Product</MenuItem>
                    <li>
                        <div className={classes.DropDownMenu} onClick={this.showSubMenuHandler}>
                            <NavLink to="#" ><PageviewIcon /> Thong ke san pham</NavLink>
                            <span>{this.state.isDown ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}</span>
                        </div>
                        <ul className={classes[this.state.classSubs]}>
                            <MenuItem link="/thongke/baotri">Bao Tri</MenuItem>
                            <MenuItem link="/thongke/room">Room</MenuItem>
                            <MenuItem link="/thongke/liquid">Thanh li</MenuItem>
                        </ul>
                    </li>
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