import React, { Component } from 'react';
import classes from './AddModal.css';
import axios from '../../../../axios-auth';
import { connect } from 'react-redux';
import Aux from '../../../../hoc/Auxi/Auxi';

class AddModal extends Component {

    state = {
        firstName: null,
        lastName: null,
        username: null,
        password: null,
        role: null,
        status: null
    }

    inputHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    submitHandler = () => {
        const url = '/api/users/register'
        axios.post(url, this.state)
            .then(res => {
                console.log(res.data)
            })
        this.props.btnClicked();
    }

    render() {
        let ModalStyle = this.props.show ? { display: "block" } : { display: "none" }
        return (
            <div className={classes.Modal} style={ModalStyle}>
                <div className={classes.ModalContent}>
                    <h3>Add new user</h3>
                    <form>
                        <input onChange={this.inputHandler} type="text" name="firstName" placeholder="First name" />
                        <input onChange={this.inputHandler} type="text" name="lastName" placeholder="Last name" />
                        <input onChange={this.inputHandler} type="text" name="username" placeholder="User name" />
                        <input onChange={this.inputHandler} type="password" name="password" placeholder="Password" />
                        <div className={classes.SelectBox}>
                            <label >User type</label>
                            <select onChange={this.inputHandler} className="custom-select" name="role">
                                {this.props.role === "admin" ?
                                    <Aux>
                                        <option value="admin">Admin</option>
                                        <option value="manager">Manager</option>
                                        <option value="employee">Employee</option>
                                    </Aux>: 
                                    <Aux>
                                    <option value="employee">Employee</option>
                                </Aux>
                                }
                            </select>
                        </div>
                        <div className={classes.SelectBox}>
                            <label>Status</label>
                            <select onChange={this.inputHandler} className="custom-select" name="status">
                                <option value="active">Active</option>
                                <option value="disabled">Disable</option>
                                <option value="blocked">Block</option>
                            </select>
                        </div>
                        <div className={classes.BtnGroup}>
                            <button type="button" className="btn btn-danger" onClick={this.props.btnClicked}>Cancel</button>
                            <button onClick={this.submitHandler} type="button" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        role: state.auth.role
    }
}

export default connect(mapStateToProps)(AddModal);