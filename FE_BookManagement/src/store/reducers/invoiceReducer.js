import actionTypes from '../actions/actionTypes';
const initialState = {
    listInvoices: [],
}

const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_BOOKS_SUCCESS:
            state.listBooks = action.dataBooks
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_BOOKS_FAILED:
            state.listBooks = []
            return {
                ...state
            }
        default:
            return state
    }
}

export default invoiceReducer;