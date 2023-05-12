import actionTypes from '../actions/actionTypes';
const initialState = {
    listSuppliers: [],
}

const supplierReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_SUPPLIERS_SUCCESS:
            state.listSuppliers = action.dataSuppliers
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_SUPPLIERS_FAILED:
            state.listSuppliers = []
            return {
                ...state
            }
        default:
            return state
    }
}

export default supplierReducer;