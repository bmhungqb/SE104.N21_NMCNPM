import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
import {
    getMonthStatisticService,
    getAllMonthStatisticService,
    getBookReportsService,
    getDebtReportsService
} from '../../services/statisticService';
export const fetchMonthStatistic = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getMonthStatisticService();
            if (res && res.errCode === 0) {
                await dispatch(fetchMonthStatisticSuccess(res.monthlyStatistic));
            } else {
                await dispatch(fetchMonthStatisticFailed());
            }
        } catch (e) {
            await dispatch(fetchMonthStatisticFailed());
        }
    }
}

export const fetchMonthStatisticSuccess = (data) => ({
    type: actionTypes.FETCH_MONTH_STATISTIC_SUCCESS,
    datacurrentMonthStatistic: data
})

export const fetchMonthStatisticFailed = () => ({
    type: actionTypes.FETCH_MONTH_STATISTIC_FAILED
})

export const fetchAllMonthStatistics = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllMonthStatisticService();
            if (res && res.errCode === 0) {
                await dispatch(fetchAllMonthStatisticSuccess(res.yearStatistic));
            } else {
                await dispatch(fetchAllMonthStatisticFailed());
            }
        } catch (e) {
            await dispatch(fetchMonthStatisticFailed());
        }
    }
}

export const fetchAllMonthStatisticSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_STATISTIC_SUCCESS,
    dataStatisticAllMonth: data
})

export const fetchAllMonthStatisticFailed = () => ({
    type: actionTypes.FETCH_ALL_STATISTIC_FAILED
})

export const getBookReports = (month) => {
    return async (dispatch, getState) => {
        try {
            let res = await getBookReportsService(month);
            if (res && res.errCode === 0) {
                await dispatch(fetchBookReportStatisticSuccess(res.currentDatas));
            } else {
                await dispatch(fetchBookReportStatisticFailed());
            }
        } catch (e) {
            await dispatch(fetchBookReportStatisticFailed());
        }
    }
}

export const fetchBookReportStatisticSuccess = (data) => ({
    type: actionTypes.FETCH_BOOK_REPORT_SUCCESS,
    bookReport: data
})

export const fetchBookReportStatisticFailed = () => ({
    type: actionTypes.FETCH_BOOK_REPORT_FAILED
})

export const getDebtReports = (month) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDebtReportsService(month);
            if (res && res.errCode === 0) {
                console.log("month: ", month, res)
                await dispatch(fetchDebtReportStatisticSuccess(res.currentDatas));
            } else {
                await dispatch(fetchDebtReportStatisticFailed());
            }
        } catch (e) {
            await dispatch(fetchDebtReportStatisticFailed());
        }
    }
}

export const fetchDebtReportStatisticSuccess = (data) => ({
    type: actionTypes.FETCH_DEBT_REPORT_SUCCESS,
    debtReport: data
})

export const fetchDebtReportStatisticFailed = () => ({
    type: actionTypes.FETCH_DEBT_REPORT_FAILED
})