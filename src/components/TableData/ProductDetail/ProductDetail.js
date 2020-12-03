import React from 'react';
import classes from './ProductDetail.css';
import Barcode from '../../UI/Barcode/Barcode';
import '@fortawesome/fontawesome-free';

const productDetail = (props) => {

    let ModalStyle = props.show ? {
        display: "block"
    } : {
            display: "none"
        }
    return (
        <div className={classes.Modal} style={ModalStyle}>
            <div className={classes.ProductDetail}>
                <span onClick={props.close} className={classes.Exit}><i className="fas fa-times"></i></span>
                <div>
                    {props.productInfo ? <img alt="Product" src={`http://54.151.134.255:5000/${props.productInfo.image}`} /> : null}
                </div>
                {props.productInfo ? <div className={classes.Info}>
                    <h1>{props.productInfo.name}</h1>
                    <ul>
                        <li>
                            <span>Price </span>
                            <span>{props.productInfo.price}$</span>
                        </li>
                        <li>
                            <span>Amount </span>
                            <span>{props.productInfo.amount}</span>
                        </li>
                        <li>
                            <span>Checkin Time </span>
                            <span>{props.productInfo.checkinTime.slice(0, 10)}</span>
                        </li>
                        <li>
                            <span>Expired Time </span>
                            <span>{props.productInfo.expiredTime}</span>
                        </li>
                        <li>
                            <span>Active Time </span>
                            <span>{props.productInfo.activeTime}</span>
                        </li>
                        <li>
                            <span>Quantity </span>
                            <span>{props.productInfo.quantity}</span>
                        </li>
                        <li>
                            <span>Source </span>
                            <span>{props.productInfo.source}</span>
                        </li>
                        <li>
                            <span>Status Device </span>
                            <span>{props.productInfo.statusDevice}</span>
                        </li>
                        <li>
                            <span>Locate </span>
                            <span>{props.productInfo.locate}</span>
                        </li>
                        <li>
                            <span>Added by </span>
                            <span>Nguyen Van</span>
                        </li>
                        <li>
                            <span><Barcode value={props.productInfo._id}></Barcode></span>
                        </li>
                    </ul>
                </div> : null}
            </div>
        </div>
    );
}
export default productDetail;