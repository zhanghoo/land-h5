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
export default {
    name: 'App',
    methods: {
        browserCheck() {
            const ua = window.navigator.userAgent.toLowerCase()
            const isWeiXin = ua.match(/MicroMessenger/i)
                ? ua.match(/MicroMessenger/i)[0] === 'micromessenger' ? 1 : 0
                : 0
            this.$store.commit('set_isWeiXin', isWeiXin)
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
