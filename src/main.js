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
    key: '34c63d21973601f846831188108cc048',
    // plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    v: '1.4.4'
})

// Object.keys(filters).forEach(key => {
//     Vue.filter(key, filters[key])
// })

// 全局路由登录验证
router.beforeEach((to, from, next) => {
    if (store.state.user) {
        next()
    } else {
        store.dispatch('get_userInfo').then(res => {
            next()
        })
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
