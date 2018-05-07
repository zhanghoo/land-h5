<template>
    <div id="app" v-if="$store.state.mine">
        <!-- 内容视口 -->
        <!-- <router-view v-wechat-title="$route.meta.title"></router-view> -->
        <router-view></router-view>
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
        padding: 0 toRem(3);
        border-radius: 3px;
        .mint-button-text {
            display: inline-block;
            font-size: toRem(14);
            transform: scale(0.75);
        }
    }
}
.mint-msgbox {
    width: 80%;
    border-radius: toRem(5);
    .mint-msgbox-header {
        padding: toRem(15) 0;
        border-1px-bottom(#eee);
        .mint-msgbox-title {
            font-size: toRem(16);
            color: #999;
        }
    }
    .mint-msgbox-content {
        padding: toRem(36);
        border-bottom: none;
        .mint-msgbox-message {
            color: #333;
        }
    }
    .mint-msgbox-btns {
        display: block;
        padding: 0 toRem(10) toRem(15) toRem(10);
        height: auto;
        .mint-msgbox-btn {
            width: 48%;
            height: toRem(40);
            line-height: toRem(40);
            color: #fff;
            border-radius: toRem(5);
            &.mint-msgbox-cancel {
                float: right;
                background: $appColor;
                border-right: none;
            }
            &.mint-msgbox-confirm {
                float: left;
                background: #ccc;
            }
        }
        &:after {
            content: '.';
            display: block;
            height: 0;
            line-height: 0;
            clear: both;
            visibility: hidden;
        }
    }
}
</style>
