import React, { Component } from 'react';
import classes from './DashBoard.css';
import StatisticalDetail from './StatisticalDetail/StatisticalDetail';
import axios from '../../axios-auth';
import { connect } from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';
import StatisticalChart from '../Statistical/StatisticalChart/StatisticalChart';
import Footer from '../UI/Footer/Footer';

class DashBoard extends Component {

    state = {
        usersData: null,
        productsData: null,
        loading: true
    }

    componentDidMount() {
        const AuthStr = 'Bearer '.concat(this.props.token);
        const URL = '/api/users';
        axios.get(URL, { headers: { Authorization: AuthStr } })
            .then(response => {
                // If request is good...
                let result = response.data.reduce((total, item) => {
                    total.total++;
                    if (item.role === "admin") {
                        total.admin++;
                    } else if (item.role === "manager") {
                        total.manager++;
                    } else {
                        total.employee++;
                    }
                    if (item.status === "active") {
                        total.active++;
                    }
                    return total;
                }, { total: 0, active: 0, manager: 0, employee: 0 });
                this.setState({
                    usersData: [
                        { title: 'Tổng users', subTitle: 'Số lượng quản lí, nhân viên.', quantity: result.total, type: "first" },
                        { title: 'Quản lí', subTitle: 'Số lượng quản lí', quantity: result.manager, type: "second" },
                        { title: 'Nhân viên', subTitle: 'Số lượng nhân viên', quantity: result.employee, type: "third" },
                        { title: 'Đang hoạt động', subTitle: 'Số lượng đang hoạt động', quantity: result.active, type: "fourth" },
                    ]
                })
            })
            .catch((error) => {
                console.log('error ' + error);
            });

        axios.get('/api/products')
            .then(res => {
                let result = res.data.reduce((total, item) => {
                    total.total += item.amount;
                    if (item.statusDevice === "Using") {
                        total.using += item.amount;
                    } else {
                        total.maintenance += item.amount;
                    }
                    const exTime = item.checkinTime.slice(0, 10).split('-');
                    const exDate = new Date(Number(exTime[0]) + item.activeTime + item.expiredTime, Number(exTime[1]), Number(exTime[2]));
                    const today = new Date();
                    if (today.getTime() >= exDate.getTime()) {
                        total.liquidation += item.amount;
                    }
                    return total;
                }, { total: 0, using: 0, maintenance: 0, liquidation: 0 });
                this.setState({
                    productsData: [
                        { title: 'Tổng thiết bị', subTitle: 'Tổng số lượng thiết bị.', quantity: result.total, type: "first" },
                        { title: 'Đang sử dụng', subTitle: 'Thiết bị đang sử dụng', quantity: result.using, type: "second" },
                        { title: 'Đang bảo trì', subTitle: 'Thiết bị đang bảo trì', quantity: result.maintenance, type: "third" },
                        { title: 'Cần thanh lí', subTitle: 'Thiết bị cần thanh lí', quantity: result.liquidation, type: "fourth" },
                    ]
                })
            })
            .catch(err => {
                this.setState({ loading: false });
                console.log(err);
            })
    }

    render() {

        return (
            <div className={classes.DashBoard}>
                <div className="container" >
                    {this.state.usersData ? <StatisticalDetail title="Thống kê tài khoản" data={this.state.usersData} /> : <Spinner />}
                    {this.state.productsData ? <StatisticalDetail title="Thống kê thiết bị" data={this.state.productsData} /> : <Spinner />}
                    <div className={`"row" ${classes.Chart}`} >
                        <div className="col-12">
                            <StatisticalChart />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(DashBoard);