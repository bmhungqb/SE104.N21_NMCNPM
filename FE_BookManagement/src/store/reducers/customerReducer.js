import actionTypes from '../actions/actionTypes';
const initialState = {
    listCustomers: [],
}

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_CUSTOMERS_SUCCESS:
            state.listCustomers = action.dataCustomers
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CUSTOMERS_FAILED:
            state.listCustomers = []
            return {
                ...state
            }
        default:
            return state
    }
}

export default customerReducer;