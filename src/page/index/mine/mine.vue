<template>
    <div id="mine">
        <router-link class="mine-info" :to="{name: 'myInfo'}">
            <div class="avatar">
                <img class="avatar-img" v-if="user.avatar" :src="user.avatar">
            </div>
            <div class="info">
                <p class="name">{{user.nick_name}}</p>
                <mt-button class="info-label" plain type="primary">地产大亨</mt-button>
            </div>
            <div class="my-icon-more"></div>
        </router-link>
        <div class="mine-count">
            <ul class="count-list">
                <li class="count-item">
                    <router-link class="count-item-a" :to="{name: 'mineGold'}">
                        <span class="count-item-num">1500</span>
                        <span class="count-item-text">大师币</span>
                    </router-link>
                </li>
                <li class="count-item">
                    <router-link class="count-item-a" :to="{name: 'mineScore'}">
                        <span class="count-item-num">56543</span>
                        <span class="count-item-text">大师积分</span>
                    </router-link>
                </li>
                <li class="count-item">
                    <router-link class="count-item-a" :to="{name: 'partInRecord'}">
                        <span class="count-item-num">参与记录</span>
                        <span class="count-item-text">参看全部记录</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="mine-cash">
            <ul class="cash-list">
                <li class="cash-item">
                    <router-link class="cash-item-a" :to="{name: 'recharge'}">
                        <div class="cash-item-icon my-icon-recharge"></div>
                        <span class="cash-item-text">充值</span>
                    </router-link>
                </li>
                <li class="cash-item">
                    <router-link class="cash-item-a" :to="{name: 'withdrawCash'}">
                        <div class="cash-item-icon my-icon-enchashment"></div>
                        <span class="cash-item-text">提现</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="mine-sets">
            <ul class="sets-list">
                <li class="sets-item">
                    <router-link class="sets-item-a" :to="{name: 'idAuth'}">
                        <div class="sets-item-icon my-icon-idAuth"></div>
                        <span class="sets-item-text">身份验证</span>
                        <div class="my-icon-more"></div>
                    </router-link>
                </li>
                <li class="sets-item">
                    <div class="sets-item-a" @click="clickInvitation">
                        <div class="sets-item-icon my-icon-invitation"></div>
                        <span class="sets-item-text">邀请好友</span>
                        <div class="my-icon-more"></div>
                    </div>
                </li>
                <li class="sets-item">
                    <router-link class="sets-item-a" :to="{name: 'feedback'}">
                        <div class="sets-item-icon my-icon-feedback"></div>
                        <span class="sets-item-text">用户反馈</span>
                        <div class="my-icon-more"></div>
                    </router-link>
                </li>
            </ul>
        </div>
        <mt-popup v-model="popupVisible" position="bottom">
            <div class="mine-invitation">
                <p class="mi-titile">分享</p>
                <div class="mi-share">
                    <div class="mi-icon my-icon-weixin"></div>
                    <div class="mi-icon my-icon-pengyouquan"></div>
                </div>
                <mt-button @click="clickInvitation">取消</mt-button>
            </div>
        </mt-popup>
        <!-- 子页面 -->
        <router-view/>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'mine',
    data() {
        return {
            popupVisible: false
        }
    },
    computed: {
        ...mapState([
            'user'
        ])
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
#mine {
    .mine-info {
        display: flex;
        padding: toRem(20) toRem(18);
        align-items: center;
        border-1px-bottom(#e6e6e6);
        background: $panelBg;
        .avatar {
            width: toRem(64);
            height: toRem(64);
            border-radius: 100%;
            overflow: hidden;
            background: #eee;
            .avatar-img {
                width: 100%;
                height: 100%;
            }
        }
        .info {
            flex: 1;
            padding-left: toRem(18.5);
            .name {
                margin: toRem(8.5) 0 toRem(12);
                font-size: toRem(18);
                line-height: 1;
            }
            .info-label {
                position: relative;
                top: toRem(-10);
                font-size: toRem(9);
                height: inherit;
                padding: toRem(3.5) toRem(6.5);
            }
        }
        .my-icon-more {
            font-size: toRem(14);
            font-weight: bold;
            color: #999;
        }
    }
    .mine-count {
        padding: toRem(10) 0;
        background: $panelBg;
        .count-list {
            display: flex;
            align-items: center;
            .count-item {
                flex: 1;
                .count-item-a {
                    display: flex;
                    position: relative;
                    height: toRem(50);
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    font-size: toRem(13);
                    line-height: 1.38;
                }
                .count-item-num {
                    color: $appColor;
                }
                & + .count-item {
                    border-1px-left(#e6e6e6);
                }
            }
        }
    }
    .mine-cash {
        padding: toRem(10) 0;
        margin-top: toRem(10);
        background: $panelBg;
        .cash-list {
            display: flex;
            align-items: center;
            .cash-item {
                display: flex;
                position: relative;
                flex: 1;
                height: toRem(50);
                align-items: center;
                justify-content: center;
                flex-direction: column;
                font-size: toRem(13);
                line-height: 1.38;
                .cash-item-icon {
                    display: block;
                    margin-bottom: toRem(6.5);
                    width: toRem(23);
                    height: toRem(23);
                    font-size: toRem(22);
                    text-align: center;
                    color: $appColor;
                }
                & + .cash-item {
                    border-1px-left(#e6e6e6);
                }
            }
        }
    }
    .mine-sets {
        padding: 0 toRem(18);
        margin-top: toRem(10);
        background: $panelBg;
        .sets-item {
            .sets-item-a {
                display: flex;
                position: relative;
                height: toRem(48);
                align-items: center;
                justify-content: center;
                font-size: toRem(14);
            }
            & + .sets-item {
                border-1px-top(#e6e6e6);
            }
            .sets-item-icon {
                width: toRem(15);
                height: toRem(14);
                font-size: toRem(15);
            }
            .sets-item-text {
                flex: 1;
                padding-left: toRem(12);
            }
            .sets-item-to {
                width: toRem(5);
                height: toRem(9);
            }
        }
    }
    .mint-popup {
        width: 100%;
        .mine-invitation {
            position: relative;
            height: toRem(194);
            background: $panelBg;
            .mi-titile {
                margin-top: toRem(18);
                font-size: toRem(15);
                color: #666;
                text-align: center;
            }
            .mi-share {
                display: flex;
                justify-content: space-between;
                margin: toRem(35) toRem(74) 0;
                .mi-icon {
                    font-size: toRem(40);
                    color: #64cf1f;
                }
            }
            button {
                position: absolute;
                width: 100%;
                height: toRem(49);
                bottom: -1px;
                left: 0;
                border-radius: 0;
                font-size: toRem(15);
                color: #333;
                background: $panelBg;
            }
        }
    }
}
</style>
