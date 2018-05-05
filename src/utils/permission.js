import router from '@/router'
import store from '@/store'
import { wxLogin } from '@/api/wx'
import cache from '@/utils/cache'

// 全局路由登录验证
router.beforeEach((to, from, next) => {
    if (store.state.mine) {
        next()
    } else if (cache.getToken()) {
        let user_id = cache.getToken()
        store.dispatch('get_mineInfo', user_id).then(res => {
            next()
            // let userId = store.state.mine.user_id
            // let href = window.location.href.split('#')[0] // => http://localhost:8040/
            // let shareURL = userId ? `${href}#/index/home?userid=${userId}` : href
            // // 获取微信配置
            // store.dispatch('get_WxConfig', shareURL).then(res => {
            //     if (store.state.isWeiXin && store.state.wxConfig) {
            //         // alert('mainjs, 微信环境, 开始config')
            //         // 获取微信分享描述
            //         store.dispatch('get_shareInfoDesc').then(res => {
            //             if (store.state.shareInfoDesc) {
            //                 // 微信端
            //                 // JSSDK使用步骤
            //                 // 1. 绑定域名 先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
            //                 // 2. (index.html中引入) 引入JS文件
            //                 // let wx = require('@/assets/js/jweixin-1.2.0.js').default
            //                 // 3. 通过config接口注入权限验证配置
            //                 wx.config(store.state.wxConfig)
            //                 // 4. 通过ready接口处理成功验证
            //                 wx.ready(function () {
            //                     // 朋友圈
            //                     wx.onMenuShareTimeline({
            //                         'title': store.state.shareInfoDesc.timeline_title,
            //                         'imgUrl': store.state.shareInfoDesc.timeline_imgUrl,
            //                         'link': store.state.shareLink
            //                     })
            //                     // 微信好友
            //                     wx.onMenuShareAppMessage({
            //                         'title': store.state.shareInfoDesc.appmessage_title,
            //                         'desc': store.state.shareInfoDesc.appmessage_desc,
            //                         'imgUrl': store.state.shareInfoDesc.appmessage_imgUrl,
            //                         'link': store.state.shareLink
            //                     })
            //                 })
            //                 // 5. (省略)通过error接口处理失败验证 wx.error(function(res){})
            //             }
            //             next()
            //         })
            //     } else {
            //         // console.log('不是微信环境')
            //         next()
            //     }
            // })
        })
    } else if (getQueryString('user_id')) {
        let user_id = getQueryString('user_id')
        if (user_id) {
            store.dispatch('get_mineInfo', user_id).then(res => {
                next()
                // let userId = store.state.mine.user_id
                // let href = window.location.href.split('#')[0] // => http://localhost:8040/
                // let shareURL = userId ? `${href}#/index/home?userid=${userId}` : href
                // // 获取微信配置
                // store.dispatch('get_WxConfig', shareURL).then(res => {
                //     if (store.state.isWeiXin && store.state.wxConfig) {
                //         // alert('mainjs, 微信环境, 开始config')
                //         // 获取微信分享描述
                //         store.dispatch('get_shareInfoDesc').then(res => {
                //             if (store.state.shareInfoDesc) {
                //                 // 微信端
                //                 // JSSDK使用步骤
                //                 // 1. 绑定域名 先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
                //                 // 2. (index.html中引入) 引入JS文件
                //                 // let wx = require('@/assets/js/jweixin-1.2.0.js').default
                //                 // 3. 通过config接口注入权限验证配置
                //                 wx.config(store.state.wxConfig)
                //                 // 4. 通过ready接口处理成功验证
                //                 wx.ready(function () {
                //                     // 朋友圈
                //                     wx.onMenuShareTimeline({
                //                         'title': store.state.shareInfoDesc.timeline_title,
                //                         'imgUrl': store.state.shareInfoDesc.timeline_imgUrl,
                //                         'link': store.state.shareLink
                //                     })
                //                     // 微信好友
                //                     wx.onMenuShareAppMessage({
                //                         'title': store.state.shareInfoDesc.appmessage_title,
                //                         'desc': store.state.shareInfoDesc.appmessage_desc,
                //                         'imgUrl': store.state.shareInfoDesc.appmessage_imgUrl,
                //                         'link': store.state.shareLink
                //                     })
                //                 })
                //                 // 5. (省略)通过error接口处理失败验证 wx.error(function(res){})
                //             }
                //             next()
                //         })
                //     } else {
                //         // console.log('不是微信环境')
                //         next()
                //     }
                // })
            })
        }
    } else {
        wxLogin().then(res => {
            if (res && res.Data && res.Data.url) {
                let url = res.Data.url
                if (url) {
                    // document.location = 'http://localhost:8040/#/index/home?user_id=61230468'// 本地测试使用
                    document.location = url // 生产环境使用
                } else {
                    next('/')
                }
            }
        })
    }
})

function getQueryString(name) {
    var reg = new RegExp('(^|&amp;)' + name + '=([^&amp;]*)(&amp;|$)', 'i')
    var r = window.location.hash.split('?')
    if (r[1]) {
        let result = r[1].match(reg)
        if (result != null) {
            return unescape(result[2])
        } else {
            return null
        }
    } else {
        return null
    }
}
