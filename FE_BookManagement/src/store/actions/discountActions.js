import actionTypes from './actionTypes';
import {
    createNewDiscountService,
    getAllDiscounts,
    editDiscountService,
    deleteDiscountService
} from '../../services/discountService'
import { toast } from 'react-toastify';
//DISCOUNT
export const createNewDiscount = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewDiscountService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new discount succeed !")
                dispatch(saveDiscountSuccess());
                dispatch(fetchAllDiscountsStart());
            } else {
                toast.error("Create a new discount error !")
                dispatch(saveDiscountFailed());
            }
        } catch (e) {
            toast.error("Create a new discount error !")
            dispatch(saveDiscountFailed());
        }
    }
}

export const saveDiscountSuccess = () => ({
    type: actionTypes.CREATE_DISCOUNT_SUCCESS
})
export const saveDiscountFailed = () => ({
    type: actionTypes.CREATE_DISCOUNT_FAILED
})

export const fetchAllDiscountsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDiscounts("ALL");
            if (res && res.errCode === 0) {
                toast.success("Fetch all discounts succeed")
                dispatch(
                    fetchAllDiscountsSuccess(res.discounts.reverse())
                );
            } else {
                toast.error("Fetch all discounts error")
                dispatch(fetchAllDiscountsFailed());
            }
        } catch (e) {
            dispatch(fetchAllDiscountsFailed());
        }
    }
}

export const fetchAllDiscountsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DISCOUNTS_SUCCESS,
    dataDiscounts: data
})

export const fetchAllDiscountsFailed = () => ({
    type: actionTypes.FETCH_ALL_DISCOUNTS_FAILED
})

export const editADiscount = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editDiscountService(data);
            if (res && res.errCode === 0) {
                toast.success("Update the discount succeed !")
                dispatch(editDiscountSuccess());
                dispatch(fetchAllDiscountsStart());
            } else {
                toast.error("Update the discount error !")
                dispatch(editDiscountFailed());
            }
        } catch (e) {
            toast.error("Update the discount error !")
            dispatch(editDiscountFailed());
        }
    }
}

export const editDiscountSuccess = () => ({
    type: actionTypes.EDIT_DISCOUNT_SUCCESS
})

export const editDiscountFailed = () => ({
    type: actionTypes.EDIT_DISCOUNT_FAILED
})

export const deleteADiscount = (discountId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteDiscountService(discountId);
            if (res && res.errCode === 0) {
                toast.success("Delete the discount succeed !")
                dispatch(deleteDiscountSuccess());
                dispatch(fetchAllDiscountsStart());
            } else {
                toast.error("Delete the discount error !")
                dispatch(deleteDiscountFailed());
            }
        } catch (e) {
            toast.error("Delete the discount error !")
            dispatch(deleteDiscountFailed());
        }
    }
}

export const deleteDiscountSuccess = () => ({
    type: actionTypes.DELETE_DISCOUNT_SUCCESS
})

export const deleteDiscountFailed = () => ({
    type: actionTypes.DELETE_DISCOUNT_FAILED
})