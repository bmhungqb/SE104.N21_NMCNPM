import axios from '../axios'
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post("/api/login", { username: userEmail, password: userPassword });
}

export {
    handleLoginApi,
}