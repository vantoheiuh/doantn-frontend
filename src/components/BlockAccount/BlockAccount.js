import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import classes from './BlockAccount.css'

class BlockAccount extends Component{
    render(){
        return <div className={classes.BlockAccount}>
        <p style={{color: 'red', fontSize: '25px'}}>Tài khoản của bạn đã bị khoá. Vui lòng liên hệ quản lí để biết thêm thông tin.</p>
        <button className="btn btn-danger" onClick={this.props.onLogout}>Đăng xuất</button>
    </div>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.authLogout())
    }
}

export default connect(null,mapDispatchToProps)(BlockAccount);