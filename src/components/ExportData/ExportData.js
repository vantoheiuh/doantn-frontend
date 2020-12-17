import React from "react";
import { ButtonExportExcel } from '@alckor127/react-button-export-excel'
import classes from './ExportData.css';
import ImportExportIcon from '@material-ui/icons/ImportExport';

class ExportData extends React.Component {
    render() {
        const d = new Date();
        const str = 'export_' + d.getFullYear() + '' + (d.getMonth() + 1) + '' + d.getDate() + '_' + d.getTime();
        return (
            <div className={classes.ExportData}>
                <ButtonExportExcel dark outline data={this.props.dataset} filename={str}>
                    <ImportExportIcon />Export
                </ButtonExportExcel>
            </div>
        );
    }
}
export default ExportData