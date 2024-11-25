import axios from "axios"
const instance = axios.create({
    baseURL:"https://to-do-list-xa2b.onrender.com/api"
})
export default instance;
