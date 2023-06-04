import axios from '../axios'
const getAllInvoices = (invoiceId) => {
    return axios.get(`./api/get-all-invoices?id=${invoiceId}`)
}
const getAllInvoicesDetail = (invoiceDetailId) => {
    return axios.get(`./api/get-all-invoiceDetails?id=${invoiceDetailId}`)
}
const CreateInvoiceSevice = (dataInvoice) => {
    return axios.post('./api/create-new-invoice', dataInvoice)
}
const CreateInvoiceDetail = (dataInvoiceDetail) => {
    return axios.post('./api/create-new-invoiceDetail', dataInvoiceDetail)
}

const PayInvoiceImmediately = (dataInvoice) => {
    return axios.post('./api/invoice-pay-immediately', dataInvoice)
}
const PayInvoiceAfter = (dataInvoice) => {
    return axios.post('./api/invoice-pay-after', dataInvoice)
}
const DeptInvoice = (dataInvoice) => {
    return axios.post('./api/invoice-dept', dataInvoice)
}
export {
    getAllInvoices,
    getAllInvoicesDetail,
    CreateInvoiceSevice,
    CreateInvoiceDetail,
    PayInvoiceImmediately,
    PayInvoiceAfter,
    DeptInvoice
}