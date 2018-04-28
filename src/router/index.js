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
const mineRecharge = () => import('@/page/index/mine/children/recharge')
const withdrawCash = () => import('@/page/index/mine/children/withdrawCash')
const mineWithdrawCash = () => import('@/page/index/mine/children/withdrawCash/next')
const withdrawCashNext = () => import('@/page/index/mine/children/withdrawCash/next')
const withdrawCashAdd = () => import('@/page/index/mine/children/withdrawCash/add')
const feedback = () => import('@/page/index/mine/children/feedback')
const idAuth = () => import('@/page/index/mine/children/idAuth')
const vipVerify = () => import('@/page/index/mine/children/vipVerify')
const homePage = () => import('@/page/index/mine/children/homePage')
const landDetail = () => import('@/page/detail/landDetail')
const transactionDetail = () => import('@/page/detail/transactionDetail')
const dealInfo = () => import('@/page/detail/transaction/dealInformation')
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
            path: '*',
            redirect: '/index'
        },
        {
            name: 'index',
            path: '/index',
            redirect: '/index/home',
            component: index,
            meta: {
                title: '地产大师'
            },
            children: [
                {
                    name: 'moment',
                    path: 'moment',
                    component: moment,
                    meta: {
                        title: '动态'
                    }
                },
                {
                    name: 'home',
                    path: 'home',
                    component: home,
                    meta: {
                        title: '地产大师'
                    }
                },
                {
                    name: 'mine',
                    path: 'mine',
                    component: mine,
                    meta: {
                        title: '我的'
                    },
                    children: [
                        {
                            name: 'myInfo',
                            path: 'myInfo',
                            component: myInfo,
                            meta: {
                                title: '地产大师'
                            }
                        },
                        {
                            name: 'mineGold',
                            path: 'mineGold',
                            component: mineGold,
                            meta: {
                                title: '大师币'
                            }
                        },
                        {
                            name: 'mineScore',
                            path: 'mineScore',
                            component: mineScore,
                            meta: {
                                title: '大师积分'
                            }
                        },
                        {
                            name: 'partInRecord',
                            path: 'partInRecord',
                            component: partInRecord,
                            meta: {
                                title: '参与记录'
                            }
                        },
                        {
                            name: 'recharge',
                            path: 'recharge',
                            component: recharge,
                            meta: {
                                title: '充值'
                            }
                        },
                        {
                            name: 'mineWithdrawCash',
                            path: 'mineWithdrawCash',
                            component: mineWithdrawCash,
                            meta: {
                                title: '提现'
                            }
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
                            component: feedback,
                            meta: {
                                title: '反馈'
                            }
                        },
                        {
                            name: 'idAuth',
                            path: 'idAuth',
                            component: idAuth,
                            meta: {
                                title: '地产大师'
                            }
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
            name: 'mineRecharge',
            path: '/mineRecharge',
            component: mineRecharge,
            meta: {
                title: '充值'
            }
        },
        {
            name: 'transactionDetail',
            path: '/transactionDetail',
            component: transactionDetail,
            meta: {
                title: '成交详情'
            }
        },
        {
            name: 'dealInfo',
            path: '/dealInfo',
            component: dealInfo,
            meta: {
                title: '交易信息'
            }
        },
        {
            name: 'landDetail',
            path: '/landDetail',
            component: landDetail,
            meta: {
                title: '地块详情'
            }
        },
        {
            name: 'momentDetail',
            path: '/momentDetail',
            component: momentDetail,
            meta: {
                title: '动态'
            }
        },
        {
            name: 'rankList',
            path: '/rankList',
            component: rankList,
            meta: {
                title: '排行榜'
            }
        },
        {
            name: 'landEevaluate',
            path: '/landEevaluate',
            component: landEevaluate,
            meta: {
                title: '地产估价'
            }
        },
        {
            name: 'announcement',
            path: '/announcement',
            component: announcement,
            meta: {
                title: '成交公告'
            }
        },
        {
            name: 'releaseList',
            path: '/releaseList',
            component: releaseList,
            meta: {
                title: '地产大师'
            }
        },
        {
            name: 'winnerList',
            path: '/winnerList',
            component: winnerList,
            meta: {
                title: '地产大师'
            }
        },
        {
            name: 'publish',
            path: '/publish',
            component: publish,
            meta: {
                title: '发布'
            }
        },
        {
            name: 'systemNews',
            path: '/systemNews',
            component: systemNews,
            meta: {
                title: '系统消息'
            }
        },
        {
            name: 'userDetail',
            path: '/userDetail',
            component: userDetail,
            meta: {
                title: '用户动态'
            }
        },
        {
            name: 'homePage',
            path: '/homePage',
            component: homePage,
            meta: {
                title: '用户动态'
            }
        }
    ]
})
