<template>
    <div class="moment-list">
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                <ul class="page-loadmore-list">
                    <template v-if="json">
                        <li class="list-item" v-for="(item,index) in json" :key="index">
                            <div class="item-user">
                                <img class="user-avatar" v-if="item.avatar" :src="item.avatar">
                                <span class="user-name" v-if="item.nick_name">{{item.nick_name}}</span>
                                <mt-button class="label" plain type="primary" v-if="item.label">{{item.label}}</mt-button>
                            </div>
                            <div class="item-title">{{item.title}}</div>
                            <div class="item-content">
                                <!-- 封面 -->
                                <template v-if="item.image && item.image != null && item.image != 'null'">
                                    <router-link class="content-cover"
                                     :to="{path: '/momentDetail', query: { 'cid': item.cid}}"
                                     :class="`item-content-${item.image.length}`"
                                      tag="div">
                                         <img v-for="(item, index) in item.image"
                                              :src="item"
                                              :key="index"
                                              class="cover-img">
                                     </router-link>
                                </template>
                                <!-- 需支付 -->
                                <template v-if="item.is_pay === '1'">
                                    <div class="content-pay" @click="openPayMsgBox(item)">查看需支付{{item.money}}大师币</div>
                                </template>
                                <!-- 概览 -->
                                <template v-if="item.mode === 'overview'">
                                    <router-link class="content-overview" :to="{path: '/momentDetail', query: { 'cid': item.cid}}" tag="div">
                                        <div class="overview-title">{{item.subTitle}}</div>
                                        <div class="overview-adress">
                                            <i class="my-icon-adress"></i>{{item.adress}}</div>
                                        <div class="overview-label" v-if="item.subLabel">
                                            <mt-button class="label" plain type="primary" v-for="(item, index) in item.subLabel" :key="index">{{item}}</mt-button>
                                        </div>
                                    </router-link>
                                </template>
                            </div>
                            <div class="item-info">
                                <i class="my-icon-zan" :class="{'active': item.is_like !== '0'}" @click="addZan(item)"> {{item.lnum || 0}}</i>
                                <span class="info-time">{{item.pub_time}}</span>
                            </div>
                        </li>
                    </template>
                    <template v-else>
                        <li v-for="(item, index) in momentList" :key="index" class="list-item page-loadmore-listitem">
                            <div class="item-user">
                                <img class="user-avatar" v-if="item.avatar" :src="item.avatar">
                                <span class="user-name" v-if="item.nick_name">{{item.nick_name}}</span>
                                <mt-button class="label" plain type="primary" v-if="item.level">{{item.level.level_name}}</mt-button>
                            </div>
                            <div class="item-title">{{item.title}}</div>
                            <div class="item-content">
                                <!-- 封面 -->
                                <template v-if="item.image && item.image != null && item.image != 'null'">
                                    <router-link class="content-cover"
                                     :to="{path: '/momentDetail', query: { 'cid': item.cid}}"
                                     :class="`item-content-${item.image.length}`"
                                      tag="div">
                                         <img v-for="(item, index) in item.image"
                                              :src="item"
                                              :key="index"
                                              class="cover-img">
                                     </router-link>
                                </template>
                                <!-- 需支付 -->
                                <template v-if="item.is_pay === '1'">
                                    <div class="content-pay" @click="openPayMsgBox(item)">查看需支付{{item.money}}大师币</div>
                                </template>
                                <!-- 概览 -->
                                <template v-if="item.mode === 'overview'">
                                    <router-link class="content-overview" :to="{path: '/momentDetail', query: { 'cid': item.cid}}" tag="div">
                                        <div class="overview-title">{{item.subTitle}}</div>
                                        <div class="overview-adress">
                                            <i class="my-icon-adress"></i>{{item.adress}}</div>
                                        <div class="overview-label" v-if="item.subLabel">
                                            <mt-button class="label" plain type="primary" v-for="(item, index) in item.subLabel" :key="index">{{item}}</mt-button>
                                        </div>
                                    </router-link>
                                </template>
                            </div>
                            <div class="item-info">
                                <i class="my-icon-zan" :class="{'active': item.is_like !== '0'}" @click="addZan(item)"> {{item.lnum || 0}}</i>
                                <span class="info-time">{{item.pub_time}}</span>
                            </div>
                        </li>
                    </template>
                </ul>
                <div v-show="allLoaded" class="mint-nomore">没有更多了...</div>
                <div slot="bottom" class="mint-loadmore-bottom">
                    <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                    <span v-show="bottomStatus === 'loading'">
                        <mt-spinner type="snake"></mt-spinner>
                    </span>
                </div>
            </mt-loadmore>
        </div>
        <!-- 支付弹框 -->
        <div class="pay-msgbox-wrapper">
            <transition name="bounce">
                <div class="pay-msgbox" v-if="payMsgBox">
                    <div class="pay-msgbox-header">确认支付</div>
                    <div class="pay-msgbox-content">
                        <div class="content-message">查看需支付{{payToWatchItem.money}}大师币,是否确认查看?</div>
                        <div class="content-money">
                            剩余：
                            <i class="my-icon-tongqian"></i>
                            <span class="text">{{$store.state.mine.money}}</span>
                            <router-link :to="{name: 'recharge'}" class="my-icon-add"></router-link>
                        </div>
                    </div>
                    <div class="pay-msgbox-btns">
                        <div class="pay-msgbox-btn cancle" @click="payMsgBox = false">不看了</div>
                        <div class="pay-msgbox-btn confirm" @click="confirmWatch">确认查看</div>
                    </div>
                </div>
            </transition>
            <div class="pay-msgbox-modal" v-show="payMsgBox" @click="payMsgBox = false"></div>
        </div>
    </div>
</template>
<script>
import { postZan, getMomentList } from '@/api/moment'
import { getLandAbstract } from '@/api'
export default {
    name: 'momentList',
    props: {
        json: {
            type: Array // json传时用json 不传是 用 本页的 momentList
        },
        page: {
            type: String
        }
    },
    computed: {

    },
    data() {
        return {
            list: [],
            momentList: [],
            pageCount: 0,
            allLoaded: false,
            bottomStatus: '',
            wrapperHeight: 0,
            payMsgBox: false,
            payToWatchItem: '',
            p: 1
        }
    },
    created() {
        if (this.page === 'moment') {
            // 动态页
            this.getMomentList_data()
        } else if (this.page === 'landDetail') {
            // 评论
            this.getLandAbstract_data()
        }
    },
    mounted() {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    },
    methods: {
        handleBottomChange(status) {
            this.bottomStatus = status
        },
        loadBottom() {
            setTimeout(() => {
                if (this.page === 'moment') {
                    // 动态页
                    this.getMomentList_data()
                    // this.allLoaded = true
                    this.$refs.loadmore.onBottomLoaded()
                } else if (this.page === 'landDetail') {
                    // 评论
                    // console.log('loadBottom', this.pageCount)
                    if (this.pageCount === 0) {
                        this.allLoaded = true
                    } else {
                        this.getLandAbstract_data()
                    }
                    // this.allLoaded = true
                    this.$refs.loadmore.onBottomLoaded()
                }
            }, 1500)
        },
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
        // 打开支付msgBox
        openPayMsgBox(item) {
            this.payMsgBox = true
            this.payToWatchItem = item
        },
        // 支付查看内容
        confirmWatch() {
            // if (this.$store.state.mine.money > this.payToWatchItem.price) {.
            // this.$store.dispatch('post_reduceUserMoney', this.payToWatchItem.price)
            // this.$toast(`-${this.payToWatchItem.price}大师币`)
            this.$router.push({ path: '/momentDetail', query: { 'cid': this.payToWatchItem.cid } })
            // }
            this.payMsgBox = false
        },
        // 获取动态列表
        getMomentList_data() {
            let params = {
                page: this.p,
                uid: this.$store.state.mine.user_id
            }
            // console.log(params)
            getMomentList(params).then(res => {
                if (res && res.Data && res.Data !== 'null' && this.p > 0) {
                    this.momentList.push.apply(this.momentList, res.Data)
                    this.p++
                } else {
                    this.allLoaded = true
                }
            })
        },
        // 获取评论列表
        getLandAbstract_data() {
            let params = {
                pid: this.$route.query.pid,
                uid: this.$store.state.mine.user_id,
                page: this.p
            }
            getLandAbstract(params).then(res => {
                if (res && res.Data && res.Data !== 'null' && res.Data.comment !== null) {
                    if (res.Data.comment.length > 0 && this.p > 0) {
                        // console.log(res.Data.comment.length)
                        if (res.Data.comment.length >= 10) {
                            // 返回的评论数 为 后台页数每页评论数 视为还有下一页
                            this.pageCount++
                        }
                        this.momentList.push.apply(this.momentList, res.Data.comment)
                    } else {
                        this.allLoaded = true
                    }
                    this.p++
                }
            })
        }
    }
}
</script>
<style lang='stylus'>
$mainText = #333;
$subText = #666;
.moment-list {
    margin: 0;
    .page-loadmore-wrapper {
        overflow-y: scroll;
    }
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
        }
        .item-title {
            color: $mainText;
            font-size: toRem(14);
            margin-bottom: toRem(10);
        }
        .item-content {
            margin-bottom: toRem(12);
            .content-cover {
                display: flex;
                align-items: center;
                justify-content: space-around;
                max-height: toRem(180);
                overflow: hidden;
                .cover-img {
                    display: inline-block;
                    width: 100%;
                    border-width: 0 toRem(5);
                    border-style: solid;
                    border-color: transparent;
                }
                &.item-content-1 {
                    border: none;
                }
                &.item-content-2 {
                    .cover-img {
                        width: 50%;
                        &:nth-child(1) {
                            border-width: 0 toRem(5) 0 0;
                        }
                        &:nth-child(2) {
                            border-width: 0 0 0 toRem(5);
                        }
                    }
                }
                &.item-content-3 {
                    .cover-img {
                        width: 33.33%;
                        &:nth-child(1) {
                            border-width: 0 toRem(6.6) 0 0;
                        }
                        &:nth-child(2) {
                            border-width: 0 toRem(3.3);
                        }
                        &:nth-child(3) {
                            border-width: 0 0 0 toRem(6.6);
                        }
                    }
                }
            }
            .content-pay {
                color: $subText;
                font-size: toRem(12);
                margin-bottom: toRem(10);
            }
            .content-overview {
                padding: toRem(14) toRem(12);
                background: #f5f5f5;
                .overview-title {
                    color: $mainText;
                    font-size: toRem(13);
                    text-align: justify;
                    margin-bottom: toRem(10);
                }
                .overview-adress {
                    display: flex;
                    align-items: center;
                    color: $subText;
                    font-size: toRem(13);
                    margin-bottom: toRem(10);
                    i {
                        color: $appColor;
                        margin-right: toRem(5);
                    }
                }
                .overview-label {
                    font-size: 0;
                    > .label {
                        margin: 0 toRem(5) toRem(4) 0;
                    }
                }
            }
        }
        .item-info {
            display: flex;
            justify-content: space-between;
            padding-top: toRem(12);
            border-1px-top(#eee);
            .my-icon-zan {
                color: #ccc;
                font-size: toRem(12);
                transform: scale(0.9);
                &.active {
                    color: $appColor;
                }
            }
            .info-time {
                color: #ccc;
                font-size: toRem(12);
                transform: scale(0.9);
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
            transition: .2s linear;
            vertical-align: middle;
            color: #999;
            font-size: toRem(14);
            &.is-rotate {
                transform: rotate(180deg);
            }
        }
    }
    .pay-msgbox-wrapper {
        position: absolute;
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
}
</style>
