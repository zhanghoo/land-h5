<template>
    <div id="vipVerify">
        <div class="vipVerify-label">请输入手机号</div>
        <div class="vipVerify-input">
            <input type="number" v-model="phone">
        </div>
        <mt-button class="vipVerify-btn" type="primary" @click="goToReChare">下一步</mt-button>
    </div>
</template>
<script>
export default {
    name: 'vipVerify',
    data() {
        return {
            phone: ''
        }
    },
    methods: {
        goToReChare() {
            if (!this.phone) {
                this.$toast('请填写手机号码！')
            } else if (this.phone.length !== 11 || !(/^(1[3,4,5,6,7,8,9])\d{9}$/.test(this.phone))) {
                this.$toast('请填写正确的手机号码！')
            } else {
                this.$toast('认证成功')
                this.$router.push({name: 'recharge'})
            }
        }
    }
}
</script>
<style lang='stylus'>
#vipVerify {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 200;
    background: $appBg;
    padding 0 toRem(18)
    .vipVerify-label{
        color #333
        font-size toRem(16)
        padding 0 toRem(5)
        margin toRem(36) 0 toRem(20)
    }
    .vipVerify-input{
        border-radius toRem(8)
        overflow hidden
        margin-bottom toRem(60)
        input{
            width 100%
            padding toRem(12) toRem(8)
            background #fff
            outline none
            border none
        }
    }
    .vipVerify-btn{
        width 100%
    }
}
</style>
