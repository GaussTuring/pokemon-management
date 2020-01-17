import utils from '../common/utils'

const mutations = {
    SET_COLLAPSE: (state, isCollapse) => {
        state.isCollapse = isCollapse
    },
    ADD_ACTIVETAG: (state, tag) => {
        state.activeTags.push(tag)
        utils.setSessionStorage('active_tags', state.activeTags)
    },
    REMOVE_ACTIVETAG: (state, tag) => {
        for (let i = 0; i < state.activeTags.length; i++) {
            if (state.activeTags[i].route === tag.route) {
                state.activeTags.splice(i, 1)
                utils.setSessionStorage('active_tags', state.activeTags)
                return
            }
        }
    },
    SET_CURRENTROUTE: (state, currentRoute) => {
        state.currentRoute = currentRoute
        utils.setSessionStorage('current_route', currentRoute)
    },
    SET_USERINFO: (state, userinfo) => {
        state.userinfo = userinfo
        utils.setSessionStorage('userinfo', userinfo)
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    }
}

export default mutations