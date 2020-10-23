import React, { Component } from 'react';
import classes from './NotFound.css'
class NotFound extends Component {
    render() {
        return (
            <div className={classes.NotFound}>
                <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600;900&display=swap" rel="stylesheet" />
                <div className={classes.MainBox}>
                    <div className={classes.Err}>4</div>
                    <div className={classes.Err1}>0</div>
                    <div className={classes.Err2}>4</div>
                    <div className={classes.Message}>Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let's go <a href="/">home</a> and try from there.</p></div>
                </div>
            </div>
        );
    }
}

export default NotFound;