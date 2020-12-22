import React, { Component } from 'react';
import classes from './Search.css'
class Search extends Component {
    state = {
        tempValue: ''
    }
    search = (event) => {
        this.setState({
            tempValue: event.target.value
        })
        this.props.checkConnectProps(this.state.tempValue)
        if (event.target.value.length === 0) {
            this.props.check()
        }
        if (event.target.value.length > 0) {
            this.props.check2()
        }
    }
    render() {
        return (
            <div className={classes.Search}>
                <div>
                    <input onChange={(event) => this.search(event)} type="text" placeholder="Tìm theo tên" />
                </div>
            </div>
        );
    }
}

export default Search;