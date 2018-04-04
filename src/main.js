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
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
})

// Object.keys(filters).forEach(key => {
//     Vue.filter(key, filters[key])
// })

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
