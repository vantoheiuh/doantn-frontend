import React, { Component } from 'react';
import classes from './MaintenanceTable.css';
import MaintenanceRow from './MaintenanceRow/MaintenanceRow';
import axios from 'axios';
import Chart from '../../UI/Chart/Chart';
import Spinner from '../../UI/Spinner/Spinner';
import Footer from '../../UI/Footer/Footer';


class MaintenanceTable extends Component {
  state = {
    maintenanceTable: [],
    dataFilter: [],
    loading: true
  }
  componentDidMount() {
    axios.get('/api/products')
      .then(res => {
        //console.log(res.data)
        this.setState({
          maintenanceTable: res.data,
          dataFilter: res.data,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
      })
  }
  isChangeMainternance = (event, data) => {
    const name = event.target.value
    if(!name || name === 0){
      this.setState({maintenanceTable: this.state.dataFilter});
      return;
    }
    var today = new Date();
    const dataFil = data.filter(item => {
      const exTime = item.checkinTime.slice(0, 10).split('-');
      const exMaintain = new Date(Number(exTime[0]) + item.activeTime, Number(exTime[1]), Number(exTime[2]));
      const exLiquid = new Date(Number(exTime[0]) + item.activeTime + item.expiredTime, Number(exTime[1]), Number(exTime[2]));
      const lastMonth = new Date(today.getFullYear(), name, 0);
      return lastMonth.getTime() >= exMaintain.getTime() && lastMonth.getTime() < exLiquid.getTime();
    });
    this.setState({ maintenanceTable: dataFil });
  }
  render() {
    let listLiquidationTable = this.state.maintenanceTable.map((item, index) => {
      return (
        <MaintenanceRow key={index} stt={index + 1}
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

    let sumCount = this.state.maintenanceTable.reduce((total, item) => {
      return total + item.amount;
    }, 0);

    let countUsing = this.state.maintenanceTable.filter(item => {
      return item.statusDevice === "Using";
    }).reduce((total, item) => {
      return total + item.amount;
    }, 0)

    let countMaintain = this.state.maintenanceTable.filter(item => {
      return item.statusDevice === "Maintained";
    }).reduce((total, item) => {
      return total + item.amount;
    }, 0)

    return (
      <div className={classes.MaintenanceTable}>
        <div className="container">
          <h3 className="lable-title-liquidation">THIẾT BỊ CẦN BẢO TRÌ TRONG THÁNG: </h3>
          <select className="select-Month-liquidation" name="mainternance" onChange={(event) => this.isChangeMainternance(event, this.state.dataFilter)} required>
            <option value={0}>None</option>
            <option value={1} >January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>
          {this.state.loading ? <Spinner /> :
            <div className={classes.Table}>
              <table className="table table-hover">
                <caption>List Products</caption>
                <thead className="thead">
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Checkin Time</th>
                    <th scope="col">Active Time</th>
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

export default MaintenanceTable;