import React, { Component } from 'react';
import classes from './Model.css';
import axios from '../../../axios-auth';

class Model extends Component {
    state = {
        formData: {
            ...this.props.editUserObject,
            statusDevice: 'Using'
        },
        loading: false
    }
    onInputHandler = (event, inputName) => {
        let updatedState = { ...this.state.formData };
        let updatedInput = { ...updatedState[inputName] };
        updatedInput = event.target.value;
        updatedState[inputName] = updatedInput;
        this.setState({ formData: updatedState });
    }
    onSaveHandler = (id) => {
        this.setState({ loading: true });
        axios.put('/api/products/' + id, this.state.formData)
            .then(res => {
                this.props.hiddenModel()
                this.props.alertOn("Sửa thành công");
                this.setState({ loading: false });
            })
            .catch(err => {
                this.props.alertOn("Lỗi hệ thống");
                this.setState({ loading: false });
            })

    }
    render() {
        let ModalStyle = this.props.show ? {
            display: "block"
        } : {
                display: "none"
            }
        return (
            <div className={classes.Modal} style={ModalStyle}>
                <div className={classes.ModalContent}>
                    <div className={classes.EditForm}>
                        <h3>Sửa thông tin thiết bị</h3>
                        <form>
                            <div>
                                <label>Tên: </label>
                                <input name="name" onChange={(event) => { this.onInputHandler(event, "name") }} defaultValue={this.props.editUserObject.name} type="text" />
                            </div>
                            <div>
                                <label>Giá: </label>
                                <input name="price" onChange={(event) => { this.onInputHandler(event, "price") }} defaultValue={this.props.editUserObject.price} type="text" />
                            </div>
                            {/* <div>
                                <label>Số lượng: </label>
                                <input name="amount" onChange={(event) => { this.onInputHandler(event, "amount") }} defaultValue={this.props.editUserObject.amount} type="number" placeholder="Device cost" />
                            </div> */}
                            <div>
                                <label>Hạn thanh lí: </label>
                                <input name="expiredTime" onChange={(event) => { this.onInputHandler(event, "expiredTime") }} defaultValue={this.props.editUserObject.expiredTime} type="text" />
                            </div>
                            <div>
                                <label>Hạn bảo trì: </label>
                                <input name="activeTime" onChange={(event) => { this.onInputHandler(event, "activeTime") }} defaultValue={this.props.editUserObject.activeTime} type="text" />
                            </div>
                            <div>
                                <label>Số lượng: </label>
                                <input name="quantity" onChange={(event) => { this.onInputHandler(event, "quantity") }} defaultValue={this.props.editUserObject.quantity} type="text" />
                            </div>
                            <div>
                                <label>Trạng thái: </label>
                                <select className="selectBox" name="statusDevice" onChange={(event) => this.onInputHandler(event, "statusDevice")} required>
                                    <option value={'Using'}>Using</option>
                                    <option value={'Is Maintained'}>Is Maintained</option>
                                </select>
                            </div>
                            <div>
                                <label>Nguồn: </label>
                                <input name="source" onChange={(event) => { this.onInputHandler(event, "source") }} defaultValue={this.props.editUserObject.source} type="text" />
                            </div>
                        </form>
                        <div className={classes.ButtonGroup}>
                            <button className="btn btn-danger" onClick={this.props.cancel} >Huỷ</button>
                            <button onClick={() => this.onSaveHandler(this.props.editUserObject._id)} className="btn btn-primary">Lưu thay đổi</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Model;