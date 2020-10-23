import React, { Component } from 'react';
import {  Alert, AlertContainer } from "react-bs-notifier";

class AlertAddNew extends Component {
    handleDismiss2=()=>{
        this.props.alertOffAdd()
    }
    render() {
        if(this.props.alertShowAdd === false) return null;
        //console.log(this.props.checkAlert);
       // if(this.props.checkAlert === 1)
        return (
            <div>
                <AlertContainer position="top-right" >
                    {this.props.checkAlertAdd ? (<Alert  type="success"  onDismiss={()=>this.handleDismiss2()} 
                        timeout={1000}>{this.props.status}</Alert>)
                    : <Alert  type="danger"  onDismiss={()=>this.handleDismiss2()} 
                        timeout={1000}>{this.props.status}</Alert>}
                
                
                </AlertContainer>
            </div>
        );
    }
}

export default AlertAddNew;