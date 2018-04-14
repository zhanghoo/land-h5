import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo, getMineInfo } from '@/api/mine'

Vue.use(Vuex)

const state = {
    user: ''
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
