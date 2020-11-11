import React, { Component } from 'react';
import classes from './DashBoard.css';
import StatisticalDetail from './StatisticalDetail/StatisticalDetail';

class DashBoard extends Component {
    render() {

        return (
            <div className={classes.DashBoard}>
                <div className="container">
                    <StatisticalDetail />

                </div>
            </div>
        )
    }
}

export default DashBoard;