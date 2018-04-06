<template>
    <div id="recharge">
        <div class="r-account-info">
            <p>账号：<span>400787333677</span></p>
            <p>大师币：<span class="num">36543</span></p>
        </div>
        <div class="r-amount">
            <p class="ra-tip">选择充值金额</p>
            <div class="ra-btns">
                <p class="ra-btns-row">
                    <mt-button plain class="ra-btn">50</mt-button>
                    <mt-button plain class="ra-btn">100</mt-button>
                    <mt-button plain class="ra-btn">200</mt-button>
                </p>
                <p class="ra-btns-row">
                    <mt-button plain class="ra-btn">300</mt-button>
                    <mt-button plain class="ra-btn">500</mt-button>
                    <mt-button plain class="ra-btn">1000</mt-button>
                </p>
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
        <p class="r-btn-do"><mt-button class="rbd-btn" type="primary">立即充值</mt-button></p>
    </div>
</template>
<script>
export default {
    name: 'recharge',
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
        .ra-btns {
            .ra-btns-row {
                display: flex;
                margin-top: toRem(10);
                justify-content: space-between;
                .ra-btn {
                    width: toRem(105);
                    height: toRem(40);
                    border-color: $borderColor;
                    font-size: toRem(14);
                    color: #333;
                }
            }
        }
    }
    .r-way {
        padding: toRem(14) toRem(18) toRem(15);
        margin-bottom: toRem(85);
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
