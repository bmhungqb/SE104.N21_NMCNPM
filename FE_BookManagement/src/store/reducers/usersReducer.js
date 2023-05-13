import actionTypes from '../actions/actionTypes';

const initialState = {
    listUsers: [],
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        // CRUD USER
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.listUsers = action.dataUsers
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.listUsers = []
            return {
                ...state
            }
        default:
            return state;
    }
}
export default usersReducer;