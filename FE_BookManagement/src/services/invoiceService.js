import axios from '../axios'
const getAllInvoicesService = (id) => {
    return axios.get(`./api/get-all-invoices?id=${id}`)
}
const getAllInvoicesDetailService = (id) => {
    return axios.get(`./api/get-all-invoiceDetails?id=${id}`)
}
const CreateInvoiceSevice = (dataInvoice) => {
    return axios.post('./api/create-new-invoice', dataInvoice)
}
const CreateInvoiceDetailService = (dataInvoiceDetail) => {
    return axios.post('./api/create-new-invoiceDetail', dataInvoiceDetail)
}

const PayInvoiceImmediatelyService = (invoiceId) => {
    return axios.post('./api/invoice-pay-immediately', invoiceId)
}
const PayInvoiceAfterService = (dataInvoice) => {
    return axios.post('./api/invoice-pay-after', dataInvoice)
}
const DeptInvoiceService = (data) => {
    return axios.post('/api/invoice-dept', data)
}
export {
    getAllInvoicesService,
    getAllInvoicesDetailService,
    CreateInvoiceSevice,
    CreateInvoiceDetailService,
    PayInvoiceImmediatelyService,
    PayInvoiceAfterService,
    DeptInvoiceService
}