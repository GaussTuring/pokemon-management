import request from '../common/request'


export function getNatureList(pageNum, pageSize) {
    return request({
        url: '/api/nature/getNatureList',
        method: 'get',
        params: { pageNum, pageSize }
    })
}

export function addNature({ natureName, description }) {
    return request({
        url: '/api/nature/addNature',
        method: 'post',
        data: { natureName, description }
    })
}

export function updateNature({ id, natureName, description }) {
    return request({
        url: '/api/nature/updateNature',
        method: 'post',
        data: { id, natureName, description }
    })
}

export function delNature(id) {
    return request({
        url: '/api/nature/deleteNature',
        method: 'get',
        params: { id }
    })
}