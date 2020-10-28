import React from 'react';
import classes from './AdminPanelRow.css';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
                <button onClick={props.edit}><EditIcon fontSize="small"/></button>
                <button type="reset" onClick={props.delete}><DeleteIcon fontSize="small"/></button>
            </td>
        </tr>
    );
}

export default adminPanelRow;