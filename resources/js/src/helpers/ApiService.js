import axios from "axios"
import store from "../store"

const ApiService = axios.create({
    // baseURL: 'http://localhost:8000/api'
    baseURL: process.env.MIX_APP_URL_API
})

ApiService.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.getters.getUser.token}`
    return config
})

export default ApiService