<template>
    <div id="mineScore">
        <div class="m-score-count">
            <p class="count">当前大师积分：<span class="num">36543</span></p>
            <p class="rule"  @click="clickInvitation"><span class="icon my-icon-tishi"></span>&nbsp;规则</p>
        </div>
        <ul class="m-score-list">
            <li class="m-score-item">
                <div class="m-score-item-record">
                    <div class="sir-desc">签到</div>
                    <div class="sir-date">2018-04-06 10:48</div>
                </div>
                <div class="m-score-item-num">+15</div>
            </li>
            <li class="m-score-item">
                <div class="m-score-item-record">
                    <div class="sir-desc">被点赞</div>
                    <div class="sir-date">2018-04-06 10:48</div>
                </div>
                <div class="m-score-item-num">+20</div>
            </li>
            <li class="m-score-item">
                <div class="m-score-item-record">
                    <div class="sir-desc">未签到</div>
                    <div class="sir-date">2018-04-06 10:48</div>
                </div>
                <div class="m-score-item-num">-15</div>
            </li>
            <li class="m-score-item">
                <div class="m-score-item-record">
                    <div class="sir-desc">提现</div>
                    <div class="sir-date">2018-04-06 10:48</div>
                </div>
                <div class="m-score-item-num">-200</div>
            </li>
            <li class="m-score-item">
                <div class="m-score-item-record">
                    <div class="sir-desc">参与估价</div>
                    <div class="sir-date">2018-04-06 10:48</div>
                </div>
                <div class="m-score-item-num">+30</div>
            </li>
        </ul>
        <mt-popup
            v-model="popupVisible"
            position="right"
            :modal="false">
            <div class="m-score-rule" @click="clickInvitation">
                <div class="m-score-count">
                    <p class="count">当前大师积分：<span class="num">36543</span></p>
                </div>
                <div class="m-score-detail">
                    <div class="sd-title"><span class="my-icon-tishi"></span>&nbsp;积分规则</div>
                    <div class="sd-desc">大师积分是地产大师会员用户可以在使用本游戏软件中获取一定的积分，同时根据累计获取的积分可以升级至不同的会员等级，等级越高的用户拥有更高的威望哦。</div>
                    <div class="sd-title-level">等级划分如下：</div>
                    <table class="m-score-table">
                        <thead>
                            <tr><th class="st-h1">等级</th><th class="st-h2">大师积分</th><th class="st-h3">等级名称</th></tr>
                        </thead>
                        <tbody>
                            <tr><td class="st-1">v0</td><td class="st-2">排名最后2%</td><td class="st-3">地产狗</td></tr>
                            <tr><td class="st-1">v1</td><td class="st-2">排名78%-98%</td><td class="st-3">地产人</td></tr>
                            <tr><td class="st-1">v2</td><td class="st-2">排名58%-78%</td><td class="st-3">地产经理</td></tr>
                            <tr><td class="st-1">v3</td><td class="st-2">排名38%-58%</td><td class="st-3">地产精英</td></tr>
                            <tr><td class="st-1">v4</td><td class="st-2">排名34%-38%</td><td class="st-3">地产大师一级</td></tr>
                            <tr><td class="st-1">v5</td><td class="st-2">排名30%-34%</td><td class="st-3">地产大师二级</td></tr>
                            <tr><td class="st-1">v6</td><td class="st-2">排名26%-30%</td><td class="st-3">地产大师三级</td></tr>
                            <tr><td class="st-1">v7</td><td class="st-2">排名22%-26%</td><td class="st-3">地产大师四级</td></tr>
                            <tr><td class="st-1">v8</td><td class="st-2">排名18%-22%</td><td class="st-3">地产大师五级</td></tr>
                            <tr><td class="st-1">v9</td><td class="st-2">排名14%-18%</td><td class="st-3">地产大师六级</td></tr>
                            <tr><td class="st-1">v10</td><td class="st-2">排名10%-14%</td><td class="st-3">地产大师七级</td></tr>
                            <tr><td class="st-1">v11</td><td class="st-2">排名6%-10%</td><td class="st-3">地产大师八级</td></tr>
                            <tr><td class="st-1">v12</td><td class="st-2">排名2%-6%</td><td class="st-3">地产大师九级</td></tr>
                            <tr><td class="st-1">v13</td><td class="st-2">排名前2%</td><td class="st-3">地产大亨</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
export default {
    name: 'mineScore',
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
        }
    },
    mounted() {

    }
}
</script>
<style lang='stylus'>
#mineScore {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 200;
    background: $appBg;
    .m-score-count {
        display: flex;
        padding: toRem(15) toRem(19);
        color: #666;
        justify-content: space-between;
        background: $panelBg;
        border-1px-bottom($borderColor);
        .count {
            font-size: toRem(14);
            .num {
                color: $appColor;
            }
        }
        .rule {
            font-size: toRem(12);
        }
    }
    .m-score-list {
        padding: 0 toRem(18);
        background: $panelBg;
        .m-score-item {
            padding: toRem(14) 0;
            display: flex;
            justify-content: space-between;
            .m-score-item-record {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                text-align: left;
                .sir-desc {
                    font-size: toRem(15);
                    color: #333;
                }
                .sir-date {
                    margin-top: toRem(12);
                    font-size: toRem(10);
                    color: #ccc;
                }
            }
            .m-score-item-num {
                display: flex;
                align-items: center;
                font-size: toRem(15);
                text-align: right;
                color: $appColor;
            }
            & + .m-score-item {
                border-1px-top($borderColor);
            }
        }
    }
    .mint-popup {
        width: 100%;
        height: 100%;
        background: $appBg;
        overflow: scroll;
        .m-score-rule {
            padding-bottom: toRem(24);
            background: $panelBg;
            .m-score-detail {
                padding: 0 toRem(19);
                background: $panelBg;
                .sd-title {
                    padding: toRem(15) 0;
                    font-size: toRem(13);
                    border-1px-bottom($borderColor);
                }
                .sd-desc {
                    padding: toRem(13) 0;
                    font-size: toRem(13);
                    line-height: toRem(18);
                    color: #666;
                }
                .sd-title-level {
                    margin: toRem(4) 0;
                    font-size: toRem(13);
                    line-height: toRem(18);
                    color: #333;
                    font-weight: 700;
                }
                .m-score-table {
                    background: $appBg;
                    width: 100%;
                    line-height: toRem(42);
                    text-align: center;
                    font-size: toRem(13);
                    .st-h1 {
                        border-right: 1px solid $borderColor;
                    }
                    .st-h2 {
                        border-right: 1px solid $borderColor;
                    }
                    .st-1 {
                        width: 25%;
                        border-top: 1px solid $borderColor;
                        border-right: 1px solid $borderColor;
                    }
                    .st-2 {
                        width: 38%;
                        border-top: 1px solid $borderColor;
                        border-right: 1px solid $borderColor;
                    }
                    .st-3 {
                        width: 37%;
                        border-top: 1px solid $borderColor;
                    }
                }
            }
        }
    }
}
</style>
