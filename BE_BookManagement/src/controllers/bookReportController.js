import db from "../models/index";

async function GetBookReport(req,res){
    const month = req.query.month
    const bookReport = await db.BookReport.findAll(
        {attributes:['bookId','createdAt']}
    )
    res.status(200).json({bookReport:bookReport})
}
module.exports={
    GetBookReport:GetBookReport
}
// Đang làm dở 