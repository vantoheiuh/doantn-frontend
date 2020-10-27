import React, { Component } from 'react';
import classes from './AdminPanel.css';
import AdminPanelRow from './AdminPanelRow/AdminPanelRow';
import EditModal from './EditModal/EditModal';
import DeleteModal from './DeleteModal/DeleteModal';
import AddModal from './AddModal/AddModal';
import Aux from '../../../hoc/Aux/Aux';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class AdminPanel extends Component {
    state = {
        isEditModalShow: false,
        isAddModalShow: false,
        isDeleteModalShow: false,
        deleteConfirm: false,
        rowData: null,
        userData: null,
        forceUpdate: false
    }


    componentDidMount() {
        const AuthStr = 'Bearer '.concat(this.props.token);
        const URL = 'http://localhost:5000/api/users';
        axios.get(URL, { headers: { Authorization: AuthStr } })
            .then(response => {
                // If request is good...
                this.setState({ rowData: response.data });
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

    deleteUserHandler = (id) => {
        this.props.onDeleteStart(id);
        this.setState({ isDeleteModalShow: true });
    }

    confirmDeleteUser = async () => {
        await this.props.onDeleteUser(this.props.token, this.props.deleteId);
        this.setState({ isDeleteModalShow: false, forceUpdate: !this.state.forceUpdate });
    }

    render() {
        
        let listRow = null;
        if (this.state.rowData) {
            listRow = this.state.rowData.map((row, index) => {
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
                <div className={classes.AdminPanel}>
                    <div className={classes.TableTitle}>
                        <div>
                            <div>
                                <h2>Manage Users</h2>
                            </div>
                            <div>
                                <button className="btn btn-success" onClick={this.showAddModal} > <span>New User</span></button>
                                <button className="btn btn-danger"> <span>Delete</span></button>
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
                </div>
                <EditModal show={this.state.isEditModalShow} btnClicked={this.closeEditModal} userData={{ ...this.state.userData }} />
                <AddModal show={this.state.isAddModalShow} btnClicked={this.closeAddModal} />
                <DeleteModal show={this.state.isDeleteModalShow} confirm={this.confirmDeleteUser} />
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        deleteId: state.auth.deleteId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDeleteUser: (token, id) => dispatch(actions.deleteUserById(token, id)),
        onDeleteStart: id => dispatch(actions.deleteStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);