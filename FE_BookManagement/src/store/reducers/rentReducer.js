import actionTypes from '../actions/actionTypes';
const initialState = {
    listRents: [],
    listRentsDetail: [],
}

const rentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_RENTS_SUCCESS:
            state.listRents = action.dataRents
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_RENTS_FAILED:
            state.listRents = []
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_RENTS_DETAIL_SUCCESS:
            state.listRentsDetail = action.dataRentsDetail
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_INVOICES_DETAIL_FAILED:
            state.listRentsDetail = []
            return {
                ...state
            }
        default:
            return state
    }
}

export default rentReducer;