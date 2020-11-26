import React, { Component } from 'react';
import classes from './NewDevice.css';
import axios from 'axios';
import AlertAddNew from '../UI/AlertInfo/AlerAddNew/AlertAddNew';
import Spinner from '../UI/Spinner/Spinner';
import Aux from '../../hoc/Auxi/Auxi';

class NewDevice extends Component {
    state = {
        name: "",
        price: "",
        amount: "",
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
                    <h3>ADD DEVICE</h3>
                    <form>
                        <div>
                            <label htmlFor="image">Image: </label>
                            <input className={classes.File} type="file" id="image" name="image" onChange={(event) => this.isChange(event)} accept=".jpg,.png,jpeg"></input>
                        </div>
                        <div>
                            <label htmlFor="name">Name: </label>
                            <input type="text" id="name" placeholder="Device name"
                                name="name" onChange={(event) => this.isChange(event)}
                                value={this.state.name} />
                        </div>
                        <div>
                            <label>Price: </label>
                            <input type="text" placeholder="Device cost"
                                name="price" onChange={(event) => this.isChange(event)}
                                value={this.state.price} />
                        </div>
                        <div>
                            <label>Amount: </label>
                            <input type="number" placeholder="Device amount"
                                name="amount" onChange={(event) => this.isChange(event)}
                                value={this.state.amount} />
                        </div>
                        <div>
                            <label>Checkin Time: </label>
                            <input type="date" placeholder="Device checkinTime"
                                name="checkinTime" onChange={(event) => this.isChange(event)}
                                value={this.state.checkinTime} />
                        </div>
                        <div>
                            <label>Active Time: </label>
                            <input type="number" placeholder="Device activeTime"
                                name="activeTime" onChange={(event) => this.isChange(event)}
                                value={this.state.activeTime} />
                        </div>
                        <div>
                            <label>Expired Time: </label>
                            <input type="number" placeholder="Device expiredTime"
                                name="expiredTime" onChange={(event) => this.isChange(event)}
                                value={this.state.expiredTime} />
                        </div>
                        <div>
                            <label>Quantity: </label>
                            <input type="number" placeholder="Device quantity"
                                name="quantity" onChange={(event) => this.isChange(event)}
                                value={this.state.quantity} />
                        </div>
                        <div>
                            <label>Source: </label>
                            <input type="text" placeholder="Device source"
                                name="source" onChange={(event) => this.isChange(event)}
                                value={this.state.source} />
                        </div>
                        <div>
                            <label>Status: </label>
                            <select className="selectBox" name="statusDevice" onChange={(event) => this.isChange(event)} required>
                                <option value={'Using'}>Using </option>
                                <option value={'Maintained'}>Maintained</option>
                            </select>
                        </div>

                        <div>
                            <label>Locate: </label>
                            <select className="selectBox" name="locate" onChange={(event) => this.isChange(event)} required>
                                <option value={'kho'}>Kho </option>

                                <option value={'kế toán'}>Kế toán </option>
                                <option value={'giám đốc'}>Kiám đốc</option>
                            </select>
                        </div>
                        <div className={classes.Button}>
                            <button className="btn btn-danger">CANCEL</button>
                            <button type="reset" onClick={(event) => this.add(event)} className="btn btn-primary">ADD</button>
                        </div>
                    </form>
                </div>
                }
            </Aux>
        );
    }
}

export default NewDevice;