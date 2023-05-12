import actionTypes from './actionTypes';
import {
    createNewSupplierService,
    getAllSuppliers,
    editSupplierService,
    deleteSupplierService
} from '../../services/supplierService'
import { toast } from 'react-toastify';
export const createNewSupplier = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewSupplierService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new supplier succeed !")
                dispatch(saveSupplierSuccess());
                dispatch(fetchAllSuppliersStart());
            } else {
                toast.error("Create a new supplier error !")
                dispatch(saveSupplierFailed());
            }
        } catch (e) {
            toast.error("Create a new supplier error !")
            dispatch(saveSupplierFailed());
        }
    }
}

export const saveSupplierSuccess = () => ({
    type: actionTypes.CREATE_SUPPLIER_SUCCESS
})
export const saveSupplierFailed = () => ({
    type: actionTypes.CREATE_SUPPLIER_FAILED
})

export const fetchAllSuppliersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSuppliers("ALL");
            if (res && res.errCode === 0) {
                toast.success("Fetch all suppliers succeed")
                dispatch(
                    fetchAllSuppliersSuccess(res.suppliers.reverse())
                );
            } else {
                toast.error("Fetch all suppliers error")
                dispatch(fetchAllSuppliersFailed());
            }
        } catch (e) {
            dispatch(fetchAllSuppliersFailed());
        }
    }
}

export const fetchAllSuppliersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SUPPLIERS_SUCCESS,
    dataSuppliers: data
})

export const fetchAllSuppliersFailed = () => ({
    type: actionTypes.FETCH_ALL_SUPPLIERS_FAILED
})

export const editASupplier = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editSupplierService(data);
            if (res && res.errCode === 0) {
                toast.success("Update the supplier succeed !")
                dispatch(editSupplierSuccess());
                dispatch(fetchAllSuppliersStart());
            } else {
                toast.error("Update the supplier error !")
                dispatch(editSupplierFailed());
            }
        } catch (e) {
            toast.error("Update the supplier error !")
            dispatch(editSupplierFailed());
        }
    }
}

export const editSupplierSuccess = () => ({
    type: actionTypes.EDIT_SUPPLIER_SUCCESS
})

export const editSupplierFailed = () => ({
    type: actionTypes.EDIT_SUPPLIER_FAILED
})

export const deleteASupplier = (supplierId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteSupplierService(supplierId);
            if (res && res.errCode === 0) {
                toast.success("Delete the supplier succeed !")
                dispatch(deleteSupplierSuccess());
                dispatch(fetchAllSuppliersStart());
            } else {
                toast.error("Delete the supplier error !")
                dispatch(deleteSupplierFailed());
            }
        } catch (e) {
            toast.error("Delete the supplier error !")
            dispatch(deleteSupplierFailed());
        }
    }
}

export const deleteSupplierSuccess = () => ({
    type: actionTypes.DELETE_SUPPLIER_SUCCESS
})

export const deleteSupplierFailed = () => ({
    type: actionTypes.DELETE_SUPPLIER_FAILED
})