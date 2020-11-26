import React, { Component } from 'react';
import classes from './AdminPanel.css';
import AdminPanelRow from './AdminPanelRow/AdminPanelRow';
import EditModal from './EditModal/EditModal';
import DeleteModal from './DeleteModal/DeleteModal';
import AddModal from './AddModal/AddModal';
import Aux from '../../../hoc/Auxi/Auxi';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import AddIcon from '@material-ui/icons/Add';
import Spinner from '../../UI/Spinner/Spinner';
import Footer from '../../UI/Footer/Footer';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';


class AdminPanel extends Component {
    state = {
        isEditModalShow: false,
        isAddModalShow: false,
        isDeleteModalShow: false,
        deleteConfirm: false,
        rowData: null,
        userData: null,
        forceUpdate: false,
        range: 0,
        loading: true
    }


    componentDidMount() {
        const AuthStr = 'Bearer '.concat(this.props.token);
        const URL = 'http://localhost:5000/api/users';
        axios.get(URL, { headers: { Authorization: AuthStr } })
            .then(response => {
                // If request is good...
                this.setState({ rowData: response.data, loading: false });
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }

    componentDidUpdate(prevProps, prevState) {
        const AuthStr = 'Bearer '.concat(this.props.token);
        const URL = 'http://localhost:5000/api/users';
        if (this.state.forceUpdate !== prevState.forceUpdate) {

            axios.get(URL, { headers: { Authorization: AuthStr } })
                .then(response => {
                    // If request is good...
                    this.setState({ rowData: response.data, forceUpdate: false });

                })
                .catch((error) => {
                    console.log('error ' + error);
                });
        }
    }


    showEditModal = (userData) => {
        this.setState({
            isEditModalShow: true,
            userData: { ...userData }
        })
    }
    showAddModal = () => {
        this.setState({
            isAddModalShow: true
        })
    }
    closeEditModal = () => {
        this.setState({
            isEditModalShow: false,
            forceUpdate: true
        })
    }
    closeAddModal = () => {
        this.setState({
            isAddModalShow: false,
            forceUpdate: !this.state.forceUpdate
        })
    }

    showDeleteModal = () => {
        this.setState({
            isDeleteModalShow: true
        })
    }
    closeDeleteModal = () => {
        this.setState({
            isDeleteModalShow: false
        })
    }

    deleteUserHandler = (id) => {
        this.props.onDeleteStart(id);
        this.setState({ isDeleteModalShow: true });
    }

    confirmDeleteUser = async () => {
        await this.props.onDeleteUser(this.props.token, this.props.deleteId);
        this.setState({ isDeleteModalShow: false, forceUpdate: !this.state.forceUpdate });
    }

    // next 10 row

    onNextRowHandler = () => {
        if (this.state.range <= this.state.rowData.length && this.state.rowData.length > 10) {
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
        let listRow = null;
        if (this.state.rowData) {
            listRow = this.state.rowData.filter((item, index) => {
                if (this.state.range == 0) {
                    return index < 10;
                }
                return index >= this.state.range && index < this.state.range + 10;

            }).map((row, index) => {
                return <AdminPanelRow
                    key={row.id}
                    stt={index + 1}
                    username={row.username}
                    firstName={row.firstName}
                    lastName={row.lastName}
                    createdDate={row.createdAt.slice(0, 10)}
                    updatedDate={row.updatedAt.slice(0, 10)}
                    roleType={row.role}
                    status={row.status}
                    edit={() => this.showEditModal(row)}
                    delete={() => this.deleteUserHandler(row.id)} />

            })
        }
        return (
            <Aux>
                {this.state.loading ? <Spinner /> :
                    <div className={classes.TableData}>
                        <div className="container">
                            <div className={classes.TableTitle}>
                                <div>
                                    <div>
                                        <h2 style={{ 'fontWeight': 'bolder' }}>QUẢN LÍ TÀI KHOẢN</h2>
                                    </div>
                                    <div>
                                        <button className="btn btn-success" onClick={this.showAddModal} > <AddIcon /> Thêm tài khoản</button>
                                    </div>
                                </div>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Username</th>
                                        <th>Fist name</th>
                                        <th>Last name</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Date Created</th>
                                        <th>Date Updated</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listRow}
                                </tbody>
                            </table>
                            <div className={classes.FilterRow}>
                                <div>
                                    {
                                        this.state.rowData.length < 10 ? 
                                        <span>1-{this.state.rowData.length} of { this.state.rowData.length }</span>:
                                        <span>1-10 of { this.state.rowData.length }</span>
                                    }
                                    
                                </div>
                                <div>
                                    <span onClick={this.onPrevRowHandler}><ArrowLeftIcon fontSize="large" /></span>
                                    <span onClick={this.onNextRowHandler}><ArrowRightIcon fontSize="large" /></span>
                                </div>
                            </div>
                        </div>
                        <Footer />

                    </div>}
                <EditModal show={this.state.isEditModalShow} btnClicked={this.closeEditModal} userData={{ ...this.state.userData }} />
                <AddModal show={this.state.isAddModalShow} btnClicked={this.closeAddModal} />
                <DeleteModal show={this.state.isDeleteModalShow} cancel={this.closeDeleteModal} confirm={this.confirmDeleteUser} />
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        deleteId: state.auth.deleteId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDeleteUser: (token, id) => dispatch(actions.deleteUserById(token, id)),
        onDeleteStart: id => dispatch(actions.deleteStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);