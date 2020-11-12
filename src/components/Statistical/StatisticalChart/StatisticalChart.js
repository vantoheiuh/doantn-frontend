import React, { Component } from 'react';
import classes from './StatisticalChart.css'
import { Line } from 'react-chartjs-2';
import axios from 'axios';

class StatisticalChart extends Component {
  state = {
    dataChart: [],
    dataFilter: []
  }
  componentDidMount() {
    axios.get('/api/products')
      .then(res => {
        //console.log(res.data)
        this.setState({
          dataChart: res.data,
          dataFilter: res.data
        });
      })
      .catch(err => {
        console.log(err);
      })
  }
  countLiquidation = (data) => {
    const listMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var today = new Date();
    const listData = listMonth.map(month => {
      const validData = data.filter(item => {
        const exTime = item.checkinTime.slice(0, 10).split('-'); //cho vào mảng
        const exDate = new Date(Number(exTime[0]) + item.activeTime + item.expiredTime, Number(exTime[1]), Number(exTime[2]));
        const lastMonth = new Date(today.getFullYear(), month, 0);
        return lastMonth.getTime() >= exDate.getTime();
      });
      return validData;
    });
    const result = listData.map(item => {
      const nums = item.reduce((total, numItem) => {
        return total + numItem.amount;
      }, 0);
      return nums;
    })
    return result;
  }

  countMaintenance = (data) => {
    const listMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var today = new Date();
    const listData = listMonth.map(month => {
      const validData = data.filter(item => {
        const exTime = item.checkinTime.slice(0, 10).split('-');
        const exMaintain = new Date(Number(exTime[0]) + item.activeTime, Number(exTime[1]), Number(exTime[2]));
        const exLiquid = new Date(Number(exTime[0]) + item.activeTime + item.expiredTime, Number(exTime[1]), Number(exTime[2]));
        const lastMonth = new Date(today.getFullYear(), month, 0);
        return lastMonth.getTime() >= exMaintain.getTime() && lastMonth.getTime() < exLiquid.getTime();
      });
      return validData;
    });
    const result = listData.map(item => {
      const nums = item.reduce((total, numItem) => {
        return total + numItem.amount;
      }, 0);
      return nums;
    })
    return result;
  }

  countActive = (data) => {
    const listMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var today = new Date();
    const listData = listMonth.map(month => {
      const validData = data.filter(item => {
        const exTime = item.checkinTime.slice(0, 10).split('-');
        const expiredActiveTime = new Date(Number(exTime[0]) + item.activeTime, Number(exTime[1]), Number(exTime[2]));
        const lastMonth = new Date(today.getFullYear(), month, 0);
        console.log(expiredActiveTime);
        return lastMonth.getTime() < expiredActiveTime.getTime();
      });
      return validData;
    });
    const result = listData.map(item => {
      const nums = item.reduce((total, numItem) => {
        return total + numItem.amount;
      }, 0);
      return nums;
    })
    return result;
  }


  render() {
    if (this.state.dataChart) {
      console.log(this.countLiquidation(this.state.dataChart));
    }
    return (
      <div className={classes.StatisticalChart}>
        <Line
          height={100}
          data={{
            labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
            datasets: [
              {
                data: this.countActive(this.state.dataChart),
                label: "Thiết bị đang dùng",
                borderColor: "#3e95cd",
                fill: false
              },
              {
                data: this.countMaintenance(this.state.dataChart),
                label: "Thiết bị cần bảo trì",
                borderColor: "#8e5ea2",
                fill: false
              },
              {
                data: this.countLiquidation(this.state.dataChart),
                label: "Thiết bị cần thanh lý",
                borderColor: "#3cba9f",
                fill: false
              },

            ]
          }}
          options={{
            title: {
              display: true,
              text: "BIỂU ĐỒ THỐNG KÊ TÌNH TRẠNG THIẾT BỊ THEO THÁNG"
            },
            legend: {
              display: true,
              position: "bottom"
            }
          }}
        />

      </div>
    );
  }
}

export default StatisticalChart;