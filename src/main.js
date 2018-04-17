import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// css
import '@/assets/css/reset.css'
import '@/assets/icon/iconfont.css'
import '@/assets/css/global.css'

// 第三方
import axios from 'axios'
import MintUI, { MessageBox, Toast, Indicator } from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueProgressBar from 'vue-progressbar'
import VueAMap from 'vue-amap'

// 数据模拟
import '@/mock'

// 自定义全局过滤
// import filters from './filters'

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.use(MintUI)
Vue.prototype.$toast = Toast
Vue.prototype.$msgBox = MessageBox
Vue.prototype.$indicator = Indicator
Vue.use(VueProgressBar, {
    color: '#369BFF',
    failedColor: 'red',
    height: '2px'
})
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
    key: '5fSAgLiaGcGH9Ff2qYRefFZF2zI1MIbG',
    // plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    v: '1.4.4'
})

// Object.keys(filters).forEach(key => {
//     Vue.filter(key, filters[key])
// })

const ua = window.navigator.userAgent.toLowerCase()
const isWeiXin = ua.match(/MicroMessenger/i)
               ? ua.match(/MicroMessenger/i)[0] === 'micromessenger' ? 1 : 0
               : 0

// 全局路由登录验证
router.beforeEach((to, from, next) => {
    console.log(from)
    // console.log(store.state.license)
    // if (store.state.license) {
    //     // 从empty页 获得 授权登录
    if (store.state.mine) {
        next()
    } else {
        // 获取用户基本信息
        store.dispatch('get_mineInfo').then(res => {
            let userId = store.state.mine.user_id
            let url = userId ? `${window.location.href}&userid=${userId}` : window.location.href
            // 获取微信配置
            store.dispatch('get_WxConfig', url).then(res => {
                if (isWeiXin && store.state.wxConfig) {
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
                            wx.ready(function() {
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
                    // alert('mainjs, 非微信环境')
                    // console.log(store.state.wxConfig)
                    // console.log(store.state.shareLink)
                    next()
                }
            })
        })
    }
    // } else {
    //     // 跳回empty页接收授权
    //     store.dispatch('set_License', true)
    //     next({ path: '/empty' })
    // }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
