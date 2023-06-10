import { STOP_PROP_TAG } from 'react-data-table-component';
import actionTypes from '../actions/actionTypes';
const initialState = {
    currentMonthStatistic: [],
    allMonthStatistic: [],
    dataBookReport: [],
    dataDebtReport: [],
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
            state.dataBookReport = action.bookReport
            return {
                ...state
            }
        case actionTypes.FETCH_BOOK_REPORT_FAILED:
            state.dataBookReport = []
            return {
                ...state
            }
        case actionTypes.FETCH_DEBT_REPORT_SUCCESS:
            state.dataDebtReport = action.debtReport
            return {
                ...state
            }
        case actionTypes.FETCH_DEBT_REPORT_FAILED:
            state.dataDebtReport = []
            return {
                ...state
            }
        default:
            return state
    }
}

export default statisticReducer;