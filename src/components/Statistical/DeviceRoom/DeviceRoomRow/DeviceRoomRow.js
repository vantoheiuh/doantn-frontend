import React, { Component } from 'react';
import classes from './DeviceRoomRow.css';
class DeviceRoomRow extends Component {
  render() {
    return (
      <tr className={classes.DeviceRoomRow}>
        <td>{this.props.stt}</td>
        <td>{this.props.name}</td>
        <td>{this.props.amount}</td>
        <td>{this.props.quantity}</td>
        <td>{this.props.source}</td>
        <td>{this.props.locate}</td>
        <td>
          <span className={this.props.statusDevice === 'Using' ? "using" : "isMaintained"}>
            {this.props.statusDevice}
          </span>
        </td>
        <td className={classes.ButtonGroup}>
          <button className={classes.Edit} onClick={this.props.edit}>Edit</button>
          <button className={classes.Delete} onClick={this.props.delete}>Delete</button>
        </td>
      </tr>
    );
  }
}

export default DeviceRoomRow;