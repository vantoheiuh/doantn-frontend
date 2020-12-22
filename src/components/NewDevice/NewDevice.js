import React, { Component } from 'react';
import classes from './NewDevice.css';
import axios from '../../axios-auth';
import AlertAddNew from '../UI/AlertInfo/AlerAddNew/AlertAddNew';
import Spinner from '../UI/Spinner/Spinner';
import Aux from '../../hoc/Auxi/Auxi';

class NewDevice extends Component {
    state = {
        name: "",
        price: "",
        amount: 0,
        checkinTime: "",
        expiredTime: "",
        activeTime: "",
        quantity: "",
        statusDevice: 'Using',
        source: "",
        locate: "kho",
        alertShowAdd: false,
        status: "",
        image: null,
        checkAlertAdd: true,
        loading: false
    }
    isChange = (event) => {
        const name = event.target.name;
        let value;

        if (name === "image") {
            value = event.target.files;
            this.setState({
                image: value[0]
            });
        }
        else {
            value = event.target.value;
            this.setState({
                [name]: value
            });

        }

    }

    add = (event) => {
        this.setState({ loading: true });
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('price', this.state.price);
        formData.append('amount', this.state.amount);
        formData.append('checkinTime', this.state.checkinTime);
        formData.append('activeTime', this.state.activeTime);
        formData.append('expiredTime', this.state.expiredTime);
        formData.append('quantity', this.state.quantity);
        formData.append('source', this.state.source);
        formData.append('statusDevice', this.state.statusDevice);
        formData.append('locate', this.state.locate);
        formData.append('image', this.state.image);
        axios({
            method: 'post',
            url: '/api/products',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(res => {
                console.log(res.data);
                this.alertOnAdd("Thêm mới thành công");
                this.setState({
                    name: "",
                    price: "",
                    amount: "",
                    checkinTime: "",
                    activeTime: "",
                    expiredTime: "",
                    quantity: "",
                    source: "",
                    statusDevice: 'Using',
                    locate: 'Using',
                    image: null,
                    loading: false
                });
            })
            .catch(err => {
                this.setState({ checkAlertAdd: false, loading: false });
                this.alertOnAdd("Có lỗi của hệ thống");
                console.log("looix")
            })

    }
    alertOnAdd = (alert) => {
        this.setState({
            alertShowAdd: true,
            status: alert
        });
    }
    alertOffAdd = () => {
        this.setState({
            alertShowAdd: false
        });
    }
    render() {

        return (
            <Aux>
                <AlertAddNew checkAlertAdd={this.state.checkAlertAdd} alertShowAdd={this.state.alertShowAdd} alertOffAdd={this.alertOffAdd} status={this.state.status} />
                {this.state.loading ? <Spinner /> :
                <div className={classes.NewDevice}>
                    <h3>Thêm mới thiết bị</h3>
                    <form>
                        <div>
                            <label htmlFor="image">Ảnh thiết bị: </label>
                            <input className={classes.File} type="file" id="image" name="image" onChange={(event) => this.isChange(event)} accept=".jpg,.png,jpeg"></input>
                        </div>
                        <div>
                            <label htmlFor="name">Tên: </label>
                            <input type="text" id="name" placeholder="Tên thiết bị"
                                name="name" onChange={(event) => this.isChange(event)}
                                value={this.state.name} />
                        </div>
                        <div>
                            <label>Giá: </label>
                            <input type="text" placeholder="Giá thiết bị"
                                name="price" onChange={(event) => this.isChange(event)}
                                value={this.state.price} />
                        </div>
                        <div>
                            <label>Số lượng: </label>
                            <input type="number" placeholder="Số lượng"
                                name="quantity" onChange={(event) => this.isChange(event)}
                                value={this.state.quantity} />
                        </div>
                        <div>
                            <label>Thời gian checkin: </label>
                            <input type="date" placeholder="Thời gian checkin"
                                name="checkinTime" onChange={(event) => this.isChange(event)}
                                value={this.state.checkinTime} />
                        </div>
                        <div>
                            <label>Hạn bảo trì: </label>
                            <input type="number" placeholder="Hạn bảo trì"
                                name="activeTime" onChange={(event) => this.isChange(event)}
                                value={this.state.activeTime} />
                        </div>
                        <div>
                            <label>Hạn thanh lí: </label>
                            <input type="number" placeholder="Hạn thanh lí"
                                name="expiredTime" onChange={(event) => this.isChange(event)}
                                value={this.state.expiredTime} />
                        </div>
                        {/* <div>
                            <label>Quantity: </label>
                            <input type="number" placeholder="Device quantity"
                                name="quantity" onChange={(event) => this.isChange(event)}
                                value={this.state.quantity} />
                        </div> */}
                        <div>
                            <label>Nguồn: </label>
                            <input type="text" placeholder="Nguồn"
                                name="source" onChange={(event) => this.isChange(event)}
                                value={this.state.source} />
                        </div>
                        <div>
                            <label>Trạng thái: </label>
                            <select className="selectBox" name="statusDevice" onChange={(event) => this.isChange(event)} required>
                                <option value={'Using'}>Using </option>
                                <option value={'Maintained'}>Maintained</option>
                            </select>
                        </div>

                        <div>
                            <label>Vị trí: </label>
                            <select className="selectBox" name="locate" onChange={(event) => this.isChange(event)} required>
                                <option value={'kho'}>Kho </option>
                                <option value={'kế toán'}>Kế toán </option>
                                <option value={'giám đốc'}>Kiám đốc</option>
                                <option value={'lab 1'}>Lab 1 </option>
                                <option value={'lab 2'}>Lab 2</option>
                            </select>
                        </div>
                        <div className={classes.Button}>
                            <button className="btn btn-danger">Huỷ bỏ</button>
                            <button type="reset" onClick={(event) => this.add(event)} className="btn btn-primary">Thêm</button>
                        </div>
                    </form>
                </div>
                }
            </Aux>
        );
    }
}

export default NewDevice;