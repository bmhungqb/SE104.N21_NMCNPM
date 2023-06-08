import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
import {
    getAllRentsService,
    CreateRentSevice,
    CreateRentDetailService,
} from '../../services/rentService';
import {
    createNewCustomerService,
    getAllCustomers,
    editCustomerService,
    deleteCustomerService
} from '../../services/customerService'
import { reject, tail } from 'lodash';
//BOOK
// create rent with not exists customer
export const CreateRentNotExistsCustomer = (dataCustomer, dataRent, dataBook) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewCustomerService(dataCustomer);
            if (res && res.errCode === 0) {
                const modifiedDataRent = {
                    ...dataRent,
                    customerId: res.newCustomerId
                };
                dispatch(CreateRentExistsCustomer(modifiedDataRent, dataBook))
            }
        }
        catch (e) {
            dispatch(saveRentFailed());
        }
    }
}
// create invoice with exists customer
export const CreateRentExistsCustomer = (dataRent, dataBook) => {
    return async (dispatch, getState) => {
        try {
            let res = await CreateRentSevice(dataRent);
            if (res && res.errCode === 0) {
                let rentId = res.rentId;
                const apiCalls = dataBook.map(async (book) => {
                    const modifiedData = {
                        ...book,
                        rentDetailId: rentId
                    };
                    let resCreateRentDetail = await CreateRentDetailService(modifiedData);
                    return resCreateRentDetail;
                });
                await Promise.all(apiCalls);
                toast.success("Create a new rent succeed!");
            } else {
                toast.error("Create a new rent failed!");
                dispatch(saveRentFailed());
            }
        } catch (e) {
            toast.error("Create a new rent failed!");
            dispatch(saveRentFailed());
        }
    };
};



export const saveRentSuccess = () => ({
    type: actionTypes.CREATE_RENT_SUCCESS
})
export const saveRentFailed = () => ({
    type: actionTypes.CREATE_RENT_FAILED
})

export const CreateRentDetail = (dataRentDetail) => {
    return async (dispatch, getState) => {
        try {
            let res = await CreateRentDetailService(dataRentDetail);
            if (res && res.errCode === 0) {
                // toast.success("Create a new invoice detail succeed !")
                dispatch(saveRentDetailSuccess());
            } else {
                // toast.error("Create a new invoice detail error !")
                dispatch(saveRentDetailFailed());
            }
        } catch (e) {
            dispatch(saveRentDetailFailed());
        }
    }
}

export const saveRentDetailSuccess = () => ({
    type: actionTypes.CREATE_RENT_DETAIL_SUCCESS
})
export const saveRentDetailFailed = () => ({
    type: actionTypes.CREATE_RENT_DETAIL_FAILED
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

// export const fetchAllInvoicesDetailStart = (id) => {
//     return async (dispatch, getState) => {
//         try {
//             let res = await getAllInvoicesDetailService(id);
//             if (res && res.errCode === 0) {
//                 if (id !== "ALL") {
//                     return res.invoicesDetail
//                 }
//                 toast.success("Fetch all invoices detail succeed")
//                 dispatch(
//                     fetchAllInvoicesDetailSuccess(res.invoices.reverse())
//                 );
//             } else {
//                 toast.error("Fetch all invoices detail error")
//                 dispatch(fetchAllInvoicesDetailFailed());
//             }
//         } catch (e) {
//             dispatch(fetchAllInvoicesDetailFailed());
//         }
//     }
// }

// export const fetchAllInvoicesDetailSuccess = (data) => ({
//     type: actionTypes.FETCH_ALL_INVOICES_DETAIL_SUCCESS,
//     dataInvoiceDetail: data
// })

// export const fetchAllInvoicesDetailFailed = () => ({
//     type: actionTypes.FETCH_ALL_INVOICES_DETAIL_FAILED
// })

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
// export const DeptInvoice = (invoiceId) => {
//     return async (dispatch, getState) => {
//         try {
//             let res = await DeptInvoiceService(invoiceId);
//             if (res && res.errCode === 0) {
//                 toast.success("Create debt first success!")
//             }
//             else {
//                 toast.error("Create debt first failed!")
//             }
//         }
//         catch (e) {
//             reject(e)
//         }
//     }
// }