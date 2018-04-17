<template>
    <div id="app" v-if="$store.state.mine">
        <!-- 内容视口 -->
        <keep-alive include="index">
            <router-view></router-view>
        </keep-alive>
        <!-- 页面加载进度条 -->
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'App',
    methods: {
        ...mapActions([
            'get_mineInfo'
        ]),
        browserCheck() {
            const ua = window.navigator.userAgent.toLowerCase()
            const isWeiXin = ua.match(/MicroMessenger/i)
                ? ua.match(/MicroMessenger/i)[0] === 'micromessenger' ? 1 : 0
                : 0
            this.$store.commit('set_isWeiXin', isWeiXin)
        },
        getUserInfo() {
            function getQueryString(name) {
                var reg = new RegExp('(^|&amp;)' + name + '=([^&amp;]*)(&amp;|$)', 'i')
                var r = window.location.hash.split('?')
                if (r[1]) {
                    let result = r[1].match(reg)
                    if (result != null) {
                        return unescape(result[2])
                    } else {
                        return null
                    }
                } else {
                    return null
                }
            }
            let user_id = getQueryString('user_id')
            console.log('user_id', user_id)
            if (user_id) {
                this.get_mineInfo(user_id)
            }
        }
    },
    created() {
        this.$Progress.start()
        this.$router.beforeEach((to, from, next) => {
            this.$Progress.start()
            next()
        })
        this.$router.afterEach((to, from) => {
            this.$Progress.finish()
        })
    },
    mounted() {
        this.browserCheck()
        // this.getUserInfo()
        this.$Progress.finish()
    }
}
</script>
<style lang='stylus'>
#app {
    .label {
        font-size: inherit;
        height: inherit;
        padding: toRem(1) toRem(2);
        border-radius: 3px;
        .mint-button-text {
            display: inline-block;
            font-size: toRem(12);
            transform: scale(0.75);
        }
    }
}
</style>
