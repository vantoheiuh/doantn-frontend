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
                    <h3>Confirm Delete?</h3>
                    <div>
                        <button className="btn btn-danger">Cancel</button>
                        <button className="btn btn-primary" onClick={props.confirm}>Confirm</button>
                    </div>
            </div>
        </div>
    )
}


export default deleteModal;