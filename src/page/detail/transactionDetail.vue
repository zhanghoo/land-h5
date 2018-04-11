<template>
    <div id="transactionDetail">
        <div class="trans-detail-top">
            <div class="trans-detail-avatar">
                <img class="avatar-img" v-if="user.avatar" :src="user.avatar">
            </div>
            <div class="trans-detail-status">{{json.estatus | statusToString}}</div>
        </div>
        <div class="trans-detail-land" @click="$router.push({path: '/landDetail', query: { 'pid': json.product_id}})">
            <p class="tdl-title">{{json.name}}</p>
            <p class="tdl-local">
                <span class="tdl-local-icon my-icon-adress"></span>{{json.province}}</p>
            <p class="tdl-tags">
                <mt-button class="label" plain>挂牌</mt-button>
                <mt-button class="label" plain>商用</mt-button>
                <mt-button class="label" plain>360平方米</mt-button>
            </p>
        </div>
        <div class="trans-detail-dealinfo">
            <p class="tdd-line">投注大师币：无字段</p>
            <p class="tdd-line">预估成交楼面价：{{json.evaluate_num}}元/m²</p>
            <p class="tdd-line">估价时间：{{json.evaluate_time}}</p>
            <p class="tdd-line">方案编号：{{json.number}}</p>
        </div>
        <p v-if="type == 0 && json.estatus == 0" class="trans-detail-share">
            <mt-button class="tds-btn" type="primary" @click="share">分享</mt-button>
        </p>
        <template v-if="json.estatus == 1 || json.estatus == 2">
            <!-- 估价成功或失败 -->
            <div class="rans-detail-price" @click="$router.push({name: 'dealInformation'})">
                <div>成交楼面价
                    <span class="rdp-num">{{json.sold_area}}</span>元/m²</div>
                <span class="my-icon-more"></span>
            </div>
            <div v-if="json.estatus == 1" class="trans-detail-tips">
                <span class="tip">恭喜你，赢得了{{json.get_coin}}大师币！</span>
                <mt-button class="tds-btn" type="primary">分享</mt-button>
            </div>
            <p v-else class="trans-detail-tips fail">当工作变成游戏，生活就充满快乐！</p>
            <!-- rank-list -->
            <div class="rank-list-wrapper" v-if="json.rank_list">
                <block-slot class="rank-list first">
                    <span slot="title">前三名玩家可获得大师币及大师积分奖励</span>
                    <span slot="more"></span>
                    <div slot="conent">
                        <div class="block-slot-item first-item">
                            <div class="bs-col">排名</div>
                            <div class="bs-col">昵称</div>
                            <div class="bs-col">估价</div>
                            <div class="bs-col">大师币</div>
                            <div class="bs-col">估价时间</div>
                        </div>
                        <div class="block-slot-item" :class="{'item-title': index === 3}" v-for="(item,index) in json.rank_list" :key="index">
                            <template v-if="index !== 3">
                                <div class="bs-col">{{item.rank_num}}</div>
                                <div class="bs-col">{{item.nick_name}}</div>
                                <div class="bs-col">{{item.evaluate_num}}</div>
                                <div class="bs-col">无字段</div>
                                <div class="bs-col">{{item.evaluate_time}}</div>
                            </template>
                            <template v-else>
                                <block-slot class="rank-list">
                                    <span slot="title">前10%的玩家可获得大师积分奖励</span>
                                </block-slot>
                            </template>
                        </div>
                    </div>
                </block-slot>
            </div>

            <!-- 子页面 -->
            <router-view/>
        </template>
        <template v-else-if="status == 3">
            <!-- 已关闭 -->
            <div class="trans-detail-tips close">
                <span class="tdt-icon my-icon-guanyuwomen"></span>很抱歉本次竞猜活动因不可抗力关闭了，大师币已退回你的账户
            </div>
        </template>
    </div>
</template>
<script>
import { wxShare } from '@/api'
import { getEvaluateDetail } from '@/api/mine'
import { mapState } from 'vuex'
import blockSlot from '@/components/blockSlot'
export default {
    name: 'transactionDetail',
    components: { blockSlot },
    data() {
        return {
            status: 1, // 0待公布1已公布(估价成功)2估价失败3已关闭
            type: 0, // 0地块1房产
            json: ''
        }
    },
    computed: {
        ...mapState([
            'user'
        ])
    },
    filters: {
        statusToString(val) {
            switch (val) {
                case '0':
                    return '待公布'
                case '1':
                    return '估价成功'
                case '2':
                    return '估价失败'
                case '3':
                    return '已关闭'
            }
        }
    },
    methods: {
        getEvaluateDetail_data() {
            getEvaluateDetail(this.$route.query.id).then(res => {
                if (res && res.Data) {
                    this.json = res.Data
                }
            })
        },
        share() {
            let url = window.location.href
            wxShare(url).then(res => {
                console.log(res)
            })
        }
    },
    mounted() {
        this.getEvaluateDetail_data()
    }
}
</script>
<style lang='stylus'>
#transactionDetail {
    .trans-detail-top {
        padding: toRem(18) 0;
        flex-vertical-center();
        .trans-detail-avatar {
            width: toRem(50);
            height: toRem(50);
            border-radius: 100%;
            overflow: hidden;
            .avatar-img {
                width: 100%;
                height: 100%;
            }
        }
        .trans-detail-status {
            margin-top: toRem(12);
            font-size: toRem(18);
            color: #666;
        }
    }
    .trans-detail-land {
        padding: toRem(14.5) toRem(18);
        margin-bottom: toRem(10);
        background: $panelBg;
        font-size: toRem(13);
        color: #333;
        line-height: 1;
        .tdl-title {
            margin-bottom: toRem(13);
        }
        .tdl-local {
            margin-bottom: toRem(12.5);
            color: #666;
            .tdl-local-icon {
                margin-right: toRem(5);
                color: $appColor;
            }
        }
        .tdl-tags {
            .label {
                border: 1px solid $appColor;
                color: $appColor;
            }
        }
    }
    .trans-detail-dealinfo {
        padding: toRem(14.5) toRem(18);
        margin-bottom: toRem(10);
        background: $panelBg;
        font-size: toRem(13);
        color: #333;
        line-height: 1;
        .tdd-line {
            & + .tdd-line {
                margin-top: toRem(11);
            }
        }
    }
    .rans-detail-price {
        display: flex;
        justify-content: space-between;
        padding: toRem(16) toRem(18);
        margin-bottom: toRem(10);
        font-size: toRem(18);
        background: $panelBg;
        line-height: 1;
        .rdp-num {
            margin-left: toRem(24);
        }
    }
    .trans-detail-tips {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: toRem(8) toRem(18);
        margin-bottom: toRem(10);
        font-size: toRem(15);
        background: $panelBg;
        line-height: 1;
        .tip {
            color: $appColor;
        }
        .tds-btn {
            padding: 0 toRem(19);
            height: toRem(33);
            font-size: toRem(14);
            line-height: 1;
        }
        &.fail {
            padding: toRem(16.5) toRem(18);
            justify-content: center;
            color: $appColor;
        }
        &.close {
            padding: toRem(4.5) toRem(18);
            justify-content: flex-start;
            align-items: flex-start;
            line-height: toRem(18);
            font-size: toRem(12);
            color: #999;
            background: $appBg;
            .tdt-icon {
                margin-right: toRem(5.5);
            }
        }
    }
    .block-slot {
        &.rank-list {
            .block-slot-title {
                font-weight: 700;
                font-size: toRem(14);
            }
            .block-slot-item {
                display: flex;
                padding: toRem(11) 0;
                font-size: toRem(14);
                .bs-col {
                    text-ellipsis();
                    text-align: center;
                    font-size: toRem(12);
                    line-height: 1;
                    &:nth-child(1) {
                        width: 10%;
                    }
                    &:nth-child(2) {
                        width: 20%;
                    }
                    &:nth-child(3) {
                        width: 20%;
                    }
                    &:nth-child(4) {
                        width: 15%;
                    }
                    &:nth-child(5) {
                        width: 35%;
                    }
                }
                &.first-item {
                    font-weight: 700;
                    color: #333;
                }
                &.item-title{
                    .block-slot{
                        margin  0
                    }
                    .block-slot-head{
                        color #333
                        font-weight bold
                        padding 0
                        &:after{
                            border: none
                        }
                    }
                }
            }
            &.first {
                margin-bottom: 0;
            }
            & + .block-slot.rank-list {
                border-1px-top($borderColor);
            }
        }
    }
    .trans-detail-share {
        margin-top: toRem(120);
        padding: 0 toRem(18);
        .tds-btn {
            width: 100%;
            height: toRem(49);
            font-size: toRem(18);
        }
    }
    .mint-popup {
        width: 100%;
        height: 100%;
        background: $appBg;
    }
}
</style>
<!--
成交详情页:
从各地产页面点击进入, 地产= 地块 + 房产
包括,
1. 我的(/index/mine)->参与记录(/index/mine/partInRecord)->(点击列表内容)->本页
2. 地产大师->(地产估价)->地产估价(/landEevaluate)->(点击列表内容)->本页
3. 地产大师->(成交公告)->成交公告(/announcement)->(点击列表内容)->本页
4. 地产大师->(最新地产公布)->(点击列表内容)->本页 or 更多->(/releaseList)->(点击列表内容)->本页
ps:
1.等待公布状态, 地块下方, 有分享按钮; 房产下方, 无分享按钮
2.等待公布状态, 只有基本信息; 估价成功, 有成交价格+奖励的大师币+前三名+前10%的奖励
3.只有基本信息的等待公布时, 可跳到地产的介绍(地块/房产的概括or详情) to /landDetail
  估价成功, 多了一个 点击成功价格, 跳到交易信息页面(地块/房产) 本页面弹出交易信息
-->
