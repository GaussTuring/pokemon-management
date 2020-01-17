import request from '../common/request'

export function login(user) {
    return request({
        url: '/api/user/login',
        method: 'post',
        data: user
    })
}

export function getUserInfo(token) {
    return request({
        url: '/api/user/getUserInfo',
        method: 'get',
        params: { token }
    })
}