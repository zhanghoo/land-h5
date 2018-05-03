<template>
    <div id="recharge">
        <div class="r-account-info">
            <p>账号：
                <span>{{mine.user_id}}</span>
            </p>
            <p>大师币：
                <span class="num">{{mine.master_coin}}</span>
            </p>
        </div>
        <div class="r-amount">
            <p class="ra-tip">
                <span>选择充值金额</span>
                <span class="ra-tip-t">首次充值额外获得200大师积分</span>
            </p>
            <div class="ra-btns">
                <span class="ra-btn" v-for="(item, index) in rechargeMoneys" :key="index" :class="{'active': selectMoney === item}" @click="selectMoney = item">{{item}}</span>
            </div>
        </div>
        <div class="r-way">
            <p class="rw-tip">选择支付方式</p>
            <div class="rw-platform">
                <div class="rw-p-l">
                    <span class="rwpl-icon my-icon-z-weixin"></span>&nbsp;&nbsp;微信支付
                </div>
                <div class="rw-p-r selected">
                    <span class="my-icon-chenggong1"></span>
                </div>
            </div>
        </div>
        <div class="land-detail-tip land-detail-border">
            <span class="ldt-icon my-icon-guanyuwomen"></span>
            充值比例1:1，充值后可获得相应金额的积分。大师币可提现。
        </div>
        <p class="r-btn-do">
            <mt-button class="rbd-btn" type="primary" @click="callpay">立即充值</mt-button>
        </p>
    </div>
</template>
<script>
import { getAccount, postRecharge } from '@/api/mine'
import { mapState } from 'vuex'
export default {
    name: 'recharge',
    data() {
        return {
            rechargeMoneys: [],
            selectMoney: 0,
            account: null
        }
    },
    computed: {
        ...mapState([
            'mine', 'isWeiXin'
        ])
    },
    methods: {
        getAccountData() {
            getAccount().then(res => {
                if (res && res.Data) {
                    // this.account = res.Data
                    this.rechargeMoneys = res.Data.charge_num
                }
            })
        },
        post_Recharge() {
            let _self = this
            if (_self.selectMoney > 0) {
                if (_self.isWeiXin) {
                    postRecharge(_self.selectMoney).then(res => {
                        if (res && res.Data) {
                            let wxPayConfig = res.Data
                            alert(wxPayConfig.package)
                            wx.chooseWXPay({
                                timestamp: wxPayConfig.timeStamp,
                                nonceStr: wxPayConfig.nonceStr,
                                package: wxPayConfig.package,
                                signType: wxPayConfig.signType,
                                paySign: wxPayConfig.paySign,
                                success(res) {
                                    // _self.$toast('充值成功')
                                }
                            })
                        } else {
                            _self.$toast(res.Msg)
                        }
                    })
                } else {
                    _self.$toast('请在微信客户端打开链接')
                }
            } else {
                _self.$toast('请选择充值金额')
            }
        },
        onBridgeReady: function () {
            let _self = this
            if (_self.selectMoney > 0) {
                postRecharge(_self.selectMoney).then(res => {
                    if (res && res.Data) {
                        let wxPayConfig = res.Data
                        console.log(wxPayConfig)
                        if (typeof WeixinJSBridge !== 'undefined') {
                            WeixinJSBridge.invoke(
                                'getBrandWCPayRequest', {
                                    'appId': wxPayConfig.appId,
                                    'timeStamp': wxPayConfig.timeStamp,
                                    'nonceStr': wxPayConfig.nonceStr,
                                    'package': wxPayConfig.package,
                                    'signType': wxPayConfig.signType,
                                    'paySign': wxPayConfig.paySign
                                },
                                function (res) {
                                    // alert(res.err_msg)
                                    if (res.err_msg === 'get_brand_wcpay_request:ok') {
                                        _self.$toast('微信支付成功')
                                        setTiemout(() => {
                                          _self.$router.go(-1)
                                          location.reload()
                                        }, 1500)
                                    } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                                        _self.$toast('用户取消支付')
                                        // window.location.href = 'gift_failview.do?out_trade_no=' + this.orderId
                                    } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                                        _self.$toast('网络异常，请重试')
                                    }
                                }
                            )
                        } else {
                             _self.$toast('请在微信客户端打开链接')
                        }
                    } else {
                        _self.$toast(res.Msg)
                    }
                })
            } else {
                _self.$toast('请选择充值金额')
            }
        },
        callpay() {
            // 引用微信内置浏览器的支付方法 WeixinJSBridge.invoke 不需要引入 js
            if (typeof WeixinJSBridge === 'undefined') {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(), false)
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady())
                    document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady())
                }
            } else {
                this.onBridgeReady()
            }
        }
    },
    created() {
        // 在当前支付页面的#号前边加上? 微信目录验证会忽略掉? 号后的参数
        // 为了取消多级别的目录, 直接定位到根目录, 注意路由器规则添加位置
        let config = {}
        config.url = window.location.href
        if (!config.url.match(/\?/)) {
            location.replace(window.location.href.split('#')[0] + '?' + window.location.hash)
        }
    },
    mounted() {
        this.getAccountData()
    }
}
</script>
<style lang='stylus'>
#recharge {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 200;
    background: $appBg;
    .r-account-info {
        padding: toRem(13) toRem(18);
        margin-bottom: toRem(10);
        line-height: toRem(24);
        color: #666;
        font-size: toRem(14);
        background: $panelBg;
        .num {
            color: $appColor;
        }
    }
    .r-amount {
        padding: toRem(14) toRem(18);
        margin-bottom: toRem(10);
        font-size: toRem(14);
        line-height: toRem(18);
        color: #333;
        background: $panelBg;
        .ra-tip{
            margin-bottom toRem(10)
            .ra-tip-t {
                font-size: toRem(12);
                color: #999;
            }
        }
        .ra-btns {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            .ra-btn {
                max-width: 30%;
                min-width: 30%;
                margin-bottom: toRem(10);
                border-color: $borderColor;
                font-size: toRem(14);
                color: #333;
                text-align center
                padding toRem(8) toRem(12)
                border: 1px solid $borderColor;
                border-radius toRem(5)
                &:nth-child(3n-1) {
                    margin: 0 5% toRem(10);
                }
                &.active{
                    color #fff
                    background $appColor
                    border-color: $appColor
                }
            }
        }
    }
    .r-way {
        padding: toRem(14) toRem(18) 0;
        font-size: toRem(14);
        line-height: toRem(18);
        color: #333;
        background: $panelBg;
        .rw-tip {
            padding-bottom: toRem(15);
            border-1px-bottom($borderColor);
        }
        .rw-platform {
            display: flex;
            padding-top: toRem(15);
            justify-content: space-between;
            align-items: center;
            .rw-p-l {
                font-size: toRem(13);
                color: #666;
                .rwpl-icon {
                    font-size: toRem(25);
                    color: #6BCA24;
                    vertical-align: middle;
                }
            }
            .rw-p-r {
                font-size: toRem(20);
                &.selected {
                    color: $appColor;
                }
            }
        }
    }
    .land-detail-tip {
        padding: toRem(14) toRem(18) toRem(15);
        margin-bottom: toRem(85);
        font-size: toRem(14);
        line-height: toRem(18);
        color: #999;
        background: $panelBg;
        .ldt-icon {
            margin-right: toRem(3.5);
        }
    }
    .r-btn-do {
        padding: 0 toRem(18);
        .rbd-btn {
            width: 100%;
            height: toRem(49);
            font-size: toRem(18);
        }
    }
}
</style>
