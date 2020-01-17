import request from '../common/request'

export function addPokemon(pokemon) {
    return request({
        url: '/api/pokemon/addPokemon',
        method: 'POST',
        'Content-Type': 'multipart/form-data',
        data: pokemon
    })
}

export function getPokemonList(pageNum, pageSize, type, region) {
    return request({
        url: '/api/pokemon/getPokemonList',
        method: 'GET',
        params: { pageNum, pageSize, type, region }
    })
}

export function updatePokemon(pokemon) {
    return request({
        url: '/api/pokemon/updatePokemon',
        method: 'post',
        'Content-Type': 'multipart/form-data',
        data: pokemon
    })
}

export function deletePokemon(id) {
    return request({
        url: '/api/pokemon/deletePokemon',
        method: 'get',
        params: { id }
    })
}

export function deleteManyPokemon(list_id) {
    return request({
        url: '/api/pokemon/deleteManyPokemon',
        method: 'get',
        params: { list_id }
    })
}

