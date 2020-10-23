import React, { Component } from 'react';
import classes from './DeviceRoomTable.css';
import DeviceRoomRow from './DeviceRoomRow/DeviceRoomRow';
import axios from 'axios';
import Chart from '../../UI/Chart/Chart';
import Spinner from '../../UI/Spinner/Spinner';
class DeviceRoomTable extends Component {
  state = {
    deviceRoom: [],
    dataFilter: [],
    loading: true
  }
  componentDidMount() {
    axios.get('/api/products')
      .then(res => {
        this.setState({
          deviceRoom: res.data,
          dataFilter: res.data,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
      })
  }
  isChangeRoom = (event, data) => {
    const roomName = event.target.value;
    const dataFil = data.filter(item => {
      if (roomName === "All") {
        return item;
      }
      return roomName === item.locate;
    });
    this.setState({ deviceRoom: dataFil });
  }
  render() {
    //console.log(this.state.deviceRoom);
    let listLiquidationTable = this.state.deviceRoom.map((item, index) => {
      return (
        <DeviceRoomRow key={index} stt={index + 1}
          name={item.name}
          price={item.price}
          amount={item.amount}
          checkinTime={item.checkinTime.slice(0, 10)}
          expiredTime={item.expiredTime}
          activeTime={item.activeTime}
          quantity={item.quantity}
          source={item.source}
          statusDevice={item.statusDevice}
          locate={item.locate}
          edit={(user) => this.props.edit(item)}
          delete={() => this.props.delete(item._id, item.name)} />
      )
    })

    let sumCount = this.state.deviceRoom.reduce((total, item) => {
      return total + item.amount;
    }, 0);

    let countUsing = this.state.deviceRoom.filter(item => {
      return item.statusDevice === "Using";
    }).reduce((total, item) => {
      return total + item.amount;
    }, 0)

    let countMaintain = this.state.deviceRoom.filter(item => {
      return item.statusDevice === "Maintained";
    }).reduce((total, item) => {
      return total + item.amount;
    }, 0)
    return (
      <div className={classes.DeviceRoomTable}>
        <div>
          <label>THIẾT BỊ TRONG PHÒNG BAN: </label> <br />
          <select name="deviceRoom" onChange={(event) => this.isChangeRoom(event, this.state.dataFilter)} required>
            <option value={"All"}>All</option>
            <option value={"kho"}>Kho</option>
            <option value={"kế toán"}>Kế toán</option>
            <option value={"giám đốc"}>Giám đốc</option>
          </select>
          { this.state.loading ? <Spinner /> : <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Quantity</th>
                <th>Source</th>
                <th>Locate</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listLiquidationTable}
            </tbody>
          </table>}
        </div>
        <div className={classes.Chart}>
          <Chart maint={sumCount} using={countUsing} mainTained={countMaintain} />
        </div>
      </div>
    );
  }
}

export default DeviceRoomTable;