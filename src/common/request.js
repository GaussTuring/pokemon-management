import axios from 'axios'
import store from '../store'
import { getToken } from '../common/auth'
import { Message } from 'element-ui'

const service = axios.create({
    // baseURL: '/api/',
    timeout: 5000
})

service.defaults.headers.post['Content-Type'] = 'application/json;chartset=UTF-8';

service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['authorization'] = 'Bearer ' + getToken()
        }
        // config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 1) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5000
            })
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }

    },
    error => {
        console.log('err' + error)
        Message({
            message: error.message,
            type: 'error',
            duration: 5000
        })
        return Promise.reject(error)
    }
)


export default service