import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const index = () => import('@/page/index/index')
const moment = () => import('@/page/index/moment/moment')
const home = () => import('@/page/index/home/home')
const mine = () => import('@/page/index/mine/mine')
const myInfo = () => import('@/page/index/mine/children/myInfo')
const mineGold = () => import('@/page/index/mine/children/mineGold')
const mineScore = () => import('@/page/index/mine/children/mineScore')
const partInRecord = () => import('@/page/index/mine/children/partInRecord')
const recharge = () => import('@/page/index/mine/children/recharge')
const withdrawCash = () => import('@/page/index/mine/children/withdrawCash')
const withdrawCashNext = () => import('@/page/index/mine/children/withdrawCash/next')
const withdrawCashAdd = () => import('@/page/index/mine/children/withdrawCash/add')
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
                            name: 'mineGold',
                            path: 'mineGold',
                            component: mineGold
                        },
                        {
                            name: 'mineScore',
                            path: 'mineScore',
                            component: mineScore
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
                            component: withdrawCash,
                            children: [
                                {
                                    name: 'next',
                                    path: 'next',
                                    component: withdrawCashNext
                                },
                                {
                                    name: 'add',
                                    path: 'add',
                                    component: withdrawCashAdd
                                }
                            ]
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
