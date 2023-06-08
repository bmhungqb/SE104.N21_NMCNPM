import actionTypes from '../actions/actionTypes';
const initialState = {
    listInvoices: [],
    listInvoicesDetail: [],
}

const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_INVOICES_SUCCESS:
            state.listInvoices = action.dataInvoices
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_INVOICES_FAILED:
            state.listInvoices = []
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_INVOICES_DETAIL_SUCCESS:
            state.listInvoicesDetail = action.dataInvoicesDetail
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_INVOICES_DETAIL_FAILED:
            state.listInvoicesDetail = []
            return {
                ...state
            }
        default:
            return state
    }
}

export default invoiceReducer;