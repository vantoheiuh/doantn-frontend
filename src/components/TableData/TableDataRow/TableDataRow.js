import React, { Component } from 'react';
import classes from './TableDataRow.css';
import Barcode from '../../UI/Barcode/Barcode';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class TableDataRow extends Component {

  render() {
    let statusClass = this.props.statusDevice === 'Using' ? "using" : "isMaintained";
    return (
      <tr className={classes.TableDataRow}>
        <td>{this.props.stt}</td>
        <td>
          <img src={`http://54.151.134.255:5000/${this.props.imageURL}`} alt="Product" />
          <span onClick={this.props.showDetail} className={classes.ImageDetail}>View Details</span>
        </td>
        <td>{this.props.name}</td>
        <td>{this.props.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
        <td>{this.props.quantity}</td>
        <td>{this.props.checkinTime}</td>
        {/* <td>{this.props.activeTime}</td> */}
        {/* <td>{this.props.expiredTime}</td> */}
        {/* <td>{this.props.quantity}</td> */}
        <td>{this.props.source}</td>
        <td>{this.props.locate}</td>
        <td><Barcode value={this.props.id} /></td>
        <td>
          <span className={classes[statusClass]}>
            {this.props.statusDevice}
          </span>
        </td>
        <td className={classes.BtnGroup}>
          <button onClick={this.props.edit}><EditIcon /> </button>
          <button onClick={this.props.delete}><DeleteIcon /></button>
        </td>
      </tr>
    );
  }
}

export default TableDataRow;