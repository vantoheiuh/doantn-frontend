import React, { Component } from 'react';
import classes from './UserDetail.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import axios from '../../../axios-auth';


class UserDetail extends Component {

    state = {
        dataForm: {
            idNumber: null,
            firstName: null,
            lastName: null,
            phone: null,
            address: null,
            birthDay: null,
        },
        isSuccess: false,
        isFailed: false,
        userData: null
    }

    componentDidMount() {
        const AuthStr = 'Bearer '.concat(this.props.token);
        const url = '/api/users/current';
        axios({
            method: 'get',
            url: url,
            headers: { 'Content-Type': 'application/json', 'Authorization': AuthStr },
            json: true
        })
            .then(res => {
                this.setState({
                    dataForm: {
                        idNumber: res.data.idNumber,
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        phone: res.data.phone,
                        birthDay: res.data.birthDay,
                        address: res.data.address,
                    }
                })
            })
            .catch(err => {
                console.log(err);
            })
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
        // let checkData = {
        //     username: this.props.username,
        //     password: this.state.dataForm.currentPassword,
        // }
        // axios.post('http://localhost:5000/api/users/authenticate', checkData)
        //     .then(res => {
        //refresh new token
        // localStorage.setItem("token", res.data.token);
        // if (this.state.dataForm.newPassword === this.state.dataForm.confirmPassword) {
        const dataUpdate = {
            id: this.props.id,
            idNumber: this.state.dataForm.idNumber,
            firstName: this.state.dataForm.firstName,
            lastName: this.state.dataForm.lastName,
            phone: this.state.dataForm.phone,
            address: this.state.dataForm.address,
            birthDay: this.state.dataForm.birthDay,
        }
        this.props.onUpdateUserById(dataUpdate, this.props.token);
        // }
        this.setState({ isSuccess: true });
        // }).catch(err => {
        //     console.log("Wrong password");
        //     this.setState({ isFailed: true });
        // })
    }
    render() {

        return (
            <div className={classes.UpdatePassword}>
                <form className={classes.FormUpdate}>
                    <h3>Sửa thông tin cá nhân</h3>
                    <div>
                        <label htmlFor="username">Tên tài khoản:</label>
                        <input type="text" id="username" placeholder={this.props.username} disabled />
                    </div>
                    <div>
                        <label htmlFor="idNumber">CMND:</label>
                        <input onChange={(event) => this.inputHandler(event, "idNumber")} type="text" id="idNumber" placeholder="Số CMND" />
                    </div>
                    <div>
                        <label htmlFor="firstName">Họ đệm:</label>
                        <input onChange={(event) => this.inputHandler(event, "firstName")} name="firstName" type="text" id="firstName" placeholder="Họ và tên đệm" />
                    </div>
                    <div>
                        <label htmlFor="lastName">Tên:</label>
                        <input onChange={(event) => this.inputHandler(event, "lastName")} type="text" id="lastName" placeholder="Tên" />
                    </div>
                    <div>
                        <label htmlFor="birthDay">Ngày sinh:</label>
                        <input onChange={(event) => this.inputHandler(event, "birthDay")} type="date" id="birthDay"/>
                    </div>
                    <div>
                        <label htmlFor="phone">Số điện thoại: </label>
                        <input onChange={(event) => this.inputHandler(event, "phone")} type="text" id="phone" placeholder="Số điện thoại đang sử dụng" />
                    </div>
                    <div>
                        <label htmlFor="address">Địa chỉ: </label>
                        <input onChange={(event) => this.inputHandler(event, "address")} type="text" id="address" placeholder="Địa chỉ hiện tại" />
                    </div>
                    <div>
                        <label htmlFor="role">Chức vụ</label>
                        <input type="text" id="role" placeholder={this.props.role} disabled />
                    </div>

                    <div className={classes.BtnGroup}>
                        <button type="reset" className="btn btn-danger" onClick={this.props.btnClicked}>Cancel</button>
                        <button onClick={this.submitUpdateHandler} type="reset" className="btn btn-primary">Save</button>
                    </div>
                    {
                        this.state.isSuccess ? <p style={{ 'color': 'green' }}>Change password successfully!</p> : this.state.isFailed ? <p style={{ 'color': 'red' }}>Failed! Please try again!</p> : null
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
        id: state.auth.id,
        role: state.auth.role
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateUserById: (updateData, token) => dispatch(actions.updateUser(updateData, token)),
        onAuth: (username, password) => dispatch(actions.auth(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);