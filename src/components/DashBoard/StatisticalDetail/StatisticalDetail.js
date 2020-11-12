import React from 'react';
import ItemDetail from './ItemDetail/ItemDetail';
import classes from './StatisticalDetail.css';

const statisticalDetail = props => {

    const render = props.data.map((item) => {
        return <ItemDetail
            title={item.title}
            subTitle={item.subTitle}
            quantity={item.quantity}
            type={item.type}
            key={item.type} />
    })
    return (
        <div className={classes.Row}>
            <h3>{props.title}</h3>

            <div className="row">
                {render}
            </div>
        </div>
    )
}

export default statisticalDetail;