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
// import VueAMap from 'vue-amap'
import BaiduMap from 'vue-baidu-map'
// import VueWechatTitle from 'vue-wechat-title'

import FastClick from 'fastclick'

import '@/utils/permission'

FastClick.attach(document.body)

// Vue.use(VueWechatTitle)

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
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '5fSAgLiaGcGH9Ff2qYRefFZF2zI1MIbG'
})
// Vue.use(VueAMap)
// VueAMap.initAMapApiLoader({
//     key: '5fSAgLiaGcGH9Ff2qYRefFZF2zI1MIbG',
//     // plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//     v: '1.4.4'
// })

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
