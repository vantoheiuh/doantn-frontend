import React from 'react';
import ItemDetail from './ItemDetail/ItemDetail';

const statisticalDetail = props => {
    return (
        <div className="row">
            <ItemDetail title="Title" subTitle="sub title" quantity="5000" type="first" />
            <ItemDetail title="Title" subTitle="sub title" quantity="5000" type="second" />
            <ItemDetail title="Title" subTitle="sub title" quantity="5000" type="third" />
            <ItemDetail title="Title" subTitle="sub title" quantity="5000" type="fourth" />
        </div>
    )
}

export default statisticalDetail;