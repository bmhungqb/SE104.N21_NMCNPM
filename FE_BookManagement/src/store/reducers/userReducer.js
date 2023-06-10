import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfor: null,
    listUsers: [],
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            state.isLoggedIn = true;
            state.userInfor = action.userInfor
            return {
                ...state
            }
        case actionTypes.ADMIN_LOGIN_FAIL:
            state.isLoggedIn = false;
            state.userInfor = null;
            return {
                ...state
            }
        case actionTypes.PROCESS_LOGOUT:
            state.isLoggedIn = false;
            state.userInfor = null
            return {
                ...state
            }
        default:
            return state;
    }
}

export default appReducer;