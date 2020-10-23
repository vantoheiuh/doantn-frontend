import React, { Component } from 'react';
import classes from './LiquidationTableRow.css';

class LiquidationTableRow extends Component {
  render() {
    return (
      <tr className={classes.LiquidationTableRow}>
        <td>{this.props.stt}</td>
        <td>{this.props.name}</td>
        <td>{this.props.price}$</td>
        <td>{this.props.checkinTime}</td>
        <td>{this.props.expiredTime}</td>
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
    )
  }
}

export default LiquidationTableRow;