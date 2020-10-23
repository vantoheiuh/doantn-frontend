import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import classes from './Chart.css';
// import Chart from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
class Chart extends Component {
    render() {

        let chartData = {
            labels: ["Tổng số lượng", "Đang dùng", "Đang bảo trì"],
            datasets: [
                {
                    label: "Population (millions)",
                    backgroundColor: [
                        "#3e95cd",
                        "#8e5ea2",
                        "#3cba9f",
                        "#e8c3b9",
                        "#c45850"
                    ],
                    data: [this.props.maint, this.props.using, this.props.mainTained],
                    color: 'red'
                }
            ],

        }

        return (
            <div className={classes.Chart}>
                <Doughnut
                    data={chartData}
                    height={300}
                    options={{
                        legend: { position: "bottom", align: "start" },
                        title: {
                            display: true,
                            text: "Predicted world population (millions) in 2050",
                            fontSize: 20,
                            fontColor: "orange",
                            fontFamily: "Segoe UI",
                        }
                    }}
                />
            </div>
        );
    }
}

export default Chart;