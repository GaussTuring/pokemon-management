import utils from '../common/utils'
import { getToken } from '../common/auth'

const state = {
    isCollapse: false,
    activeTags: JSON.parse(utils.getSessionStorage('active_tags')) || [
        {
            title: '首页',
            route: '/dashboard'
        }
    ],
    currentRoute: JSON.parse(utils.getSessionStorage('current_route')) || '/dashboard',
    userinfo: JSON.parse(utils.getSessionStorage('userinfo')) || null,
    token: getToken() || null
}

export default state