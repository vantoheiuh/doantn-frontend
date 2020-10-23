import React, { Component } from 'react';
import classes from './TableData.css';
import TableDataRow from './TableDataRow/TableDataRow';
import ProductDetail from './ProductDetail/ProductDetail';


class TableData extends Component {
  state = {
    showProductDetail: false,
    productInfo: null
  }


  showProductDetailHanlder = (productInfo) => {
    this.setState({
      showProductDetail: true,
      productInfo: { ...productInfo }
    })
  };
  hideProductDetailHandler = () => {
    this.setState({
      showProductDetail: false,
      productInfo: null
    })
  };
  render() {
    let listTable = this.props.tableData.map((item, index) => {
      return (
        <TableDataRow key={index} stt={index + 1}
          id={item._id.slice(3, item._id.length)}
          name={item.name}
          price={item.price}
          amount={item.amount}
          checkinTime={item.checkinTime.slice(0, 10)}
          expiredTime={item.expiredTime}
          activeTime={item.activeTime}
          quantity={item.quantity}
          source={item.source}
          statusDevice={item.statusDevice}
          imageURL={item.image}
          locate={item.locate}
          edit={() => this.props.edit(item)}
          delete={() => this.props.delete(item._id, item.name)}
          showDetail={() => this.showProductDetailHanlder(item)} />
      )
    })
    return (
      <div className={classes.TableData}>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Checkin Time</th>
              <th>Active Time</th>
              <th>Expired Time</th>
              <th>Quantity</th>
              <th>Source</th>
              <th>Locate</th>
              <th>Barcode</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listTable}
          </tbody>
        </table>
        <ProductDetail show={this.state.showProductDetail} close={this.hideProductDetailHandler} productInfo={this.state.productInfo}/>
      </div>
    );
  }
}

export default TableData;