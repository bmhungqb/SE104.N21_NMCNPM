import axios from '../axios'
const getAllInvoicesService = (invoiceId) => {
    return axios.get(`./api/get-all-invoices?id=${invoiceId}`)
}
const getAllInvoicesDetail = (invoiceDetailId) => {
    return axios.get(`./api/get-all-invoiceDetails?id=${invoiceDetailId}`)
}
const CreateInvoiceSevice = (dataInvoice) => {
    return axios.post('./api/create-new-invoice', dataInvoice)
}
const CreateInvoiceDetailService = (dataInvoiceDetail) => {
    return axios.post('./api/create-new-invoiceDetail', dataInvoiceDetail)
}

const PayInvoiceImmediatelyService = (dataInvoice) => {
    return axios.post('./api/invoice-pay-immediately', dataInvoice)
}
const PayInvoiceAfterService = (dataInvoice) => {
    return axios.post('./api/invoice-pay-after', dataInvoice)
}
const DeptInvoice = (dataInvoice) => {
    return axios.post('./api/invoice-dept', dataInvoice)
}
export {
    getAllInvoicesService,
    getAllInvoicesDetail,
    CreateInvoiceSevice,
    CreateInvoiceDetailService,
    PayInvoiceImmediatelyService,
    PayInvoiceAfterService,
    DeptInvoice
}