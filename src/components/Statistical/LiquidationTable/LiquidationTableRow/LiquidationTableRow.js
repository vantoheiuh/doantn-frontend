import React, { Component } from 'react';
import classes from './LiquidationTableRow.css';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


class LiquidationTableRow extends Component {
  render() {
    return (
      <tr className={classes.LiquidationTableRow}>
        <th scope="row">{this.props.stt}</th>
        <td>{this.props.name.length > 35 ? this.props.name.slice(0, 35) + ' ...' : this.props.name} </td>
        <td>{this.props.quantity}</td>
        <td>{this.props.checkinTime}</td>
        <td>{this.props.expiredTime}</td>
        <td>{this.props.locate}</td>
        <td>
          <span className={this.props.statusDevice === 'Using' ? "using" : "isMaintained"}>
            {this.props.statusDevice}
          </span>
        </td>
        {/* <td className={classes.ButtonGroup}>
          <button className={classes.Edit} onClick={this.props.edit}><EditIcon /></button>
          <button className={classes.Delete} onClick={this.props.delete}><DeleteIcon /></button>
        </td> */}
      </tr>
    )
  }
}

export default LiquidationTableRow;