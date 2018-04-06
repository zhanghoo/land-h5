import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    user: {
        username: '曹万贯',
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522840979045&di=a6354e049eb52ce19c58aadbfb02065c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fa5c27d1ed21b0ef4fa1c44add7c451da80cb3e49.jpg',
        money: 1500,
        integral: 56543,
        level: '地产大亨'
    }
}

const getters = {

}

const mutations = {
    addUserMoney(state, val) {
        state.user.money += val
    },
    reduceUserMoney(state, val) {
        state.user.money -= val
    }
}

const actions = {
    post_addUserMoney({commit}, val) {
        // 发送请求
        commit('addUserMoney', val)
    },
    post_reduceUserMoney({commit}, val) {
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
