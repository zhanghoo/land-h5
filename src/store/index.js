import Vue from 'vue'
import Vuex from 'vuex'
import { wxShare, getShareInfoDesc } from '@/api/wx'
import { getMineInfo } from '@/api/mine'
import cache from '@/utils/cache'

Vue.use(Vuex)

const state = {
    mine: '',
    isWeiXin: '',
    license: false,
    wxConfig: '', // 使用JSSDK, config接口注入权限验证配置时用到的配置
    shareLink: '', // 分享的链接
    shareInfoDesc: '' // 分享的描述
}

const getters = {

}

const mutations = {
    setMineInfo(state, val) {
        state.mine = val
    },
    set_isWeiXin(state, val) {
        state.isWeiXin = val
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
    setShareInfoDesc(state, val) {
        state.shareInfoDesc = val
    },
    addUserMoney(state, val) {
        state.mine.money += val
    },
    reduceUserMoney(state, val) {
        state.mine.money -= val
    }
}

const actions = {
    async get_mineInfo({ commit }, user_id) {
        await getMineInfo(user_id).then(res => {
            commit('setMineInfo', res.Data)
            cache.setToken(res.Data.user_id)
        })
    },
    async get_WxConfig({ commit }, url) {
        await wxShare(url).then(res => {
            let _shareInfo = res.Data
            let _wxConfig = {
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: _shareInfo.appId, // 必填，公众号的唯一标识
                timestamp: _shareInfo.timestamp, // 必填，生成签名的时间戳
                nonceStr: _shareInfo.nonceStr, // 必填，生成签名的随机串
                signature: _shareInfo.signature, // 必填，签名
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onVoiceRecordEnd',
                    'playVoice',
                    'onVoicePlayEnd',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice'
                ]
            }
            commit('setWxConfig', _wxConfig)
            commit('setShareLink', _shareInfo.url)
        })
    },
    async get_shareInfoDesc({ commit }) {
         await getShareInfoDesc().then(res => {
            commit('setShareInfoDesc', res.Data)
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
