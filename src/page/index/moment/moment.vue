<template>
    <div id="moment">
        <header class="moment-header">
            <router-link :to="{name: 'publish'}"><i class="my-icon-add"></i>发布新动态</router-link>
        </header>
        <!-- 列表 -->
        <momentList :page="'moment'"></momentList>
        <!-- 支付弹框 -->
        <!-- <div class="pay-msgbox-wrapper">
            <transition name="bounce">
                <div class="pay-msgbox" v-if="payMsgBox">
                    <div class="pay-msgbox-header">确认支付</div>
                    <div class="pay-msgbox-content">
                        <div class="content-message">查看需支付{{payToWatchItem.price}}大师币,是否确认查看?</div>
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
        </div> -->
    </div>
</template>
<script>
import momentList from '@/components/momentList'
// import { getMomentList } from '@/api'
import { getMomentList } from '@/api/moment'
export default {
    name: 'moment',
    components: { momentList },
    data() {
        return {
            moments: [],
            payMsgBox: false,
            payToWatchItem: ''
        }
    },
    methods: {
        // 获取动态列表
        getMomentList_data() {
            let params = {
                page: 1,
                uid: this.$store.state.mine.user_id
            }
            getMomentList(params).then(res => {
                if (res && res.Data && res.Data !== 'null') {
                    this.moments = res.Data
                } else {
                    this.moments = []
                }
            })
        }
    },
    mounted() {
        this.getMomentList_data()
    }
}
</script>
<style lang='stylus'>
$headerHeight = 42px;
#moment {
    padding-top: toRem($headerHeight);
    .moment-header {
        position: fixed !important;
        top: 0;
        left: 0;
        right: 0;
        height: toRem($headerHeight);
        font-size: toRem(12);
        color: $appColor;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 toRem(15);
        background: #fff;
        z-index: 222;
        border-1px-bottom(#eee);
        i {
            margin-right: toRem(4);
        }
    }
    .pay-msgbox-wrapper {
        position absolute
        z-index 3000
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
