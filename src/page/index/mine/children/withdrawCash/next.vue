<template>
    <div id="withdrawCashNext">
        <mt-field placeholder="请输入提现金额" type="number" class="w-n-input" v-model="money"></mt-field>
        <div class="w-n-tip">
            可提现到微信零钱：<span>{{mine.master_coin}}</span><br>
            提示：提现会扣除一定积分
        </div>
        <p class="w-n-btn-next">
            <mt-button class="wnbn-btn" type="primary" @click="get_money">1~3天到账，确认提现</mt-button>
        </p>
    </div>
</template>
<script>
import { getMoney } from '@/api/mine'
import { mapState } from 'vuex'
export default {
    name: 'withdrawCashNext',
    data() {
        return {
            money: null,
            withdrawClick: false
        }
    },
    computed: {
        ...mapState([
            'mine'
        ])
    },
    methods: {
        get_money() {
            if (!this.withdrawClick) {
                if (!this.money) {
                    this.$toast('请填写要提现的金额')
                } else {
                    // console.log(Number(this.money).toFixed(2) !== '1.00') 0.99 -> 1.00 字符串
                    // console.log(Math.floor(Number(this.money)))
                    if (Math.floor(Number(this.money)) !== 1 && (Math.floor(Number(this.money).toFixed(2)) < 1 || Number(this.money).toFixed(2) === '1.00')) {
                        this.$toast('微信提现金额不能少于1元，请重新输入')
                    } else {
                        this.withdrawClick = true
                        getMoney(this.money).then(res => {
                            let _self = this
                            if (res && res.Code === 0) {
                                _self.$toast(res.Msg)
                                setTimeout(function() {
                                    location.reload()
                                    _self.withdrawClick = false
                                }, 500)
                            } else {
                                _self.withdrawClick = false
                                _self.$toast(res.Msg)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            // 上传失败 可再次点击
                            this.withdrawClick = false
                        })
                    }
                }
            } else {
                // this.withdrawClick = false
                this.$toast('请不要重复点击提现')
            }
        }
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
