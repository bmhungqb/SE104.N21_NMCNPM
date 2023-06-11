import actionTypes from './actionTypes';
import {
    createNewCustomerService,
    getAllCustomers,
    editCustomerService,
    deleteCustomerService
} from '../../services/customerService'
import { toast } from 'react-toastify';
//CUSTOMER
export const createNewCutomer = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewCustomerService(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(saveCustomerSuccess());
                dispatch(fetchAllCustomersStart());
            } else {
                toast.error(res.errMessage)
                dispatch(saveCustomerFailed());
            }
        } catch (e) {
            toast.error("There was no response.")
            dispatch(saveCustomerFailed());
        }
    }
}

export const saveCustomerSuccess = () => ({
    type: actionTypes.CREATE_CUSTOMER_SUCCESS
})
export const saveCustomerFailed = () => ({
    type: actionTypes.CREATE_CUSTOMER_FAILED
})

export const fetchAllCustomersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCustomers("ALL");
            if (res && res.errCode === 0) {
                dispatch(
                    fetchAllCustomersSuccess(res.customers.reverse())
                );
            } else {
                dispatch(fetchAllCustomersFailed());
            }
        } catch (e) {
            dispatch(fetchAllCustomersFailed());
        }
    }
}

export const fetchAllCustomersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CUSTOMERS_SUCCESS,
    dataCustomers: data
})

export const fetchAllCustomersFailed = () => ({
    type: actionTypes.FETCH_ALL_CUSTOMERS_FAILED
})

export const editACustomer = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editCustomerService(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(editCustomerSuccess());
                dispatch(fetchAllCustomersStart());
            } else {
                toast.error(res.errMessage)
                dispatch(editCustomerFailed());
            }
        } catch (e) {
            toast.error("There was no response.")
            dispatch(editCustomerFailed());
        }
    }
}

export const editCustomerSuccess = () => ({
    type: actionTypes.EDIT_CUSTOMER_SUCCESS
})

export const editCustomerFailed = () => ({
    type: actionTypes.EDIT_CUSTOMER_FAILED
})

export const deleteACustomer = (customerId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteCustomerService(customerId);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(deleteCustomerSuccess());
                dispatch(fetchAllCustomersStart());
            } else {
                toast.error(res.errMessage)
                dispatch(deleteCustomerFailed());
            }
        } catch (e) {
            toast.error("There was no response.")
            dispatch(deleteCustomerFailed());
        }
    }
}

export const deleteCustomerSuccess = () => ({
    type: actionTypes.DELETE_CUSTOMER_SUCCESS
})

export const deleteCustomerFailed = () => ({
    type: actionTypes.DELETE_CUSTOMER_FAILED
})