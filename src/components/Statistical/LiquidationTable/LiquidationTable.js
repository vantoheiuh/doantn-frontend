import React, { Component } from 'react';
import classes from './LiquidationTable.css';
import LiquidationTableRow from './LiquidationTableRow/LiquidationTableRow';
import axios from '../../../axios-auth';
import Spinner from '../../UI/Spinner/Spinner';
import Footer from '../../UI/Footer/Footer';

class LiquidationTable extends Component {
  state = {
    liquidationTable: [],
    dataFilter: [],
    loading: true
  }
  componentDidMount() {
    axios.get('/api/products')
      .then(res => {
        this.setState({
          liquidationTable: res.data,
          dataFilter: res.data,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
      })
  }
  isChangeLiquidation = (event, data) => {
    const name = event.target.value;
    if(!name || name === "0"){
      this.setState({liquidationTable: this.state.dataFilter});
      return;
    }
    var today = new Date();
    const dataFil = data.filter(item => {
      const exTime = item.checkinTime.slice(0, 10).split('-'); //cho vào mảng
      const exDate = new Date(Number(exTime[0]) + item.activeTime + item.expiredTime, Number(exTime[1]), Number(exTime[2]));
      const lastMonth = new Date(today.getFullYear(), name, 0);
      return lastMonth.getTime() >= exDate.getTime();
    });
    this.setState({ liquidationTable: dataFil });
  }
  render() {
    let listLiquidationTable = this.state.liquidationTable.map((item, index) => {
      return (
        <LiquidationTableRow key={index} stt={index + 1}
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
    // let sumCount = this.state.liquidationTable.reduce((total, item) => {
    //   return total + item.amount;
    // }, 0);
    // let countUsing = this.state.liquidationTable.filter(item => {
    //   return item.statusDevice === "Using";
    // }).reduce((total, item) => {
    //   return total + item.amount;
    // }, 0)

    // let countMaintain = this.state.liquidationTable.filter(item => {
    //   return item.statusDevice === "Maintained";
    // }).reduce((total, item) => {
    //   return total + item.amount;
    // }, 0)
    return (
      <div className={classes.LiquidationTable}>
        <div className="container">
          <h3>THIẾT BỊ SẮP THANH LÝ THEO THÁNG: </h3>
          <select className="select-Month-liquidation" name="liquidation" onChange={(event) => this.isChangeLiquidation(event, this.state.dataFilter)} required>
            <option value={0} >None</option>
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
          {
            this.state.loading ? <Spinner />
              :
              <div className={classes.Table}>
                <table className="table table-hover">
                  <caption>List Products</caption>
                  <thead className="thead">
                    <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Ngày checkin</th>
                    <th scope="col">Hạn thanh lí</th>
                    <th scope="col">Vị trí</th>
                    <th scope="col">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listLiquidationTable}
                  </tbody>
                </table>
              </div>
          }
        </div>
        {/* <div className={classes.Chart}>
          <Chart maint={sumCount} using={countUsing} mainTained={countMaintain} />
        </div> */}
        <Footer />
      </div>
    );
  }
}

export default LiquidationTable;