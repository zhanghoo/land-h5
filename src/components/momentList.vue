<template>
    <div>
        <ul class="moment-list" v-if="json">
            <li class="list-item" v-for="(item, index) in json" :key="index">
                <div v-if="item.nick_name" class="item-user">
                    <span v-if="item.is_real_user === 0" class="user-label sys">{{item.nick_name}}</span>
                    <template v-else>
                        <img class="user-avatar" v-if="item.avatar" :src="item.avatar" @click="$router.push({path: '/userDetail', query: { userId: item.user_id }})">
                        <span class="user-name" v-if="item.nick_name">{{item.nick_name}}</span>
                        <span class="user-label" v-if="item.level">{{item.level.level_name}}</span>
                    </template>
                </div>
                <div class="item-content">
                    <!-- 需支付 -->
                    <template v-if="item.is_pay === '1' && !isMySelf">
                        <div @click="openPayMsgBox(item)">
                            <!-- 标题 -->
                            <div class="item-title">{{item.title}}</div>
                            <!-- 需支付提示 -->
                            <div class="content-pay">查看需支付{{item.money}}大师币</div>
                        </div>
                    </template>
                    <!-- 无需支付 -->
                    <template v-else>
                        <div @click="$router.push({path: '/momentDetail', query: { 'cid': item.cid}})">
                            <!-- 标题 -->
                            <div class="item-title">{{item.title}}</div>
                            <!-- 文本内容 -->
                            <template>
                                <div class="content-text" v-html="item.content"></div>
                            </template>
                        </div>
                        <!-- 音频内容 -->
                        <div v-if="item.voice_url !== '' && item.voice_url !== undefined" class="content-audio">
                            <audioPlayer :audioSrc="item.voice_url" :audioCId="item.cid"></audioPlayer>
                        </div>
                        <!-- 封面 -->
                        <template v-if="item.image && item.image != null && item.image != 'null'">
                            <router-link class="content-cover" :to="{path: '/momentDetail', query: { 'cid': item.cid}}" :class="`item-content-${item.image.length}`" tag="div">
                                <div class="cover-item" v-for="(imgItem, index) in item.image" :key="index">
                                    <img class="cover-img" :src="imgItem">
                                </div>
                            </router-link>
                        </template>
                    </template>
                </div>
                <!-- 概览 -->
                <template v-if="item.product_moment && item.product_moment !== 'null'">
                    <router-link class="content-overview" :to="{path: '/landDetail', query: { 'pid': item.pid, 'type': item.product_moment.tstatus}}" tag="div">
                        <div class="overview-title">{{item.product_moment.name}}</div>
                        <div class="overview-adress">
                            <i class="my-icon-adress"></i>{{item.product_moment.province}}
                        </div>
                        <mt-button class="overview-type" plain type="primary">{{item.product_moment.sold_type}}</mt-button>
                    </router-link>
                </template>
                <div class="item-info">
                    <i class="my-icon-zan" :class="{'active': item.is_like && item.is_like !== '0'}" @click="addZan(item)"> {{item.lnum || 0}}</i>
                    <i class="my-icon-delete" v-if="isMySelf" @click="deleteMoment(item, index)">删除</i>
                    <span class="info-time">{{item.pub_time}}</span>
                </div>
            </li>
            <!-- 地块 这里只有动态页才会有 但是 动态返回的页面里面返回product是object, 里面有purpose landDetail 里面也有 但是 是 string 此时 再用到router-link 就会报错 !!!这里需要后台支持 改一下动态页这个返回的字段 0421 -->
        </ul>
        <!-- 支付弹框 -->
        <div class="pay-msgbox-wrapper" v-if="payMsgBox">
            <transition name="bounce">
                <div class="pay-msgbox" v-if="payMsgBox">
                    <div class="pay-msgbox-header">确认支付</div>
                    <div class="pay-msgbox-content">
                        <div class="content-message">查看需支付{{payToWatchItem.money}}大师币,是否确认查看?</div>
                        <div class="content-money">
                            剩余：
                            <i class="my-icon-tongqian"></i>
                            <span class="text">{{$store.state.mine.master_coin}}</span>
                            <router-link :to="{name: 'recharge'}" class="my-icon-add"></router-link>
                        </div>
                    </div>
                    <div class="pay-msgbox-btns">
                        <div class="pay-msgbox-btn cancle" @click="payMsgBox = false">不看了</div>
                        <!-- 判断余额是否能查看 -->
                        <template v-if="$store.state.mine.master_coin >= payToWatchItem.money">
                            <div class="pay-msgbox-btn confirm" @click="confirmWatch">确认查看</div>
                        </template>
                        <template v-else>
                            <div class="pay-msgbox-btn cancle" @click="watchNoMoney">确认查看</div>
                        </template>
                    </div>
                </div>
            </transition>
            <div class="pay-msgbox-modal" v-show="payMsgBox" @click="payMsgBox = false"></div>
        </div>
    </div>
</template>
<script>
import audioPlayer from '@/components/audioPlayer'
import { postZan } from '@/api/moment'
import { delComment } from '@/api/home'
export default {
    name: 'momentList',
    components: { audioPlayer },
    props: {
        json: {
            type: Array
        },
        isMySelf: false
    },
    data() {
        return {
            wrapperHeight: 0,
            payMsgBox: false,
            payToWatchItem: ''
        }
    },
    methods: {
        addZan(item) {
            if (item.is_like === '0') {
                let params = {
                    cid: item.cid,
                    uid: this.$store.state.mine.user_id
                }
                postZan(params).then(res => {
                    if (res.Code === '0' || res.Code === 0) {
                        this.$toast('-10大师积分')
                        item.lnum++
                        item.is_like = true
                    } else {
                        this.$toast(res.Msg)
                    }
                })
            }
        },
        // 确认查看余额不足
        watchNoMoney() {
            this.$toast('大师币不足')
        },
        // 打开支付msgBox
        openPayMsgBox(item) {
            this.payMsgBox = true
            this.payToWatchItem = item
        },
        // 支付查看内容
        confirmWatch() {
            if (this.$store.state.mine.master_coin >= this.payToWatchItem.money) {
                this.$store.dispatch('post_reduceUserMoney', this.payToWatchItem.money)
                this.payToWatchItem.is_pay = '0'
                this.$toast(`-${this.payToWatchItem.money}大师币`)
                this.$router.push({ path: '/momentDetail', query: { 'cid': this.payToWatchItem.cid } })
            }
            this.payMsgBox = false
        },
        // 删除用户评论
        deleteMoment(item, index) {
            if (item && item.cid) {
                this.$msgBox({
                    message: '确定删除吗？',
                    showCancelButton: true,
                    confirmButtonText: '删除',
                    cancelButtonText: '取消'
                }).then(action => {
                    if (action === 'confirm') {
                        // 发送请求
                        delComment(item.cid).then(res => {
                            if (res) {
                                this.$toast(res.Msg)
                                this.json.splice(index, 1)
                            }
                        })
                    }
                })
            }
        }
    }
}
</script>
<style lang='stylus'>
$mainText = #333;
$subText = #666;
.moment-list {
    margin: 0;
    .list-item {
        padding: toRem(15) toRem(18) toRem(12);
        margin-bottom: toRem(10);
        background: #fff;
        border-1px-bottom(#e6e6e6);
        .item-user {
            display: flex;
            align-items: center;
            margin-bottom: toRem(10);
            font-size: 0;
            .user-avatar {
                width: toRem(25);
                height: toRem(25);
                border-radius: 100%;
            }
            .user-name {
                color: $mainText;
                font-size: toRem(14);
                margin: 0 toRem(8);
            }
            .user-label {
                padding: toRem(3.5) toRem(6.5);
                margin-left: toRem(4.5);
                font-size: toRem(10);
                height: inherit;
                color: $appColor;
                border: 1px solid $appColor;
                border-radius: toRem(3);
                vertical-align: middle;
                &.sys {
                    margin-left: 0;
                }
            }
        }
        .item-title {
            color: $mainText;
            font-size: toRem(16);
            margin-bottom: toRem(10);
        }
        .item-content {
            margin-bottom: toRem(12);
            font-size: toRem(12);
            .content-cover {
                display: flex;
                align-items: flex-start;
                max-height: toRem(180);
                overflow: hidden;
                .cover-item {
                    height: 100%;
                    .cover-img {
                        display: block;
                        width: 100%;
                    }
                }
                &.item-content-1 {
                    .cover-item {
                        max-width: 100%;
                        max-height: 100%;
                        margin: auto 0;
                    }
                }
                &.item-content-2 {
                    .cover-item {
                        width: 50%;
                        &:nth-child(1) {
                            padding-right: 0.5%;
                        }
                        &:nth-child(2) {
                            padding-left: 0.5%;
                        }
                    }
                }
                &.item-content-3 {
                    .cover-item {
                        width: 33%;
                        &:nth-child(2) {
                            margin: 0 0.5%;
                        }
                    }
                }
            }
            .content-pay {
                color: $subText;
                font-size: toRem(14);
                margin-bottom: toRem(10);
            }
            .content-text {
                margin-bottom: toRem(10);
                color: $subText;
                font-size: toRem(16);
                a {
                    color: $appColor;
                }
            }
            .content-audio {
                margin-bottom: toRem(10);
            }
        }
        .content-overview {
            padding: toRem(14) toRem(12);
            margin-top: toRem(10);
            background: #f5f5f5;
            .overview-title {
                color: $mainText;
                font-size: toRem(15);
                text-align: justify;
                margin-bottom: toRem(10);
            }
            .overview-adress {
                display: flex;
                align-items: center;
                color: $subText;
                font-size: toRem(14);
                margin-bottom: toRem(10);
                i {
                    color: $appColor;
                    margin-right: toRem(5);
                }
            }
            .overview-type {
                margin: 0 toRem(5) 0 0;
                height: toRem(20);
                line-height: toRem(20);
                border-radius: toRem(2);
                font-size: toRem(12);
                .mint-button-text {
                    line-height: toRem(20);
                }
            }
        }
        .item-info {
            display: flex;
            align-items: center;
            padding-top: toRem(12);
            border-1px-top(#eee);
            .my-icon-zan {
                color: #ccc;
                font-size: toRem(14);
                transform: scale(0.9);
                &.active {
                    color: $appColor;
                }
            }
            .my-icon-delete {
                color: #ccc;
                font-size: toRem(14);
                transform: scale(0.9);
                margin-left: toRem(10);
            }
            .info-time {
                color: #ccc;
                font-size: toRem(14);
                transform: scale(0.9);
                margin-left: auto;
            }
        }
    }
    .mint-nomore {
        padding-bottom: toRem(10);
        text-align: center;
        font-size: toRem(12);
        color: #999;
    }
    .mint-loadmore-bottom {
        span {
            display: inline-block;
            transition: 0.2s linear;
            vertical-align: middle;
            color: #999;
            font-size: toRem(14);
            &.is-rotate {
                transform: rotate(180deg);
            }
        }
    }
}
.pay-msgbox-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3000;
    .pay-msgbox {
        position: fixed;
        top: 50%;
        left: 50%;
        background-color: #fff;
        width: 80%;
        border-radius: toRem(5);
        font-size: toRem(15);
        overflow: hidden;
        backface-visibility: hidden;
        padding: toRem(15) toRem(10);
        z-index: 3002;
        transform: translate3d(-50%, -50%, 0);
        .pay-msgbox-header {
            font-size: toRem(16);
            font-weight: 700;
            color: #666;
            text-align: center;
            padding-bottom: toRem(15);
            border-1px-bottom(#eee);
        }
        .pay-msgbox-content {
            position: relative;
            color: #000;
            padding: toRem(25) toRem(10);
            .content-message {
                font-size: toRem(15);
                margin-bottom: toRem(10);
            }
            .content-money {
                .my-icon-tongqian {
                    color: #f9c546;
                }
                .text {
                    color: #666;
                    margin: 0 toRem(10) 0 toRem(5);
                }
                .my-icon-add {
                    color: $appColor;
                }
            }
        }
        .pay-msgbox-btns {
            display: flex;
            height: 40px;
            line-height: 40px;
            justify-content: space-around;
            .pay-msgbox-btn {
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
                width: 50%;
                background: $appColor;
                margin-left: toRem(5);
            }
        }
    }
    .pay-msgbox-modal {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        background: #000;
        z-index: 3001;
        transition: all 0.2s;
    }
}
</style>
