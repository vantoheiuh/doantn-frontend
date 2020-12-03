import React, { Component } from 'react';
import classes from './DeviceRoomTable.css';
import DeviceRoomRow from './DeviceRoomRow/DeviceRoomRow';
import axios from '../../../axios-auth';
import Chart from '../../UI/Chart/Chart';
import Spinner from '../../UI/Spinner/Spinner';
import Footer from '../../UI/Footer/Footer';


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
        <div className="container">
          <h3>Thiết bị trong phòng ban</h3>
          <select name="deviceRoom" onChange={(event) => this.isChangeRoom(event, this.state.dataFilter)} required>
            <option value={"All"}>All</option>
            <option value={"kho"}>Kho</option>
            <option value={"kế toán"}>Kế toán</option>
            <option value={"giám đốc"}>Giám đốc</option>
          </select>
          {this.state.loading ? <Spinner /> :
            <div className={classes.Table}>
              <table className="table table-hover">
                <caption>List Products</caption>
                <thead className="thead">
                  <tr >
                    <th scope="col">STT</th>
                    <th scope="col">Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Source</th>
                    <th scope="col">Locate</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listLiquidationTable}
                </tbody>
              </table>
            </div>}
        </div>
        {/* <div className={classes.Chart}>
          <Chart maint={sumCount} using={countUsing} mainTained={countMaintain} />
        </div> */}
        <Footer />

      </div>
    );
  }
}

export default DeviceRoomTable;