import request from '../common/request'

export function getAbilityList(pageNum, pageSize) {
    return request({
        url: '/api/ability/getAbilityList',
        method: 'get',
        params: { pageNum, pageSize }
    })
}

export function getAllAbility() {
    return request({
        url: '/api/ability/getAllAbility',
        method: 'get',
    })
}

export function addAbility({ abilityName, description }) {
    return request({
        url: '/api/ability/addAbility',
        method: 'POST',
        data: { abilityName, description }
    })
}

export function updateAbility({ abilityName, description }) {
    return request({
        url: '/api/ability/updateAbility',
        method: 'post',
        data: { abilityName, description }
    })
}

export function delAbility(id) {
    return request({
        url: '/api/ability/deleteAbility',
        method: 'get',
        params: { id }
    })
}