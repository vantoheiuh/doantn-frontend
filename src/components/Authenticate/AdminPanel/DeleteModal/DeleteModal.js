import React from 'react';
import classes from './DeleteModal.css';

const deleteModal = props => {
    let ModalStyle = props.show ? {
        display: "block"
    } : {
            display: "none"
        }
    return (
        <div className={classes.DeleteModal} style={ModalStyle}>
            <div className={classes.DeleteModalContent}>
                    <h3>Xác nhận xoá?</h3>
                    <div>
                        <button className="btn btn-danger" onClick={props.cancel}>Huỷ</button>
                        <button className="btn btn-primary" onClick={props.confirm}>Xác nhận</button>
                    </div>
            </div>
        </div>
    )
}


export default deleteModal;