import React, { Component } from 'react';
import classes from './TableDataRow.css';
import Barcode from '../../UI/Barcode/Barcode';

class TableDataRow extends Component {

  render() {
    let statusClass = this.props.statusDevice === 'Using' ? "using" : "isMaintained";
    return (
      <tr className={classes.TableDataRow}>
        <td>{this.props.stt}</td>
        <td>
          <img src={`http://localhost:5000/${this.props.imageURL}`} alt="Product" />
          <span onClick={this.props.showDetail} className={classes.ImageDetail}>View Details</span>
        </td>
        <td>{this.props.name}</td>
        <td>{this.props.price}$</td>
        <td>{this.props.amount}</td>
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
          <button className="btn btn-primary btn-sm" onClick={this.props.edit}>Edit</button>
          <button className="btn btn-danger btn-sm" onClick={this.props.delete}>Delete</button>
        </td>
      </tr>
    );
  }
}

export default TableDataRow;