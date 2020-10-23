import React, { Component } from 'react';
import classes from './EditModal.css';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import Spinner from '../../../UI/Spinner/Spinner';

class EditModal extends Component {
    state = {
        dataForm: null
    }

    inputHandler = (event, inputName) => {
        const updatedDataForm = {...this.state.dataForm};
        let updatedDataEmelent = { ...updatedDataForm[inputName] };
        updatedDataEmelent = event.target.value;
        updatedDataForm[inputName] = updatedDataEmelent;
        this.setState({
            dataForm: updatedDataForm
        });
    }

    submitUpdateHandler = () => {
        const data = { ...this.props.userData, ...this.state.dataForm };
        this.props.onUpdateUserById(data, this.props.token);
        this.props.btnClicked();
        this.setState( { dataForm: null});
    }

    render() {
        let ModalStyle = this.props.show ? {
            display: "block"
        } : {
                display: "none"
            }
        let userData = null;
        if (this.props.userData) {
            userData = { ...this.props.userData };

        }
        return (
            <div className={classes.Modal} style={ModalStyle}>
                <div className={classes.ModalContent}>
                    <h3>Edit user</h3>
                    {userData ? <form>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" placeholder="user1" defaultValue={this.props.userData.username} disabled />
                        </div>
                        <div>
                            <label htmlFor="firstName">First name:</label>
                            <input onChange={(event) => this.inputHandler(event, "firstName")} defaultValue={userData.firstName} type="text" id="firstName" />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last name:</label>
                            <input onChange={(event) => this.inputHandler(event, "lastName")} defaultValue={this.props.userData.lastName} name="lastName" type="text" id="lastName" />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input onChange={(event) => this.inputHandler(event, "password")} defaultValue={this.props.userData.password} type="password" id="password" placeholder="Input new password" />
                        </div>
                        <div className={classes.SelectBox}>
                            <label>User type</label>
                            <select onChange={(event) => this.inputHandler(event, "role")} defaultValue={this.props.userData.role} className="custom-select">
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="employee">Employee</option>
                            </select>
                        </div>
                        <div name="status" className={classes.SelectBox}>
                            <label>Status</label>
                            <select onChange={(event) => this.inputHandler(event, "status")} defaultValue={this.props.userData.status} className="custom-select">
                                <option value="active">Active</option>
                                <option value="disabled">Disable</option>
                                <option value="blocked">Block</option>
                            </select>
                        </div>
                        <div className={classes.BtnGroup}>
                            <button type="reset" className="btn btn-danger" onClick={this.props.btnClicked}>Cancel</button>
                            <button onClick={this.submitUpdateHandler} type="reset" className="btn btn-primary">Save</button>
                        </div>
                    </form> : <Spinner />}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateUserById: (updateData, token) => dispatch(actions.updateUser(updateData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);