import React, { Component } from 'react';
import {  Alert, AlertContainer } from "react-bs-notifier";

class AlertInfo extends Component {
    handleDismiss=()=>{
        this.props.alertOff()
    }
    render() {
        if(this.props.alertShow === false) return null;
        //console.log(this.props.checkAlert);
       // if(this.props.checkAlert === 1)
        return (
            <div>
                <AlertContainer position="top-right" >
                    {this.props.checkAlert ? (<Alert  type="success"  onDismiss={()=>this.handleDismiss()} 
                        timeout={1000}>{this.props.status}</Alert>)
                    : <Alert  type="danger"  onDismiss={()=>this.handleDismiss()} 
                        timeout={1000}>{this.props.status}</Alert>}
                
                
                </AlertContainer>
            </div>
        );
    }
}

export default AlertInfo;