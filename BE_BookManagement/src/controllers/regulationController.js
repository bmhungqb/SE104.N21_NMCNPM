import regulationService from '../services/regulationService'

let CreateRegulation = async (req, res) => {
    try {
        let message = await regulationService.CreateRegulation(req.body);
        return res.status(200).json(message);
    } catch (e) {
        return res.status(500).json({
            errCode: 1,
            errMessage: e.message
        });
    }
}
let GetAllRegulation = async (req, res) => {
    let id = req.query.id // all,id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters",
            regulations: []
        })
    }
    let regulations = await regulationService.getAllRegulation(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        regulations
    })
}
let UpdateRegulation = async (req, res) => {
    try {
        let data = req.body;
        let message = await regulationService.UpdateRegulation(data);
        return res.status(200).json(message)
    } catch (e) {
        return res.status(500).json({
            errCode: 1,
            errMessage: e.message
        });
    }
}
let handleDeleteRegulation = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await regulationService.deleteRegulation(req.body.id);
    return res.status(200).json(message);
}
module.exports = {
    CreateRegulation: CreateRegulation,
    GetAllRegulation: GetAllRegulation,
    handleDeleteRegulation: handleDeleteRegulation,
    UpdateRegulation: UpdateRegulation
}