import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
import {
    getAllInvoicesService,
    getAllInvoicesDetail,
    CreateInvoiceSevice,
    CreateInvoiceDetailService,
    PayInvoiceImmediately,
    PayInvoiceAfter,
    DeptInvoice
} from '../../services/invoiceService';
import {
    createNewCustomerService,
    getAllCustomers,
    editCustomerService,
    deleteCustomerService
} from '../../services/customerService'
//BOOK
// create invoie with not exists customer
export const CreateInvoiceNotExistsCustomer = (dataCustomer, dataInvoice, dataBook) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewCustomerService(dataCustomer);
            if (res && res.errCode === 0) {
                const modifiedDataInvoice = {
                    ...dataInvoice,
                    customerId: res.newCustomerId
                };
                dispatch(CreateInvoiceExistsCustomer(modifiedDataInvoice))
            }
        }
        catch (e) {
            dispatch(saveInvoiceFailed());
        }
    }
}
// create invoice with exists customer
export const CreateInvoiceExistsCustomer = (dataInvoice, dataBook) => {
    return async (dispatch, getState) => {
        try {
            let res = await CreateInvoiceSevice(dataInvoice);
            if (res && res.errCode == 0) {
                for (const book of dataBook) {
                    const modifiedData = {
                        ...book,
                        invoiceDetailId: res.invoiceId
                    };
                    dispatch(CreateInvoiceDetail(modifiedData))
                }
                toast.success("Create a new invoice succeed !")
                dispatch(saveInvoiceSuccess())
            }
            else {
                toast.error("Create a new invoice failed !")
                dispatch(saveInvoiceFailed())
            }
        }
        catch (e) {
            dispatch(saveInvoiceFailed());
        }
    }
}
export const saveInvoiceSuccess = () => ({
    type: actionTypes.CREATE_INVOICE_SUCCESS
})
export const saveInvoiceFailed = () => ({
    type: actionTypes.CREATE_INVOICE_FAILED
})

export const CreateInvoiceDetail = (dataInvoiceDetail) => {
    return async (dispatch, getState) => {
        try {
            let res = await CreateInvoiceDetailService(dataInvoiceDetail);
            if (res && res.errCode === 0) {
                // toast.success("Create a new invoice detail succeed !")
                dispatch(saveInvoiceDetailSuccess());
            } else {
                // toast.error("Create a new invoice detail error !")
                dispatch(saveInvoiceDetailFailed());
            }
        } catch (e) {
            dispatch(saveInvoiceDetailFailed());
        }
    }
}

export const saveInvoiceDetailSuccess = () => ({
    type: actionTypes.CREATE_INVOICE_DETAIL_SUCCESS
})
export const saveInvoiceDetailFailed = () => ({
    type: actionTypes.CREATE_INVOICE_DETAIL_FAILED
})

export const fetchAllInvoicesStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllInvoicesService("ALL");
            if (res && res.errCode === 0) {
                toast.success("Fetch all invoices succeed")
                dispatch(
                    fetchAllInvoicesSuccess(res.invoices.reverse())
                );
            } else {
                toast.error("Fetch all invoices error")
                dispatch(fetchAllInvoicesFailed());
            }
        } catch (e) {
            dispatch(fetchAllInvoicesFailed());
        }
    }
}

export const fetchAllInvoicesSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_INVOICES_SUCCESS,
    dataInvoices: data
})

export const fetchAllInvoicesFailed = () => ({
    type: actionTypes.FETCH_ALL_INVOICES_FAILED
})