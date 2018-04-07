import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from '@/api'

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
    addUserMoney(state, val) {
        state.user.money += val
    },
    reduceUserMoney(state, val) {
        state.user.money -= val
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
