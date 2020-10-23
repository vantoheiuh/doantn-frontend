import React, { Component } from 'react';
import classes from './MaintenanceRow.css';
class MaintenanceRow extends Component {
  render() {
    return (
      <tr className={classes.MaintenanceRow}>
        <td>{this.props.stt}</td>
        <td>{this.props.name}</td>
        <td>{this.props.amount}</td>
        <td>{this.props.checkinTime}</td>
        <td>{this.props.activeTime}</td>
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

export default MaintenanceRow;