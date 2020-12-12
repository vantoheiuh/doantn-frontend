import React, { Component } from 'react';
import classes from './TableData.css';
import TableDataRow from './TableDataRow/TableDataRow';
import ProductDetail from './ProductDetail/ProductDetail';
import Footer from '../UI/Footer/Footer';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';




class TableData extends Component {
  state = {
    showProductDetail: false,
    productInfo: null,
    range: 0
  }

  //show product detail modal
  showProductDetailHanlder = (productInfo) => {
    this.setState({
      showProductDetail: true,
      productInfo: { ...productInfo }
    })
  };

  //hide show product detail modal
  hideProductDetailHandler = () => {
    this.setState({
      showProductDetail: false,
      productInfo: null
    })
  };

  // next 10 row

  onNextRowHandler = () => {
    if (this.state.range <= this.props.tableData.length && this.props.tableData.length > 10) {
      this.setState({ range: this.state.range + 10 });
    }
    console.log(this.state.range)
  }


  // back 10 row
  onPrevRowHandler = () => {
    if (this.state.range > 0) {
      this.setState({ range: this.state.range - 10 });
    }
    console.log(this.state.range)

  }

  render() {
    console.log(this.props.tableData)
    let listTable = this.props.tableData.filter((item, index) => {
      //filter 10 item from range to range + 10
      if (this.state.range === 0) {
        return index < 10;
      }
      return index >= this.state.range && index < this.state.range + 10;
    }).map((item, index) => {
      return (
        <TableDataRow key={index} stt={index + 1 + this.state.range}
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
        <div className="container">
          <div className={classes.TableTitle}>
            <div>
              <div>
                <h2 style={{ 'fontWeight': 'bolder' }}>QUẢN LÍ THIẾT BỊ</h2>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Checkin Time</th>
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
          <div className={classes.FilterRow}>
            <div>
              {
                this.props.tableData.length < 10 ?
                  <span>1-{this.props.tableData.length} of {this.props.tableData.length}</span> :
                  <span>{this.state.range + 1}-{this.state.range + listTable.length} of {this.props.tableData.length}</span>
              }

            </div>
            <div>
              <span onClick={this.onPrevRowHandler}><ArrowLeftIcon fontSize="large" /></span>
              <span onClick={this.onNextRowHandler}><ArrowRightIcon fontSize="large" /></span>
            </div>
          </div>
          <ProductDetail show={this.state.showProductDetail} close={this.hideProductDetailHandler} productInfo={this.state.productInfo} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default TableData;