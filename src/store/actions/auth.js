import * as  actionTypes from './actionTypes';
import axios from '../../axios-auth';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.token,
        userName: authData.username,
        userId: authData.id,
        role: authData.role,
        status: authData.status
    }
}

export const authFailed = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    localStorage.removeItem('status');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const updateStart = () => {
    return {
        type: actionTypes.ACCOUNT_UPDATE
    }
}

export const checkAuthTimeout = (expireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expireTime * 1000)// change milisecond to second by mutiple with 1000
    }
}



export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        //some async code
        const authData = {
            username: username,
            password: password,
        }
        const url = '/api/users/authenticate';
        axios.post(url, authData)
            .then(res => {
                console.log(res.data);
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.id);
                localStorage.setItem('userName', res.data.username);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('status', res.data.status);
                dispatch(authSuccess(res.data));
                dispatch(checkAuthTimeout(3600)); // logout if token expired
            })
            .catch(err => {
                dispatch(authFailed(err));
                console.log(err);
            })
    }
}

export const updateUser = (dataUpdate, token) => {
    return dispatch => {
        dispatch(updateStart());
        const AuthStr = 'Bearer '.concat(token);
        const url = '/api/users/' + dataUpdate.id;
        axios({
            method: 'put',
            url: url,
            data: dataUpdate,
            headers: { 'Content-Type': 'application/json', 'Authorization': AuthStr },
            json: true
        })
            .then(res => {

            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expirationDate');
        if (!token) {
            dispatch(authLogout());
        } else {
            if (expirationDate <= new Date()) {
                dispatch(authLogout());
            } else {
                const userId = localStorage.getItem('userId');
                const role = localStorage.getItem('role');
                const userName = localStorage.getItem('userName')
                const authData = {
                    token: token,
                    id: userId,
                    role: role,
                    username: userName
                };
                dispatch(authSuccess(authData));
                const timeOut = ((new Date(expirationDate).getTime() - new Date().getTime()) / 1000).toFixed(0);
                dispatch(checkAuthTimeout(timeOut));
            }
        }
    }
}

export const deleteUserById = (token, id) => {
    return dispatch => {
        const AuthStr = 'Bearer '.concat(token);
        const url = '/api/users/' + id;
        axios({
            method: 'delete',
            url: url,
            headers: { 'Content-Type': 'application/json', 'Authorization': AuthStr },
            json: true
        })
            .then(res => {

            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const deleteStart = (id) => {
    return {
        type: actionTypes.DELETE_START,
        deleteId: id
    }
}
