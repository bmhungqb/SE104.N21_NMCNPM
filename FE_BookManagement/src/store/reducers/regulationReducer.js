import actionTypes from '../actions/actionTypes';
const initialState = {
    listRegulations: [],
}

const regulationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_REGULATIONS_SUCCESS:
            state.listRegulations = action.dataRegulations
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_REGULATIONS_FAILED:
            state.listRegulations = []
            return {
                ...state
            }
        default:
            return state
    }
}

export default regulationReducer;