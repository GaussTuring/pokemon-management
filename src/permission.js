import router from './router'
import store from './store'
import { Message } from 'element-ui'

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {

    if (store.getters.token) {
        if (to.path === '/login') {
            next()
        } else {
            let userinfo = store.getters.getUserinfo
            if (!userinfo) {
                userinfo = await store.dispatch('getUserInfo')
            }
            const urole = userinfo.role
            if (to.meta.role && to.meta.role.length > 0) {
                if (!urole || urole.length <= 0) {
                    Message({ type: 'error', message: '您当前登录的用户没有权限访问！', duration: 4000 });
                    next('/404')
                } else {
                    const needRole = to.meta.role
                    let needl = needRole.length
                    for (let i = 0; i < needRole.length; i++) {
                        if (urole.includes(needRole[i])) {
                            needl -= 1
                        }
                    }
                    if (needl === 0) {
                        next()
                    } else {
                        next({ path: '/404' })
                    }
                }
            } else {
                next()
            }

        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }

})