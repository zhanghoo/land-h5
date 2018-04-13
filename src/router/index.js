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
const vipVerify = () => import('@/page/index/mine/children/vipVerify')
const landDetail = () => import('@/page/detail/landDetail')
const transactionDetail = () => import('@/page/detail/transactionDetail')
const dealInformation = () => import('@/page/detail/transaction/dealInformation')
const momentDetail = () => import('@/page/detail/momentDetail')
const rankList = () => import('@/page/detail/rankList')
const landEevaluate = () => import('@/page/detail/landEevaluate')
const announcement = () => import('@/page/detail/announcement')
const releaseList = () => import('@/page/detail/releaseList')
const winnerList = () => import('@/page/detail/winnerList')
const publish = () => import('@/page/detail/publish')
const systemNews = () => import('@/page/detail/systemNews')
const userDetail = () => import('@/page/detail/userDetail')

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
                        },
                        {
                            name: 'vipVerify',
                            path: 'vipVerify',
                            component: vipVerify
                        }
                    ]
                }
            ]
        },
        {
            name: 'transactionDetail',
            path: '/transactionDetail',
            component: transactionDetail,
            children: [
                {
                    name: 'dealInformation',
                    path: 'dealInformation',
                    component: dealInformation
                }
            ]
        },
        {
            name: 'landDetail',
            path: '/landDetail',
            component: landDetail
        },
        {
            name: 'momentDetail',
            path: '/momentDetail',
            component: momentDetail
        },
        {
            name: 'rankList',
            path: '/rankList',
            component: rankList
        },
        {
            name: 'landEevaluate',
            path: '/landEevaluate',
            component: landEevaluate
        },
        {
            name: 'announcement',
            path: '/announcement',
            component: announcement
        },
        {
            name: 'releaseList',
            path: '/releaseList',
            component: releaseList
        },
        {
            name: 'winnerList',
            path: '/winnerList',
            component: winnerList
        },
        {
            name: 'publish',
            path: '/publish',
            component: publish
        },
        {
            name: 'systemNews',
            path: '/systemNews',
            component: systemNews
        },
        {
            name: 'userDetail',
            path: '/userDetail',
            component: userDetail
        }
    ]
})
