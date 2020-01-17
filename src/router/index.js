import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '../views/layout/index.vue'

Vue.use(VueRouter)


export const routes = [
  {
    path: '/login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('../views/dashboard/index.vue')
      },
      {
        path: 'pokemon/pokemonList',
        component: () => import('../views/pokemon/pokemonlist/index.vue'),
        meta: { title: '宝可梦图鉴' }
      },
      {
        path: 'pokemon/addPokemon',
        component: () => import('../views/pokemon/addPokemon.vue'),
        meta: { title: '新增宝可梦' }
      },
      {
        path: 'pokemon/natureList',
        component: () => import('../views/pokemon/nature'),
        meta: { title: '性格列表' }
      },
      {
        path: 'pokemon/addNature',
        component: () => import('../views/pokemon/addNature.vue'),
        meta: { title: '新增性格' }
      },
      {
        path: 'pokemon/abilityList',
        component: () => import('../views/pokemon/ability'),
        meta: { title: '特性列表' }
      },
      {
        path: 'pokemon/addAbility',
        component: () => import('../views/pokemon/addAbility'),
        meta: { title: '新增特性' }
      },
      {
        path: 'region/regionList',
        component: () => import('../views/region/index.vue'),
        meta: { title: '地区列表' }
      },
      {
        path: 'region/addRegion',
        component: () => import('../views/region/addRegion.vue'),
        meta: { title: '新增地区' }
      }
    ]
  },
  {
    path: '/*',
    name: '404',
    component: () => import('../views/404.vue')
  }

]

const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})

const router = createRouter()

export default router
