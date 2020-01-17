// import state from "./state"

// import utils from '../common/utils'

const getters = {
    isCollapse: state => state.isCollapse,
    activeTags: state => state.activeTags,
    currentRoute: state => state.currentRoute,
    getUserinfo: state => state.userinfo,
    token: state => state.token
}

export default getters