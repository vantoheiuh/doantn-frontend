import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
    {
        name: "Johson",
        amount: 30000,
        sex: 'M',
        is_married: true
    },
    {
        name: "Monika",
        amount: 355000,
        sex: 'F',
        is_married: false
    },
    {
        name: "John",
        amount: 250000,
        sex: 'M',
        is_married: false
    },
    {
        name: "Josef",
        amount: 450500,
        sex: 'M',
        is_married: true
    }
];


class ExportData extends React.Component {

    render() {
        console.log(this.props.dataset)
        return (
            <ExcelFile element={<button>Export Excel</button>}>
                {this.props.sheetName === "Users" ?
                    <ExcelSheet data={this.props.dataset} name={this.props.sheetName}>
                        <ExcelColumn label="ID" value="id" />
                        <ExcelColumn label="Tên tài khoản" value="username" />
                        <ExcelColumn label="Họ" value="firstName" />
                        <ExcelColumn label="Tên" value="lastName" />
                        <ExcelColumn label="CMND" value="idNumber" />
                        <ExcelColumn label="SĐT" value="phone" />
                        <ExcelColumn label="Ngày sinh" value="birthDay" />
                        <ExcelColumn label="Chức vụ" value="role" />
                        <ExcelColumn label="Trạng thái" value="status" />
                        <ExcelColumn label="Ngày tạo"
                            value={(col) => col.createdAt.slice(0, 10)} />
                        <ExcelColumn label="Cập nhật"
                            value={(col) => col.updatedAt.slice(0, 10)} />
                    </ExcelSheet> :
                    <ExcelSheet data={this.props.dataset} name="Devices">
                        <ExcelColumn label="ID" value="_id" />
                        <ExcelColumn label="Tên thiết bị" value="name" />
                        <ExcelColumn label="Giá" value="price" />
                        <ExcelColumn label="Số lượng" value="amount" />
                        <ExcelColumn label="Vị trí" value="locate" />
                        <ExcelColumn label="Nguồn" value="source" />
                        <ExcelColumn label="Trạng thái" value="statusDevice" />
                        <ExcelColumn label="Image" value={col => "http://54.151.134.255:5000/" + col.image} />
                        <ExcelColumn label="Hạn bảo trì" value={col => col.activeTime + " năm"} />
                        <ExcelColumn label="Hạn thanh lí" value={col => col.expiredTime + " năm"} />
                        <ExcelColumn label="Ngày mua"
                            value={(col) => col.checkinTime.slice(0, 10)} />
                    </ExcelSheet>

                }
            </ExcelFile>
        );
    }
}
export default ExportData;