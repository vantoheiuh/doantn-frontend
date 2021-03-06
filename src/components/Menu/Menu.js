import React, { Component } from 'react';
import classes from './Menu.css';
import { connect } from 'react-redux';
import MenuItem from '../MenuBar/MenuItem/MenuItem';
import DevicesIcon from '@material-ui/icons/Devices';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

class Menu extends Component {
    state = {
        showSub: false
    }
    componentDidMount() {
        this.setState({ showSub: false })
    }

    subMenuHandler = () => {
        this.setState({ showSub: !this.state.showSub });
    }
    closeSubHandler = () => {
        this.setState({ showSub: false });
    }


    render() {

        return (
            <header className={classes.Menu}>
                <nav>
                    <ul>
                        <div>
                            <MenuItem logo="true" link="/"><DevicesIcon fontSize="large" /> Device Manager</MenuItem>
                        </div>

                        <div className={classes.SubMenu}>
                            {this.props.status !== "active" ? null : this.props.isAuthenticate ?
                                <div>
                                    <span onClick={this.subMenuHandler}><ArrowDropDownIcon /></span>
                                    <div style={{
                                        display: this.state.showSub ? 'block' : 'none'
                                    }}>
                                        <ul>
                                            <MenuItem clicked={this.closeSubHandler} link="/update-user-detail">Thay đổi thông tin</MenuItem>
                                            <MenuItem clicked={this.closeSubHandler} link="/update-password">Đổi mật khẩu</MenuItem>
                                            <MenuItem clicked={this.closeSubHandler} link="/logout">Đăng xuất</MenuItem>
                                        </ul>
                                    </div>
                                </div>
                                : <div className={classes.Login}><MenuItem link="/login">Đăng nhập</MenuItem></div>
                            }
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
        role: state.auth.role,
        status: state.auth.status
    }
}

export default connect(mapStateToProps)(Menu);