import React, { Component } from 'react';
import classes from './Login.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
            <div className={classes.Login}>
                {authRedirect}
                <form>
                    <h2>Account Login</h2>
                    <div>
                        <input type="text" name="username" placeholder="Username" onChange={this.inputHandler} />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Password" autoComplete="false" onChange={this.inputHandler} />
                    </div>
                    <div>
                        <button type="button" onClick={this.loginHandler}>Sign in</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.auth(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);