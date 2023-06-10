import axios from '../axios'
const getMonthStatisticService = () => {
    return axios.get(`./api/get-currentStatistic`)
}
const getAllMonthStatisticService = () => {
    return axios.get(`./api/get-yearStatistic`)
}
const getBookReportsService = (month) => {
    return axios.get(`./api/get-all-bookReports?month=${month}`)
}
const getDeptReportsService = () => {
    return axios.get(`./api/get-all-deptReports`)
}
export {
    getMonthStatisticService,
    getAllMonthStatisticService,
    getBookReportsService,
    getDeptReportsService
}