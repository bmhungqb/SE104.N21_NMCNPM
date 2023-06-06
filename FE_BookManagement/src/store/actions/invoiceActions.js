import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
import {
    getAllInvoicesService,
    getAllInvoicesDetail,
    CreateInvoiceSevice,
    CreateInvoiceDetailService,
    PayInvoiceImmediatelyService,
    PayInvoiceAfterService,
    DeptInvoice
} from '../../services/invoiceService';
import {
    createNewCustomerService,
    getAllCustomers,
    editCustomerService,
    deleteCustomerService
} from '../../services/customerService'
import { reject, tail } from 'lodash';
//BOOK
// create invoie with not exists customer
export const CreateInvoiceNotExistsCustomer = (isPaid, dataCustomer, dataInvoice, dataBook) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewCustomerService(dataCustomer);
            if (res && res.errCode === 0) {
                const modifiedDataInvoice = {
                    ...dataInvoice,
                    customerId: res.newCustomerId
                };
                dispatch(CreateInvoiceExistsCustomer(isPaid, modifiedDataInvoice, dataBook))
            }
        }
        catch (e) {
            dispatch(saveInvoiceFailed());
        }
    }
}
// create invoice with exists customer
export const CreateInvoiceExistsCustomer = (isPaid, dataInvoice, dataBook) => {
    return async (dispatch, getState) => {
        try {
            let res = await CreateInvoiceSevice(dataInvoice);
            if (res && res.errCode === 0) {
                const apiCalls = dataBook.map(async (book) => {
                    const modifiedData = {
                        ...book,
                        invoiceDetailId: res.invoiceId
                    };

                    let resCreateInvoiceDetail = await CreateInvoiceDetailService(modifiedData);
                    return resCreateInvoiceDetail
                });

                const resCreateInvoiceArray = await Promise.all(apiCalls);

                for (const resCreateInvoice of resCreateInvoiceArray) {
                    if (resCreateInvoice.errCode === 0) {
                        toast.success("Create a new invoice detail succeed!");
                    } else {
                        toast.error("Create a new invoice detail failed!");
                    }
                }

                if (isPaid) {
                    dispatch(PayInvoiceImmediately(res.invoiceId));
                }

                toast.success("Create a new invoice succeed!");
                dispatch(saveInvoiceSuccess());
            } else {
                toast.error("Create a new invoice failed!");
                dispatch(saveInvoiceFailed());
            }
        } catch (e) {
            toast.error("Create a new invoice failed!");
            dispatch(saveInvoiceFailed());
        }
    };
};

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

export const PayInvoiceImmediately = (invoiceId) => {
    return async (dispatch, getState) => {
        try {
            let res = await PayInvoiceImmediatelyService(invoiceId);
            if (res && res.errCode === 0) {
                toast.success("Paid invoice succeed!")
            } else {
                toast.error("Paid invoice failed!")
            }
        } catch (e) {
            reject(e)
        }
    }
}

export const PayInvoiceAfter = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await PayInvoiceAfterService(data);
            if (res && res.errCode === 0) {
                toast.success("Debt succeed !")
            }
            else {
                toast.error("Debt failed!")
            }
        }
        catch (e) {
            reject(e)
        }
    }
}