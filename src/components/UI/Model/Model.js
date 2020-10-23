import React, { Component } from 'react';
import classes from './Model.css';
import axios from 'axios';

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
                //console.log(res.data)
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
        return (
            <div>
                <div className="den" onClick={this.props.removeEdit}></div>
                <div className={classes.EditForm}
                    style={{
                        transform: this.props.show ? "translateY(0vh)" : "translateY(100vh)",
                        opacity: this.props.show ? "1" : "0"
                    }}>
                    <h3 className="edit_form_title">EDIT DEVICE</h3>
                    <form className="add-form-input">
                        <label>Name: </label>
                        <input name="name" onChange={(event) => { this.onInputHandler(event, "name") }} defaultValue={this.props.editUserObject.name} type="text" placeholder="Device name" /><br />
                        <label>Price: </label>
                        <input name="price" onChange={(event) => { this.onInputHandler(event, "price") }} defaultValue={this.props.editUserObject.price} type="text" placeholder="Device cost" />

                        <label>Amount: </label>
                        <input name="amount" onChange={(event) => { this.onInputHandler(event, "amount") }} defaultValue={this.props.editUserObject.amount} type="number" placeholder="Device cost" />

                        <label>Warranty Period: </label>
                        <input name="warrantyPeriod" onChange={(event) => { this.onInputHandler(event, "warrantyPeriod") }} value={this.props.editUserObject.warrantyPeriod} type="date" placeholder="Device cost" />

                        <label>Active Time: </label>
                        <input name="activeTime" onChange={(event) => { this.onInputHandler(event, "activeTime") }} defaultValue={this.props.editUserObject.activeTime} type="text" placeholder="Device cost" />

                        <label>Quantity: </label>
                        <input name="quantity" onChange={(event) => { this.onInputHandler(event, "quantity") }} defaultValue={this.props.editUserObject.quantity} type="text" placeholder="Device cost" />

                        <label>Status: </label>
                        <select className="selectBox" name="statusDevice" onChange={(event) => this.onInputHandler(event, "statusDevice")} required>
                            <option value={'Using'}>Using</option>
                            <option value={'Is Maintained'}>Is Maintained</option>
                        </select>

                        <label>Source: </label>
                        <input name="source" onChange={(event) => { this.onInputHandler(event, "source") }} defaultValue={this.props.editUserObject.source} type="text" placeholder="Device cost" />
                    </form>
                    <div className={classes.buttonGroup}>
                        <button className={classes.Cancer} onClick={this.props.cancel} >CANCEL</button>
                        <button onClick={() => this.onSaveHandler(this.props.editUserObject._id)} className={classes.Save}>SAVE</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Model;