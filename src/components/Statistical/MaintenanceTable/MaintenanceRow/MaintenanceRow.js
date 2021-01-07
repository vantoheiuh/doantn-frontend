import React, { Component } from 'react';
import classes from './MaintenanceRow.css';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import axios from '../../../../axios-auth';
import CircularProgress from '@material-ui/core/CircularProgress';
class MaintenanceRow extends Component {
  state = {
    loading: false,
    dataUpdate: this.props.item,
    newStatus: null,
    isChange: false
  }

  isChangeStatus = (event) => {
    let cloneData = { ...this.props.item };
    cloneData["statusDevice"] = event.target.value;
    console.log(cloneData["statusDevice"]);
    this.setState({ dataUpdate: cloneData, newStatus: event.target.value, isChange: true});
  }

  changeStatusHandler = (id) => {
    this.setState({ loading: true });
    // if (this.state.dataUpdate["statusDevice"] === "Using") {
    //   this.setState({ loading: true });
    //   return;
    // }
    const data = {...this.state.dataUpdate};
    if(!this.state.isChange){
      data["statusDevice"] = "Using";
    }
    axios.put('/api/products/' + id, data)
      .then(res => {
        //console.log(res.data)
        this.setState({ loading: false, reload: !this.state.reload });
        this.props.reloading();
      })
      .catch(err => {
        this.setState({ loading: false });
      })

  }
  render() {
    return (
      <tr className={classes.MaintenanceRow}>
        <th scope="row">{this.props.stt}</th>
        <td>{this.props.name.length > 35 ? this.props.name.slice(0, 35) + ' ...' : this.props.name}</td>
        <td>{this.props.quantity}</td>
        <td>{this.props.checkinTime}</td>
        <td>{this.props.activeTime}</td>
        <td>{this.props.locate}</td>
        <td>
          <span className={this.props.statusDevice === 'Using' ? "using" : "isMaintained"}>
            {this.props.statusDevice}
          </span>
        </td>
        <td className={classes.ButtonGroup}>
          <select name="status" onChange={(event) => this.isChangeStatus(event)} required>
            <option value={"Using"}>Using</option>
            <option value={"Maintained"}>Maintained</option>
          </select>
          <button onClick={() => this.changeStatusHandler(this.props.id)}>{this.state.loading ? <CircularProgress><CheckCircleIcon/></CircularProgress> : <CheckCircleIcon />}</button>

        </td>
      </tr>

    );
  }
}

export default MaintenanceRow;