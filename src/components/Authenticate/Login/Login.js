import React, { Component } from 'react';
import classes from './Login.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';
import Aux from '../../../hoc/Auxi/Auxi';
import Footer from '../../UI/Footer/Footer';

class Login extends Component {
    state = {
        username: '',
        password: ''
    }
    inputHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    loginHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.username, this.state.password);
    }

    render() {
        const authRedirect = this.props.isAuthenticated ? <Redirect to="/" /> : null;
        return (
            <Aux>
                <div className={classes.Login}>
                    {authRedirect}
                    <form>
                        <h2>Đăng nhập tài khoản</h2>
                        <div>
                            <span><PersonIcon /></span>
                            <input type="text" name="username" placeholder="Tên đăng nhập" onChange={this.inputHandler} />
                        </div>
                        <div>
                            <span><VpnKeyIcon /></span>
                            <input type="password" name="password" placeholder="Mật khẩu" autoComplete="false" onChange={this.inputHandler} />
                        </div>
                        {this.props.err ? <div className={classes.ErrorLogin}>
                            <p>Tên đăng nhập hoặc mật khẩu không đÚng. Vui lòng thử lại!</p>
                        </div> : null}
                        <div>
                            <button type="button" onClick={this.loginHandler}>Đăng nhập</button>
                        </div>
                    </form>
                </div>
                <div className={classes.Footer}>
                    <Footer />
                </div>
            </Aux>

        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        err: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.auth(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);