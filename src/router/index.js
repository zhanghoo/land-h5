import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const index = () => import('@/page/index/index')
const moment = () => import('@/page/index/moment/moment')
const home = () => import('@/page/index/home/home')
const mine = () => import('@/page/index/mine/mine')
const detail = () => import('@/page/detail/detail')

export default new Router({
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: [
        {
            path: '',
            redirect: '/index'
        },
        {
            name: 'index',
            path: '/index',
            redirect: '/index/home',
            component: index,
            children: [
                {
                    name: 'moment',
                    path: 'moment',
                    component: moment
                },
                {
                    name: 'home',
                    path: 'home',
                    component: home
                },
                {
                    name: 'mine',
                    path: 'mine',
                    component: mine
                }
            ]
        },
        {
            name: 'detail',
            path: 'detail',
            component: detail
        }
    ]
})
