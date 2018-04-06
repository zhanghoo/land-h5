<template>
    <div id="withdrawCashNext">
        <mt-field placeholder="请输入提现金额" type="number" class="w-n-input"></mt-field>
        <div class="w-n-tip">
            可提现金额：<span>100.00</span><br>
            提示：提现会扣除一定积分
        </div>
        <p class="w-n-btn-next">
            <mt-button class="wnbn-btn" type="primary">提现</mt-button>
        </p>
    </div>
</template>
<script>
export default {
    name: 'withdrawCashNext',
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {

    },
    mounted() {

    }
}
</script>
<style lang='stylus'>
#withdrawCashNext {
    position: absolute;
    padding: toRem(15) toRem(18);
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 200;
    background: $appBg;
    .w-n-input {
        background-image: none;
        margin-bottom: toRem(14);
        .mint-cell-wrapper {
            padding: 0 toRem(13);
            background-image: none;
            font-size: toRem(14);
            line-height: 1;
            border-radius: toRem(3);
            border: 1px solid $borderColor;
        }
    }
    .w-n-tip {
        padding: 0 toRem(13);
        margin-bottom: toRem(300);
        font-size: toRem(12);
        line-height: toRem(21);
        color: #666;
    }
    .w-n-btn-next {
        margin-top: toRem(99);
        .wnbn-btn {
            width: 100%;
            height: toRem(49);
            font-size: toRem(18);
        }
    }
}
</style>
