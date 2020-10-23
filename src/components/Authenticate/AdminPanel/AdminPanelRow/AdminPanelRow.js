import React from 'react';
import classes from './AdminPanelRow.css';

const adminPanelRow = (props) => {
    return (
        <tr className={classes.AdminPanelRow}>
            <td>{props.stt}</td>
            <td>{props.username}</td>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.roleType}</td>
            <td className={props.status}>{props.status}</td>
            <td>{props.createdDate}</td>
            <td>{props.updatedDate}</td>
            <td className={classes.ButtonGroup}>
                <button className="btn btn-primary" onClick={props.edit}>Edit</button>
                <button type="reset" className="btn btn-danger" onClick={props.delete}>Delete</button>
            </td>
        </tr>
    );
}

export default adminPanelRow;