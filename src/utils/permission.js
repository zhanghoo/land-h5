import router from '@/router'
import store from '@/store'
import { wxLogin } from '@/api/wx'

// 全局路由登录验证
router.beforeEach((to, from, next) => {
    if (store.state.mine) {
        next()
    } else {
        wxLogin().then(res => {
            if (res && res.Data && res.Data.url) {
                let url = res.Data.url
                store.dispatch('get_mineInfo').then(res => {
                    if (url) {
                        next(url) // 本地测试使用
                        // document.location = url // 生产环境使用
                    } else {
                        next('/')
                    }
                    let userId = store.state.mine.user_id
                    let shareURL = userId ? `${window.location.href}&userid=${userId}` : window.location.href
                    // 获取微信配置
                    store.dispatch('get_WxConfig', shareURL).then(res => {
                        if (store.state.isWeiXin && store.state.wxConfig) {
                            // alert('mainjs, 微信环境, 开始config')
                            // 获取微信分享描述
                            store.dispatch('get_shareInfoDesc').then(res => {
                                if (store.state.shareInfoDesc) {
                                    // 微信端
                                    // JSSDK使用步骤
                                    // 1. 绑定域名 先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
                                    // 2. (index.html中引入) 引入JS文件
                                    // let wx = require('@/assets/js/jweixin-1.2.0.js').default
                                    // 3. 通过config接口注入权限验证配置
                                    wx.config(store.state.wxConfig)
                                    // 4. 通过ready接口处理成功验证
                                    wx.ready(function () {
                                        // 朋友圈
                                        wx.onMenuShareTimeline({
                                            'title': store.state.shareInfoDesc.timeline_title,
                                            'imgUrl': store.state.shareInfoDesc.timeline_imgUrl,
                                            'link': store.state.shareLink
                                        })
                                        // 微信好友
                                        wx.onMenuShareAppMessage({
                                            'title': store.state.shareInfoDesc.appmessage_title,
                                            'desc': store.state.shareInfoDesc.appmessage_desc,
                                            'imgUrl': store.state.shareInfoDesc.appmessage_imgUrl,
                                            'link': store.state.shareLink
                                        })
                                    })
                                    // 5. (省略)通过error接口处理失败验证 wx.error(function(res){})
                                }
                                next()
                            })
                        } else {
                            console.log('不是微信环境')
                        }
                    })
                })
            }
        })
    }
})
