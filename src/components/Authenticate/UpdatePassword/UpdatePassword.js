import React, { Component } from 'react';
import classes from './UpdatePassword.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import axios from 'axios';

class UpdatePassword extends Component {

    state = {
        dataForm: {
            currentPassword: null,
            newPassword: null,
            confirmPassword: null
        },
        isSuccess: false,
        isFailed: false
    }

    inputHandler = (event, inputName) => {
        const updatedDataForm = { ...this.state.dataForm };
        let updatedDataEmelent = { ...updatedDataForm[inputName] };
        updatedDataEmelent = event.target.value;
        updatedDataForm[inputName] = updatedDataEmelent;
        this.setState({
            dataForm: updatedDataForm
        });
        console.log(this.state.dataForm)
    }
    submitUpdateHandler = () => {
        let checkData = {
            username: this.props.username,
            password: this.state.dataForm.currentPassword,
        }
        axios.post('/api/users/authenticate', checkData)
            .then(res => {
                localStorage.setItem("token", res.data.token);
                if (this.state.dataForm.newPassword === this.state.dataForm.confirmPassword) {
                    const dataUpdate = {
                        id: this.props.id,
                        password: this.state.dataForm.newPassword
                    }
                    this.props.onUpdateUserById(dataUpdate, this.props.token);
                }
                this.setState({ isSuccess: true });
            }).catch(err => {
                console.log("Wrong password");
                this.setState({ isFailed: true });
            })
    }
    render() {

        return (
            <div className={classes.UpdatePassword}>
                <form className={classes.FormUpdate}>
                    <h3>Update Password</h3>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" placeholder={this.props.username} disabled />
                    </div>
                    <div>
                        <label htmlFor="currentPassword">Current Password:</label>
                        <input onChange={(event) => this.inputHandler(event, "currentPassword")} type="password" id="currentPassword" placeholder="Current Password" />
                    </div>
                    <div>
                        <label htmlFor="newPassword">New Password:</label>
                        <input onChange={(event) => this.inputHandler(event, "newPassword")} name="newPassword" type="password" id="newPassword" placeholder="New password" />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input onChange={(event) => this.inputHandler(event, "confirmPassword")} type="password" id="confirmPassword" placeholder="Confirm Password" />
                    </div>
                    
                    <div className={classes.BtnGroup}>
                        <button type="reset" className="btn btn-danger" onClick={this.props.btnClicked}>Cancel</button>
                        <button onClick={this.submitUpdateHandler} type="reset" className="btn btn-primary">Save</button>
                    </div>
                    {
                        this.state.isSuccess ? <p style={{'color': 'green'}}>Change password successfully!</p> : this.state.isFailed ? <p style={{ 'color': 'red' }}>Failed! Please try again!</p> : null
                    }
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        username: state.auth.userName,
        id: state.auth.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateUserById: (updateData, token) => dispatch(actions.updateUser(updateData, token)),
        onAuth: (username, password) => dispatch(actions.auth(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);