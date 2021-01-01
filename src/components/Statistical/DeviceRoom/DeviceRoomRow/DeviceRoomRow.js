import React, { Component } from 'react';
import classes from './DeviceRoomRow.css';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import axios from '../../../../axios-auth';
import CircularProgress from '@material-ui/core/CircularProgress';

class DeviceRoomRow extends Component {

  state = {
    loading: false,
    dataUpdate: this.props.item,
    reload: false
  }

  isChangeRoom = (event) => {
    let cloneData = { ...this.props.item };
    cloneData["locate"] = event.target.value;
    this.setState({ dataUpdate: cloneData });
  }

  changeRoomHandler = (id) => {
    this.setState({ loading: true });
    if (this.state.dataUpdate["locate"] === "none") {
      this.setState({ loading: true });
      return;
    }
    axios.put('/api/products/' + id, this.state.dataUpdate)
      .then(res => {
        this.setState({ loading: false, reload: !this.state.reload });
        this.props.reloadding();
      })
      .catch(err => {
        this.setState({ loading: false });
      })

  }
  render() {
    return (
      <tr className={classes.DeviceRoomRow}>
        <th scope="row">{this.props.stt}</th>
        <td>{this.props.name.length > 35 ? this.props.name.slice(0, 35) + ' ...' : this.props.name}</td>
        <td>{this.props.quantity}</td>
        <td>{this.props.locate}</td>
        <td>
          <span className={this.props.statusDevice === 'Using' ? "using" : "isMaintained"}>
            {this.props.statusDevice}
          </span>
        </td>
        <td>{this.props.source}</td>
        <td className={classes.ButtonGroup}>
          <select name="deviceRoom" onChange={(event) => this.isChangeRoom(event)} required>
            <option value={"none"}>None</option>
            <option value={"kho"}>Kho</option>
            <option value={"kế toán"}>Kế toán</option>
            <option value={"giám đốc"}>Giám đốc</option>
            <option value={"lab 1"}>Lab 1</option>
            <option value={"lab 2"}>Lab 2</option>
          </select>
          <button onClick={() => this.changeRoomHandler(this.props.id)}>{this.state.loading ? <CircularProgress><CheckCircleIcon /></CircularProgress> : <CheckCircleIcon />}</button>
        </td>
      </tr>
    );
  }
}

export default DeviceRoomRow;