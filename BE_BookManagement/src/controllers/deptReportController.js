import db, { sequelize } from "../models/index";
const { Op } = require('sequelize');

// async function GetAllDeptReport(month){
//     const customers = await db.Customer.findAll({

//     })
//     const deptReports = await db.DeptReport.findAll({
//         where:sequelize.where(sequelize.fn('month',sequelize.col('createdAt')),month)
//     })
//     //  initial dept report
//     let deptReport=[]
//     customers.forEach(customer=>{
//         deptReport[customer.customerId]={
//             customerId:customer.customerId,
//             beginningDept:0,
//             phatSinh:0, 
//             endingDept:0,
//         }
//     })
//     console.log(deptReport)
//     deptReports.forEach(deptReportdata=>{
//         console.log(deptReportdata.beginningDept)
//         deptReport[deptReportdata.customerId].beginningDept+=deptReportdata.beginningDept
//         deptReport[deptReportdata.customerId].phatSinh+=deptReportdata.phatSinh
//     })
//     return deptReport
// }
async function GetAllDeptReport(month) {
    const customers = await db.Customer.findAll({

    })
    const deptReports = await db.DeptReport.findAll({
        where: sequelize.where(sequelize.fn('month', sequelize.col('createdAt')), month)
    })
    //  initial dept report
    let deptReport = []
    customers.forEach(customer => {
        deptReport[customer.customerId] = {
            customerId: customer.customerId,
            beginningDept: 0,
            phatSinh: 0,
            endingDept: 0,
            customerName: customer.fullName,
        }
    })
    deptReports.forEach(deptReportdata => {
        console.log(deptReportdata.beginningDept)
        deptReport[deptReportdata.customerId].beginningDept += deptReportdata.beginningDept
        deptReport[deptReportdata.customerId].phatSinh += deptReportdata.phatSinh
    })
    return deptReport
}
async function GetDeptReport(req, res) {
    try {
        let month = req.query.month
        let currentDatas = await GetAllDeptReport(month)
        if (month > 1) {
            let prevDatas = await GetAllDeptReport(month - 1)
            prevDatas.forEach(prevData => {
                prevData.endingDept = prevData.beginningDept - prevData.phatSinh
            })
            currentDatas.forEach(currentData => {
                currentData.beginningDept += prevDatas[currentData.customerId].endingDept
                currentData.endingDept = currentData.beginningDept - currentData.phatSinh
            })
        }
        res.status(200).json({
            errCode: 0,
            currentDatas: currentDatas
        })
    } catch (e) {
        res.status(400).json({
            errCode: 1,
            errMessage: e.message
        })
    }
}

module.exports = {
    GetDeptReport: GetDeptReport
}