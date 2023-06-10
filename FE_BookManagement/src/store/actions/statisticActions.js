import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
import {
    getMonthStatisticService,
    getAllMonthStatisticService,
    getBookReportsService,
    getDeptReportsService
} from '../../services/statisticService';
export const fetchMonthStatistic = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getMonthStatisticService();
            dispatch(fetchMonthStatisticSuccess(res.monthlyStatistic));
            // if (res && res.errCode === 0) {
            // } else {
            //     toast.error("Fetch all rents error")
            //     dispatch(fetchMonthStatisticFailed());
            // }
        } catch (e) {
            dispatch(fetchMonthStatisticFailed());
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
                dispatch(fetchAllMonthStatisticSuccess(res.yearStatistic));
            } else {
                dispatch(fetchAllMonthStatisticFailed());
            }
        } catch (e) {
            dispatch(fetchMonthStatisticFailed());
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
                dispatch(fetchBookReportStatisticSuccess(res.currentDatas));
            } else {
                dispatch(fetchBookReportStatisticFailed());
            }
        } catch (e) {
            dispatch(fetchBookReportStatisticFailed());
        }
    }
}

export const fetchBookReportStatisticSuccess = (data) => ({
    type: actionTypes.FETCH_BOOK_REPORT_SUCCESS,
    dataBookReport: data
})

export const fetchBookReportStatisticFailed = () => ({
    type: actionTypes.FETCH_BOOK_REPORT_FAILED
})