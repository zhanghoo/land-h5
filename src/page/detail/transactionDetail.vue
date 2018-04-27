<template>
    <div id="transactionDetail">
        <div v-if="json.is_parp === '1'" class="trans-detail-top">
            <!-- 如果本人参加了, 才显示 -->
            <div class="trans-detail-avatar">
                <img class="avatar-img" v-if="mine.avatar" :src="mine.avatar">
            </div>
            <div class="trans-detail-status">{{json.estatus | statusToString}}</div>
        </div>
        <div class="trans-detail-land" @click="$router.push({path: '/landDetail', query: { 'pid': json.product_id}})">
            <p class="tdl-title">{{json.name}}</p>
            <p class="tdl-local">
                <span class="tdl-local-icon my-icon-adress"></span>{{json.province}}</p>
            <p class="tdl-tags">
                <!-- 出售方式 sold_type -->
                <mt-button class="label" plain>{{json.sold_type}}</mt-button>
                <!-- 用途 purpose 1商住 2商办 3工业 -->
                <mt-button class="label" plain>{{json.purpose | purposeToString}}</mt-button>
                <!-- 面积 sold_area -->
                <mt-button class="label" plain>{{json.sold_area}}平方米</mt-button>
            </p>
        </div>
        <div v-if="json.is_parp === '1'" class="trans-detail-dealinfo">
            <!-- PS: 据0412需求大师币改为大师积分, 是固定的 100 -->
            <p class="tdd-line">预估大师积分：100</p>
            <p class="tdd-line">预估成交楼面价：{{json.evaluate_num}}元/m²</p>
            <p class="tdd-line">估价时间：{{json.evaluate_time}}</p>
            <p class="tdd-line">方案编号：{{json.number}}</p>
        </div>
        <p v-if="type == 0 && json.estatus == 0" class="trans-detail-share">
            <mt-button class="tds-btn" type="primary" @click="share">分享</mt-button>
        </p>
        <template v-if="json.estatus == 1 || json.estatus == 2">
            <!-- 估价成功或失败 -->
            <router-link class="rans-detail-price" :to="{ path: '/dealInfo', query: {'bid': json.bid} }">
                <div>
                    成交楼面价
                    <span class="rdp-num">{{json.closing_cost}}</span>
                    元/m²
                </div>
                <span class="my-icon-more"></span>
            </router-link>
            <template v-if="json.is_parp === '1'">
                <div v-if="json.estatus == 1" class="trans-detail-tips">
                    <span class="tip">恭喜你，赢得了{{json.get_coin}}大师积分！</span>
                    <mt-button class="tds-btn" type="primary" @click="share">分享</mt-button>
                </div>
                <p v-else class="trans-detail-tips fail">当工作变成游戏，生活就充满快乐！</p>
            </template>
            <!-- rank-list -->
            <div class="rank-list-wrapper" v-if="json.rank_list && json.rank_list != 'null'">
                <block-slot class="rank-list first">
                    <!-- <span slot="title">前三名玩家可获得大师币及大师积分奖励</span> -->
                    <span slot="title">此次估价排名前10%玩家可获得大师积分奖励</span>
                    <span slot="more"></span>
                    <div slot="conent">
                        <div class="block-slot-item first-item">
                            <div class="bs-col">排名</div>
                            <div class="bs-col">昵称</div>
                            <div class="bs-col">估价</div>
                            <div class="bs-col">大师积分</div>
                            <div class="bs-col">估价时间</div>
                        </div>
                        <div class="block-slot-item" v-for="(item,index) in json.rank_list" :key="index">
                            <div class="bs-col">{{item.rank_num}}</div>
                            <div class="bs-col">{{item.nick_name}}</div>
                            <div class="bs-col">{{item.evaluate_num}}元/m²</div>
                            <div class="bs-col">{{item.master_score}}</div>
                            <div class="bs-col">{{item.evaluate_time}}</div>
                        </div>
                    </div>
                </block-slot>
            </div>
        </template>
        <template v-else-if="json.estatus == 3">
            <!-- 已关闭 -->
            <div class="trans-detail-tips close">
                <span class="tdt-icon my-icon-guanyuwomen"></span>很抱歉本次竞猜活动因不可抗力关闭了，大师币已退回你的账户
            </div>
        </template>
        <mt-popup v-model="popupVisible2" position="center">
            <div class="mine-invitation2">
                <div class="mi2-header">邀请好友
                    <span class="mi2-close my-icon-close" @click="clickInvitation2"></span>
                </div>
                <div class="mi2-content">
                    <div class="mi2-line">
                        <span class="mi2-title">第一步</span>点击右上角的
                        <span class="mi2-menu">
                            <i class="mi2-menu-icon my-icon-gengduo"></i>
                        </span>微信功能
                    </div>
                    <div class="mi2-line">
                        <span class="mi2-title">第二步</span>选择
                        <span class="mi2-share">
                            <i class="mi2-share-icon my-icon-fenxiang1"></i>发送给好友</span>分享游戏到微信好友
                    </div>
                </div>
                <div class="mi2-btns">
                    <div class="mi2-btn confirm" @click="clickInvitation2">确&nbsp;认</div>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import { wxShare } from '@/api/wx'
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
            json: '',
            popupVisible2: false
        }
    },
    computed: {
        ...mapState([
            'mine',
            'shareInfoDesc',
            'isWeiXin'
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
        },
        purposeToString(val) {
            switch (val) {
                case '1':
                    return '商住'
                case '2':
                    return '商办'
                case '3':
                    return '工业'
            }
        }
    },
    methods: {
        getEvaluateDetail_data() {
            // console.log(this.$route.query.id)
            getEvaluateDetail(this.$route.query.id).then(res => {
                if (res && res.Data) {
                    this.json = res.Data
                }
            })
        },
        share() {
            // transactionDetail页面 和 mine页面 分享需要重新设置 加上userid, 这里分享的是当前详情页面
            // 其余页面分享的都是, empty入口界面
            // 遗留分享问题, 在其他页面的分享应该是默认的全局默认的shareInfo 在 main.js 里面 每个router里面拼接一下链接, 在state 里面保存其他的微信参数
            let url = `${window.location.href}&userid=${this.mine.user_id}`
            wxShare(url).then(res => {
                if (res && res.Data) {
                    this.shareInfo = res.Data
                    this.clickInvitation2()
                    this.onWxMenuShare()
                }
            })
        },
        clickInvitation2() {
            this.popupVisible2 = !this.popupVisible2
        },
        onWxMenuShare() {
            // 配置微信分享按钮
            let _shareInfo = this.shareInfo
            console.log(_shareInfo)
            if (this.isWeiXin) {
                // alert('点击了分享, 开始config')
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: _shareInfo.appId, // 必填，公众号的唯一标识
                    timestamp: _shareInfo.timestamp, // 必填，生成签名的时间戳
                    nonceStr: _shareInfo.nonceStr, // 必填，生成签名的随机串
                    signature: _shareInfo.signature, // 必填，签名
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'translateVoice',
                        'startRecord',
                        'stopRecord',
                        'onVoiceRecordEnd',
                        'playVoice',
                        'onVoicePlayEnd',
                        'pauseVoice',
                        'stopVoice',
                        'uploadVoice',
                        'downloadVoice'
                    ]
                })
                wx.ready(function () {
                    wx.onMenuShareTimeline({
                        'title': `transitionDetail-${shareInfoDesc.timeline_title}`,
                        'imgUrl': shareInfoDesc.timeline_imgUrl,
                        'link': _shareInfo.url
                    })
                    wx.onMenuShareAppMessage({
                        'title': `transitionDetail-${shareInfoDesc.appmessage_title}`,
                        'desc': shareInfoDesc.appmessage_desc,
                        'imgUrl': shareInfoDesc.appmessage_imgUrl,
                        'link': _shareInfo.url
                    })
                })
            } else {
                // alert('呀T_T, 好像出错了~~快去微信朋友圈分享试试吧')
            }
        }
    },
    mounted() {
        this.getEvaluateDetail_data()
    }
}
</script>
<style lang='stylus'>
#transactionDetail {
    overflow: auto;
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
        background: transparent;
        .mine-invitation2 {
            position: fixed;
            top: 50%;
            left: 50%;
            background-color: #fff;
            width: 80%;
            border-radius: toRem(5);
            font-size: toRem(15);
            overflow: hidden;
            backface-visibility: hidden;
            padding: toRem(15) 0 toRem(10);
            z-index: 3002;
            transform: translate3d(-50%, -50%, 0);
            .mi2-header {
                position: relative;
                font-size: toRem(16);
                font-weight: 700;
                color: #666;
                text-align: center;
                padding-bottom: toRem(15);
                border-1px-bottom(#eee);
                .mi2-close {
                    position: absolute;
                    top: 0;
                    right: toRem(10);
                    width: toRem(20);
                    height: toRem(20);
                    line-height: toRem(20);
                    background: #ccc;
                    border-radius: 100%;
                    color: #fff;
                    font-size: toRem(12);
                }
            }
            .mi2-content {
                position: relative;
                color: #000;
                padding: toRem(20) toRem(20);
                .mi2-line {
                    font-size: toRem(14);
                    line-height: 2;
                    .mi2-title {
                        display: inline-block;
                        margin-right: toRem(5);
                        font-weight: 700;
                    }
                    .mi2-menu {
                        display: inline-block;
                        margin: 0 toRem(5) 0 toRem(1);
                        width: toRem(22);
                        height: toRem(15);
                        line-height: toRem(11);
                        background: #000;
                        color: #fff;
                        text-align: center;
                        .mi2-menu-icon {
                            vertical-align: middle;
                        }
                    }
                    .mi2-share {
                        display: inline-block;
                        margin: 0 toRem(5) 0 toRem(1);
                        width: toRem(90);
                        height: toRem(20);
                        line-height: toRem(20);
                        background: #555;
                        color: #fff;
                        text-align: center;
                        font-size: toRem(11);
                        .mi2-share-icon {
                            position: relative;
                            top: toRem(-2);
                            right: toRem(2);
                            vertical-align: middle;
                            font-size: toRem(18);
                        }
                    }
                }
            }
            .mi2-btns {
                display: flex;
                padding: 0 toRem(10);
                height: 40px;
                line-height: 40px;
                justify-content: space-around;
                .mi2-btn {
                    display: block;
                    background-color: #fff;
                    flex: 1;
                    text-align: center;
                    color: #fff;
                    border-radius: toRem(5);
                }
                .cancle {
                    width: 50%;
                    background: #ccc;
                    margin-right: toRem(5);
                }
                .confirm {
                    width: 100%;
                    background: $appColor;
                }
            }
        }
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
