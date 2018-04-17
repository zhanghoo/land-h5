import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export default {
    getToken: function () {
        return Cookies.get(TokenKey)
    },
    setToken: function (token) {
        let setTime = 1 / 6
        return Cookies.set(TokenKey, token, { expires: setTime })
    },
    removeToken: function () {
        return Cookies.remove(TokenKey)
    },
    getSession: function (name) {
        if (!name) return
        return window.sessionStorage.getItem(name)
    },
    setSession: function (name, content) {
        if (!name) return
        if (typeof content !== 'string') {
            content = JSON.stringify(content)
        }
        window.sessionStorage.setItem(name, content)
    },
    removeSession: function (name) {
        if (!name) return
        window.sessionStorage.removeItem(name)
    },
    getLocal: function (name) {
        if (!name) return
        return window.localStorage.getItem(name)
    },
    setLocal: function (name, content) {
        if (!name) return
        if (typeof content !== 'string') {
            content = JSON.stringify(content)
        }
        window.localStorage.setItem(name, content)
    },
    removeLocal: function (name) {
        if (!name) return
        window.localStorage.removeItem(name)
    }
}
