import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
import {
    getAllInvoicesService,
    getAllInvoicesDetailService,
    CreateInvoiceSevice,
    CreateInvoiceDetailService,
    PayInvoiceImmediatelyService,
    PayInvoiceAfterService,
    DeptInvoiceService
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
export const CreateInvoiceNotExistsCustomer = (isPaid, customerPay, dataCustomer, dataInvoice, dataBook) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewCustomerService(dataCustomer);
            if (res && res.errCode === 0) {
                const modifiedDataInvoice = {
                    ...dataInvoice,
                    customerId: res.newCustomerId
                };
                dispatch(CreateInvoiceExistsCustomer(isPaid, customerPay, modifiedDataInvoice, dataBook))
            }
        }
        catch (e) {
            dispatch(saveInvoiceFailed());
        }
    }
}
// create invoice with exists customer
export const CreateInvoiceExistsCustomer = (isPaid, customerPay, dataInvoice, dataBook) => {
    return async (dispatch, getState) => {
        try {
            let res = await CreateInvoiceSevice(dataInvoice);
            if (res && res.errCode === 0) {
                let invoiceId = res.invoiceId;
                const apiCalls = dataBook.map(async (book) => {
                    const modifiedData = {
                        ...book,
                        invoiceDetailId: invoiceId
                    };
                    let resCreateInvoiceDetail = await CreateInvoiceDetailService(modifiedData);
                    let resDeptInvoice = await DeptInvoiceService({ invoiceId: invoiceId });
                    return resCreateInvoiceDetail;
                });

                const resCreateInvoiceArray = await Promise.all(apiCalls);

                for (const resCreateInvoice of resCreateInvoiceArray) {
                    if (resCreateInvoice.errCode === 0) {
                        toast.success("Create a new invoice detail succeed!");
                    } else {
                        toast.error("Create a new invoice detail failed!");
                    }
                }
                let resDeptInvoice = await DeptInvoiceService({ invoiceId: invoiceId });
                if (resDeptInvoice && resDeptInvoice.errCode === 0) {
                    if (isPaid) {
                        dispatch(PayInvoiceImmediately({ invoiceId: invoiceId }));
                    } else {
                        dispatch(PayInvoiceAfter({
                            invoiceId: invoiceId,
                            customerPay: customerPay,
                        }));
                    }

                    toast.success("Create a new invoice succeed!");
                    dispatch(saveInvoiceSuccess());
                } else {
                    toast.error("DeptInvoiceService failed!");
                    dispatch(saveInvoiceFailed());
                }

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

export const fetchAllInvoicesStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllInvoicesService(id);
            if (res && res.errCode === 0) {
                if (id !== "ALL") {
                    return res.invoices
                }
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

export const fetchAllInvoicesDetailStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllInvoicesDetailService(id);
            if (res && res.errCode === 0) {
                if (id !== "ALL") {
                    return res.invoicesDetail
                }
                toast.success("Fetch all invoices detail succeed")
                dispatch(
                    fetchAllInvoicesDetailSuccess(res.invoices.reverse())
                );
            } else {
                toast.error("Fetch all invoices detail error")
                dispatch(fetchAllInvoicesDetailFailed());
            }
        } catch (e) {
            dispatch(fetchAllInvoicesDetailFailed());
        }
    }
}

export const fetchAllInvoicesDetailSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_INVOICES_DETAIL_SUCCESS,
    dataInvoiceDetail: data
})

export const fetchAllInvoicesDetailFailed = () => ({
    type: actionTypes.FETCH_ALL_INVOICES_DETAIL_FAILED
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

export const DeptInvoice = (invoiceId) => {
    return async (dispatch, getState) => {
        try {
            let res = await DeptInvoiceService(invoiceId);
            if (res && res.errCode === 0) {
                toast.success("Create debt first success!")
            }
            else {
                toast.error("Create debt first failed!")
            }
        }
        catch (e) {
            reject(e)
        }
    }
}