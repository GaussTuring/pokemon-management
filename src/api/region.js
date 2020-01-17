import request from '../common/request'

export function getRegionList(pageNum, pageSize) {
    return request({
        url: '/api/region/getRegionList',
        method: 'GET',
        params: { pageNum, pageSize }
    })
}

export function getAllRegion() {
    return request({
        url: '/api/region/getAllRegion',
        method: 'GET',
    })
}

export function addRegion(regionName, description) {
    return request({
        url: '/api/region/addRegion',
        method: 'post',
        data: { regionName, description }
    })
}

export function updateRegion({ id, regionName, description }) {
    return request({
        url: '/api/region/updateRegion',
        method: 'POST',
        data: { id, regionName, description }
    })
}

export function delRegion(id) {
    return request({
        url: '/api/region/delRegion',
        method: 'get',
        params: { id }
    })
}