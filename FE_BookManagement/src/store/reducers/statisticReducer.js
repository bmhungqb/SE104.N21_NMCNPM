import actionTypes from '../actions/actionTypes';
const initialState = {
    currentMonthStatistic: [],
    allMonthStatistic: [],
    dataBookReport: []
}

const statisticReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MONTH_STATISTIC_SUCCESS:
            state.currentMonthStatistic = action.datacurrentMonthStatistic
            return {
                ...state
            }
        case actionTypes.FETCH_MONTH_STATISTIC_FAILED:
            state.currentMonthStatistic = []
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_STATISTIC_SUCCESS:
            state.allMonthStatistic = action.dataStatisticAllMonth
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_STATISTIC_FAILED:
            state.allMonthStatistic = []
            return {
                ...state
            }
        case actionTypes.FETCH_BOOK_REPORT_SUCCESS:
            state.dataBookReport = action.dataBookReport
        case actionTypes.FETCH_BOOK_REPORT_FAILED:
            state.dataBookReport = []
        default:
            return state
    }
}

export default statisticReducer;