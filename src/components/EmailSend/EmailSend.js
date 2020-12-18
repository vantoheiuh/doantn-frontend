import React, { Component } from 'react';
import axios from '../../axios-auth';
import classes from './EmailSend.css';
import {connect} from 'react-redux';

class EmailSend extends Component {
    state = {
        subject: null,
        message: null,
        userdata: null
    }
    componentDidMount(){
        const AuthStr = 'Bearer '.concat(this.props.token);
        const URL = '/api/users';
        axios.get(URL, { headers: { Authorization: AuthStr } })
            .then(response => {
                // If request is good...
                this.setState({ userdata: response.data, loading: false });
                console.log(response.data)
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }

    sendMailHandler = () => {
        const data = {
            service_id: "service_pmepznl",
            template_id: "template_ux1kypf",
            user_id: "user_vFKjaZmXfFS0r2sVzh7pd",
            template_params: {
                subject: this.state.subject,
                email: "bachducnguyenvan9a5@gmail.com",
                message: this.state.message,
                emails: "vantoheiuh@gmail.com,october15th98@gmail.com"
            }
        }
        console.log(this.state.subject, this.state.message)
        axios.post('https://api.emailjs.com/api/v1.0/email/send', data)
    }
    inputHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }
    render() {
        return (
            <div className={classes.EmailSend}>
                <label>Subject</label>
                <input type="text" name="subject" onChange={this.inputHandler}></input>
                <label>Input message</label>
                <input type="textarea" name="message" onChange={this.inputHandler}></input>
                <button onClick={this.sendMailHandler}>Send</button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        deleteId: state.auth.deleteId,
    };
};
export default connect(mapStateToProps)(EmailSend);