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
                    {props.productInfo ? <img alt="Product" src={`http://54.151.129.13:5000/${props.productInfo.image}`} /> : null}
                </div>
                {props.productInfo ? <div className={classes.Info}>
                    <h1>{props.productInfo.name}</h1>
                    <ul>
                        <li>
                            <span>Giá (vnd)</span>
                            <span>{props.productInfo.price}</span>
                        </li>
                        <li>
                            <span>Số lượng </span>
                            <span>{props.productInfo.amount}</span>
                        </li>
                        <li>
                            <span>Thời gian checkin </span>
                            <span>{props.productInfo.checkinTime.slice(0, 10)}</span>
                        </li>
                        <li>
                            <span>hạn thanh lí </span>
                            <span>{props.productInfo.expiredTime}</span>
                        </li>
                        <li>
                            <span>Hạn Bảo trì </span>
                            <span>{props.productInfo.activeTime}</span>
                        </li>
                        <li>
                            <span>Nguồn </span>
                            <span>{props.productInfo.source}</span>
                        </li>
                        <li>
                            <span>Trạng thái </span>
                            <span>{props.productInfo.statusDevice}</span>
                        </li>
                        <li>
                            <span>Vị trí </span>
                            <span>Phòng {props.productInfo.locate}</span>
                        </li>
                        <li>
                            <span>Thêm bởi </span>
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