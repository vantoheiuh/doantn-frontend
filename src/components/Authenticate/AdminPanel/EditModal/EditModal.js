import React, { Component } from 'react';
import classes from './EditModal.css';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import Spinner from '../../../UI/Spinner/Spinner';
import Aux from '../../../../hoc/Auxi/Auxi';

class EditModal extends Component {
    state = {
        dataForm: null
    }

    inputHandler = (event, inputName) => {
        const updatedDataForm = { ...this.state.dataForm };
        let updatedDataEmelent = { ...updatedDataForm[inputName] };
        updatedDataEmelent = event.target.value;
        updatedDataForm[inputName] = updatedDataEmelent;
        this.setState({
            dataForm: updatedDataForm
        });
    }

    submitUpdateHandler = () => {
        if (this.props.role === "manager") {
            console.log("1")
            const updatedDataForm = { ...this.state.dataForm };
            let updatedDataEmelent = { ...updatedDataForm["role"] };
            updatedDataEmelent = "employee";
            updatedDataForm["role"] = updatedDataEmelent;
            const data = { ...this.props.userData, ...updatedDataForm };
            this.props.onUpdateUserById(data, this.props.token);
            this.props.btnClicked();
            this.setState({ dataForm: null });
            return;
        }
        const data = { ...this.props.userData, ...this.state.dataForm };
        this.props.onUpdateUserById(data, this.props.token);
        this.props.btnClicked();
        this.setState({ dataForm: null });
    }

    render() {
        console.log(this.state.dataForm)
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
                    <h3>Sửa thông tin tài khoản</h3>
                    {userData ? <form>
                        <div>
                            <label htmlFor="username">Tên tài khoản:</label>
                            <input type="text" id="username" placeholder="user1" defaultValue={this.props.userData.username} disabled />
                        </div>
                        <div>
                            <label htmlFor="firstName">Họ đệm:</label>
                            <input onChange={(event) => this.inputHandler(event, "firstName")} defaultValue={userData.firstName} type="text" id="firstName" />
                        </div>
                        <div>
                            <label htmlFor="lastName">Tên:</label>
                            <input onChange={(event) => this.inputHandler(event, "lastName")} defaultValue={this.props.userData.lastName} name="lastName" type="text" id="lastName" />
                        </div>
                        <div>
                            <label htmlFor="password">Mật khẩu:</label>
                            <input onChange={(event) => this.inputHandler(event, "password")} defaultValue={this.props.userData.password} type="password" id="password" placeholder="Input new password" />
                        </div>
                        <div className={classes.SelectBox}>
                            <label>Loại tài khoản</label>
                            <select onChange={(event) => this.inputHandler(event, "role")} defaultValue={this.props.userData.role} className="custom-select">
                                {this.props.role === "admin" ? <Aux>

                                    <option value="admin">Admin</option>
                                    <option value="manager">Manager</option>
                                    <option value="employee">Employee</option>
                                </Aux> : <option defaultValue="employee">Employee</option>
                                }
                            </select>
                        </div>
                        <div name="status" className={classes.SelectBox}>
                            <label>Trạng thái</label>
                            <select onChange={(event) => this.inputHandler(event, "status")} defaultValue={this.props.userData.status} className="custom-select">
                                <option value="active">Active</option>
                                <option value="disabled">Disable</option>
                            </select>
                        </div>
                        <div className={classes.BtnGroup}>
                            <button type="reset" className="btn btn-danger" onClick={this.props.btnClicked}>Huỷ</button>
                            <button onClick={this.submitUpdateHandler} type="reset" className="btn btn-primary">Lưu thay đổi</button>
                        </div>
                    </form> : <Spinner />}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        role: state.auth.role
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateUserById: (updateData, token) => dispatch(actions.updateUser(updateData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);