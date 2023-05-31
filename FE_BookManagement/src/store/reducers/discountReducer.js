import actionTypes from '../actions/actionTypes';
const initialState = {
    listDiscounts: [],
}

const discountReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_DISCOUNTS_SUCCESS:
            state.listDiscounts = action.dataDiscounts
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DISCOUNTS_FAILED:
            state.listDiscounts = []
            return {
                ...state
            }
        default:
            return state
    }
}

export default discountReducer;