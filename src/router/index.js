import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const index = () => import('@/page/index/index')
const moment = () => import('@/page/index/moment/moment')
const home = () => import('@/page/index/home/home')
const mine = () => import('@/page/index/mine/mine')
const myInfo = () => import('@/page/index/mine/children/myInfo')
const partInRecord = () => import('@/page/index/mine/children/partInRecord')
const recharge = () => import('@/page/index/mine/children/recharge')
const withdrawCash = () => import('@/page/index/mine/children/withdrawCash')
const feedback = () => import('@/page/index/mine/children/feedback')
const idAuth = () => import('@/page/index/mine/children/idAuth')
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
                    component: mine,
                    children: [
                        {
                            name: 'myInfo',
                            path: 'myInfo',
                            component: myInfo
                        },
                        {
                            name: 'partInRecord',
                            path: 'partInRecord',
                            component: partInRecord
                        },
                        {
                            name: 'recharge',
                            path: 'recharge',
                            component: recharge
                        },
                        {
                            name: 'withdrawCash',
                            path: 'withdrawCash',
                            component: withdrawCash
                        },
                        {
                            name: 'feedback',
                            path: 'feedback',
                            component: feedback
                        },
                        {
                            name: 'idAuth',
                            path: 'idAuth',
                            component: idAuth
                        }
                    ]
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
