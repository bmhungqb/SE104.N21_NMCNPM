import axios from '../axios'

const createNewRegulationService = (dataRegulation) => {
    return axios.post('api/create-new-regulation', dataRegulation)
}
const getAllRegulations = (inputId) => {
    return axios.get(`./api/get-all-regulations?id=${inputId}`)
}

const editRegulationService = (regulationEdit) => {
    return axios.put('./api/edit-regulation', regulationEdit)
}
const deleteRegulationService = (regulationId) => {
    return axios.delete('./api/delete-regulation', {
        data: {
            id: regulationId
        }
    })
}
export {
    createNewRegulationService,
    getAllRegulations,
    editRegulationService,
    deleteRegulationService
}