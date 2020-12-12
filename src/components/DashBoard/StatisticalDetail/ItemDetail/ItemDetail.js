import React from 'react';
import classes from './ItemDetail.css';

const itemDetail = props => {
    const classesSub = ["Content", "first"];
    return (
        <div className={`col-xl-3 col-md-6 ${classes.Item}`}>
            {classesSub ? <div className={`${classes.Content} ${classes[props.type]}`}>
                <div className={classes.ContentLeft}>
                    <p>{props.title}</p>
                    <h2>{props.quantity}</h2>
                    <p>{props.subTitle}</p>
                </div>
                <div className={classes.ContentRight}></div>
            </div>: null}
            
        </div>
    );
}

export default itemDetail;