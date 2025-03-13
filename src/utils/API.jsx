import axios from "axios";


const API = axios.create({
    baseURL: "https://nt-shopping-list.onrender.com/api"
})

API.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        req.headers['x-auth-token'] = `${localStorage.getItem('token')}`
    }
    return req
});

API.interceptors.response.use((res) => {
    return res
}, (error) => {
    if (error.response.status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/login"
    }
    return Promise.reject(error)
})


export default API ;


