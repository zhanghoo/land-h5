<template>
    <div id="idAuth">
        <p class="desc">地产行业相关人士身份验证成功后可获得
            <span class="icon my-icon-qianbi"></span>
            <span class="num">1000</span>
        </p>
        <div class="button">
            <mt-button @click="clickInvitation">提交</mt-button>
        </div>
        <mt-popup
            v-model="popupVisible"
            position="right"
            :modal="false">
            <div class="text" @click="back">恭喜你！<br>已完成地产相关人士认证</div>
        </mt-popup>
    </div>
</template>
<script>
export default {
    name: 'idAuth',
    data() {
        return {
            popupVisible: false
        }
    },
    computed: {

    },
    methods: {
        clickInvitation() {
            this.popupVisible = !this.popupVisible
        },
        back() {
            history.back()
        }
    },
    mounted() {

    }
}
</script>
<style lang='stylus'>
#idAuth {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 200;
    background: $appBg;
    .desc {
        padding: toRem(15) toRem(30);
        font-size: toRem(12);
        line-height: 1;
        color: #666;
        .icon {
            color: #ffed96;
            font-size: toRem(13);
        }
        .num {
            color: $appColor;
        }
    }
    .button {
        margin: toRem(211) toRem(18) 0 toRem(18);
        button {
            width: 100%;
            height: toRem(49);
            font-size: toRem(15);
            color: #fff;
            background: $appColor;
        }
    }
    .mint-popup {
        width: 100%;
        height: 100%;
        background: $appBg;
        .text {
            width: 100%;
            height: 100%;
            padding-top: toRem(255);
            text-align: center;
            color: #666;
            font-size: toRem(18);
            line-height: toRem(25);
        }
    }
}
</style>
