import Vue from 'vue'
import Vuex from 'vuex'
import { wxShare } from '@/api'
import { getUserInfo, getMineInfo } from '@/api/mine'

Vue.use(Vuex)

const state = {
    license: false,
    user: '',
    mine: '',
    wxConfig: '',
    shareLink: ''
}

const getters = {

}

const mutations = {
    setUserInfo(state, val) {
        state.user = val
    },
    setMineInfo(state, val) {
        state.mine = val
    },
    setLicense(state, val) {
        state.license = val
    },
    setWxConfig(state, val) {
        state.wxConfig = val
    },
    setShareLink(state, val) {
        state.shareLink = val
    },
    addUserMoney(state, val) {
        state.mine.money += val
    },
    reduceUserMoney(state, val) {
        state.mine.money -= val
    }
}

const actions = {
    async get_userInfo({ commit }) {
        let userid = 61230468
        await getUserInfo(userid).then(res => {
            // console.log(res)
            commit('setUserInfo', res.Data)
        })
    },
    async get_mineInfo({ commit }) {
        await getMineInfo().then(res => {
            commit('setMineInfo', res.Data)
        })
    },
    async get_WxConfig({ commit }, url) {
        await wxShare(url).then(res => {
            let _shareInfo = res.Data
            let _wxConfig = {
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: _shareInfo.appId, // 必填，公众号的唯一标识
                timestamp: _shareInfo.timestamp, // 必填，生成签名的时间戳
                nonceStr: _shareInfo.nonceStr, // 必填，生成签名的随机串
                signature: _shareInfo.signature, // 必填，签名
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ]
            }
            commit('setWxConfig', _wxConfig)
            commit('setShareLink', _shareInfo.url)
        })
    },
    set_License({ commit }, val) {
        commit('setLicense', val)
    },
    post_addUserMoney({ commit }, val) {
        // 发送请求
        commit('addUserMoney', val)
    },
    post_reduceUserMoney({ commit }, val) {
        // 发送请求
        commit('reduceUserMoney', val)
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
