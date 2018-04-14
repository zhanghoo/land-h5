<template>
    <ul class="moment-list">
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
                    <router-link class="content-cover" :to="{path: '/momentDetail', query: { 'cid': item.cid}}" tag="div">
                        <img :src="item.image">
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
    </ul>
</template>
<script>
import { postZan } from '@/api/moment'
export default {
    name: 'momentList',
    props: {
        json: {
            type: Array || Object
        }
    },
    computed: {

    },
    data() {
        return {
            payMsgBox: false,
            payToWatchItem: ''
        }
    },
    methods: {
        addZan(item) {
            if (item.is_like === '0') {
                item.lnum++
                item.is_like = true
                let params = {
                    cid: item.cid,
                    uid: this.$store.state.mine.user_id
                }
                postZan(params).then(res => {
                    console.log(res)
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
        }
        .item-title {
            color: $mainText;
            font-size: toRem(14);
            margin-bottom: toRem(10);
        }
        .item-content {
            margin-bottom: toRem(12);
            .content-cover {
                height: toRem(180);
                overflow: hidden;
                img {
                    display: block;
                    width: 100%;
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
