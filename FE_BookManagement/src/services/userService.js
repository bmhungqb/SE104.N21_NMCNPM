import axios from '../axios'
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post("/api/login", { username: userEmail, password: userPassword });
}
const createNewUserService = (dataUser) => {
    return axios.post('api/create-new-user', dataUser)
}
const getAllUsers = (inputId) => {
    return axios.get(`./api/get-all-users?id=${inputId}`)
}
const editUserService = (userEdit) => {
    return axios.put('./api/edit-user', userEdit)
}
const deleteUserService = (userId) => {
    return axios.delete('./api/delete-user', {
        data: {
            id: userId
        }
    })
}
export {
    handleLoginApi,
    createNewUserService,
    getAllUsers,
    editUserService,
    deleteUserService
}