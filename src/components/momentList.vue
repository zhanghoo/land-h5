<template>
    <ul class="moment-list">
        <li class="list-item" v-for="(item,index) in json" :key="index">
            <div class="item-user">
                <img class="user-avatar" v-if="item.avatar" :src="item.avatar">
                <span class="user-name" v-if="item.name">{{item.name}}</span>
                <mt-button class="label" plain type="primary" v-if="item.label">{{item.label}}</mt-button>
            </div>
            <div class="item-title">{{item.title}}</div>
            <div class="item-content">
                <!-- 封面 -->
                <template v-if="item.mode === 'cover'">
                    <router-link class="content-cover" :to="{path: '/momentDetail', query: { 'id': item.id}}" tag="div">
                        <img :src="item.coveImg">
                    </router-link>
                </template>
                <!-- 需支付 -->
                <template v-if="item.is_pay === '1'">
                    <div class="content-pay" @click="$emit('watch', item)">查看需支付{{item.money}}大师币</div>
                </template>
                <!-- 概览 -->
                <template v-if="item.mode === 'overview'">
                    <router-link class="content-overview" :to="{path: '/momentDetail', query: { 'id': item.id}}" tag="div">
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
                <i class="my-icon-zan" :class="{'active': item.activeZan}" @click="addZan(item)"> {{item.lnum || 0}}</i>
                <span class="info-time">{{item.pub_time}}</span>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'momentList',
    props: {
        json: {
            type: Array
        }
    },
    methods: {
        addZan(item) {
            item.activeZan = !item.activeZan
            if (item.activeZan) {
                item.lnum++
            } else {
                item.lnum--
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
        margin-bottom toRem(10)
        background: #fff;
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
                        margin 0 toRem(5) toRem(4) 0
                    }
                }
            }
        }
        .item-info {
            display: flex;
            justify-content: space-between;
            padding-top: toRem(12);
            border-1px-top(#eee)
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
}
</style>
