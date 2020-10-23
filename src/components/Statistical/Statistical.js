import React, { Component } from 'react';
import LiquidationTable from './LiquidationTable/LiquidationTable';
import MaintenanceTable from './MaintenanceTable/MaintenanceTable';
import StatisticalChart from './StatisticalChart/StatisticalChart';
import classes from './Statistical.css';
import {
    BrowserRouter as Router,
    Switch, NavLink,
    Route,
    Redirect
} from "react-router-dom";
import DeviceRoomTable from './DeviceRoom/DeviceRoomTable';

class Statistical extends Component {
    render() {
        return (
            <div className={classes.Statistical}>
                <Router>
                    <div className={classes.navLeft}>
                        <h3>Menu</h3>
                        <ul>
                            <li>
                                <NavLink to="/statistical/chart" activeClassName={classes.active}>BIỂU ĐỒ THỐNG KÊ</NavLink>
                            </li>
                            <li>
                                <NavLink to="/statistical/liquidationTable" activeClassName={classes.active}>THIẾT BỊ CẦN THANH LÝ</NavLink>
                            </li>
                            <li>
                                <NavLink to="/statistical/maintenance" activeClassName={classes.active}>THIẾT BỊ CẦN BẢO TRÌ</NavLink>
                            </li>
                            <li>
                                <NavLink to="/statistical/deviceroom" activeClassName={classes.active}>THIẾT BỊ TRONG PHÒNG BAN</NavLink>
                            </li>
                        </ul>
                    </div>
                    <Switch>
                        <Route path="/statistical/deviceroom" exact  component={DeviceRoomTable} />
                        <Route path="/statistical/liquidationTable" exact  component={LiquidationTable} />
                        <Route path="/statistical/maintenance" exact  component={MaintenanceTable} />
                        <Route path="/statistical/chart"  exact component={StatisticalChart} />
                        <Redirect to="/statistical/chart"/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Statistical;