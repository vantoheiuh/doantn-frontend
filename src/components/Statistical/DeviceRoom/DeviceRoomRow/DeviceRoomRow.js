import React, { Component } from 'react';
import classes from './DeviceRoomRow.css';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class DeviceRoomRow extends Component {
  render() {
    return (
      <tr className={classes.DeviceRoomRow}>
        <th scope="row">{this.props.stt}</th>
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
          <button className={classes.Edit} onClick={this.props.edit}><EditIcon /></button>
          <button className={classes.Delete} onClick={this.props.delete}><DeleteIcon /></button>
        </td>
      </tr>
    );
  }
}

export default DeviceRoomRow;