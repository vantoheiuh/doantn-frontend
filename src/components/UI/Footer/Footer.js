import React from 'react';
import classes from './Footer.css';

const footer = props => {
    return (
        <div className={`"container-fluid ${classes.Footer} `}>
            <span>© KLTN 2020. Quản lí thiết bị tài sản công ty. </span>
        </div>
    )
}

export default footer;