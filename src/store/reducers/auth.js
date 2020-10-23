import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../utility';

const initState = {
    token: null,
    id: null,
    userName: null,
    role: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    deleteId: null
};

const authStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        id: action.userId,
        userName: action.userName,
        loading: false,
        role: action.role
    });
};
const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        id: null
    });
};

const deleteStart = (state, action) => {
    return updateObject(state, {
        deleteId: action.deleteId
    });
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.DELETE_START: return deleteStart(state, action);
        // case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }
};

export default reducer;