import { login, getUserInfo } from '../api/user'
import { setToken } from '../common/auth'

const actions = {
    LoginAction({ commit }, user) {
        const { username, password } = user
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getUserInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getUserInfo(state.token).then((response) => {
                const { data } = response
                if (!data) {
                    reject('Verification failed, please Login again.')
                }
                commit('SET_USERINFO', data)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default actions