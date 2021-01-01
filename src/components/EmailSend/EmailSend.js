import React, { Component } from 'react';
import axios from '../../axios-auth';
import classes from './EmailSend.css';
import { connect } from 'react-redux';

class EmailSend extends Component {
    state = {
        subject: null,
        message: null,
        userdata: null,
        bccMails: null,
        isSent: false
    }
    componentDidMount() {
        const AuthStr = 'Bearer '.concat(this.props.token);
        const URL = '/api/users';
        axios.get(URL, { headers: { Authorization: AuthStr } })
            .then(response => {
                // If request is good...
                this.setState({ userdata: response.data, loading: false });
                let bccMails = response.data.map(item => {
                    if (item.email) {
                        return item.email;
                    }
                }).filter(item => item ? item : null);
                this.setState({ bccMails: bccMails.join(',') });
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
                emails: this.state.bccMails
            }
        }
        axios.post('https://api.emailjs.com/api/v1.0/email/send', data);
        this.setState({ isSent: true });
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
                <div>
                    <h3>Gửi thông báo cho nhân viên</h3>
                    <form>
                        <div>
                            <label>Chủ đề:</label>
                            <input type="text" name="subject" onChange={this.inputHandler}></input>
                        </div>
                        <div><label>Nội dung:</label>
                            <textarea rows="4" name="message" onChange={this.inputHandler}></textarea>
                        </div>
                        <div>
                            <button type="reset" className="btn btn-primary" onClick={this.sendMailHandler}>Xác nhận gửi</button>
                        </div>
                    </form>
                    {this.state.isSent ? <p style={{color: 'green'}}>Gửi thành công.</p>: <p></p>}
                </div>
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