<template>
    <div id="mine">
        <!-- 0420反馈修改: 点击顶部整块区域跳转到用户信息页面 -->
        <div class="mine-info" @click="$router.push({name: 'myInfo'})">
            <div class="info-wrapper">
                <div class="avatar">
                    <img class="avatar-img" v-if="mine.avatar" :src="mine.avatar">
                </div>
                <div class="info">
                    <div class="name">
                        <span>{{mine.nick_name}}</span>
                        <!-- 0420反馈添加 -->
                        <span v-if="mine.is_charge === '1'" class="is-charge my-icon-huizhanghuiyuan"></span>
                        <span v-else class="isnt-charge">（首次充值即可成为会员）</span>
                    </div>
                    <p class="mine-id">ID：{{mine.user_id}}</p>
                    <mt-button class="info-label" plain type="primary">{{mine.is_charge === '1' ? mine.level : '地产小狗'}}</mt-button>
                </div>
            </div>
            <span class="my-icon-more"></span>
        </div>
        <div class="mine-count">
            <ul class="count-list">
                <li class="count-item">
                    <router-link class="count-item-a" :to="{name: 'mineGold'}">
                        <span class="count-item-num">{{mine.master_coin}}</span>
                        <span class="count-item-text">大师币</span>
                    </router-link>
                </li>
                <li class="count-item">
                    <router-link class="count-item-a" :to="{name: 'mineScore'}">
                        <span class="count-item-num">{{mine.master_score}}</span>
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
                    <router-link class="cash-item-a" :to="{name: 'mineWithdrawCash'}">
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
                <!-- 0420反馈添加: 增加用户动态和排行的跳转链接 -->
                <li class="sets-item">
                    <router-link class="sets-item-a" :to="{path: '/homePage', query: { userId: mine.user_id}}">
                        <div class="sets-item-icon my-icon-i18n"></div>
                        <span class="sets-item-text">用户动态</span>
                        <div class="my-icon-more"></div>
                    </router-link>
                </li>
                <li class="sets-item">
                    <router-link class="sets-item-a" :to="{name: 'rankList'}">
                        <div class="sets-item-icon my-icon-paixingbang"></div>
                        <span class="sets-item-text">排行榜</span>
                        <div class="my-icon-more"></div>
                    </router-link>
                </li>
                <li class="sets-item">
                    <div class="sets-item-a" @click="clickInvitation2">
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
            popupVisible: false,
            popupVisible2: false,
            shareInfo: '' // 返回的相关分享
        }
    },
    computed: {
        ...mapState([
            'mine'
        ])
    },
    methods: {
        clickInvitation() {
            this.popupVisible = !this.popupVisible
        },
        clickInvitation2() {
            this.popupVisible2 = !this.popupVisible2
        }
    },
    activated() {
        this.$store.dispatch('get_mineInfo', this.$store.state.mine.user_id)
    }
}
</script>
<style lang='stylus'>
#mine {
    min-height: 100%;
    padding-bottom: toRem(56);
    .mine-info {
        display: flex;
        padding: toRem(20) toRem(18);
        align-items: center;
        border-1px-bottom(#e6e6e6);
        background: $panelBg;
        .info-wrapper {
            display: flex;
            align-items: center;
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
                    display flex
                    align-items center
                    margin-bottom: toRem(4);
                    font-size: toRem(18);
                    .is-charge {
                        font-size: toRem(22);
                    }
                    .isnt-charge {
                        font-size: toRem(12);
                        color: $appColor;
                    }
                }
                .mine-id {
                    font-size: toRem(14);
                    color: #666;
                }
                .info-label {
                    position: relative;
                    top: toRem(-2);
                    font-size: toRem(9);
                    height: inherit;
                    padding: toRem(3.5) toRem(6.5);
                }
            }
        }
        .my-icon-more {
            font-size: toRem(14);
            font-weight: bold;
            color: #999;
            margin-left: auto;
            padding: toRem(20);
            padding-right: 0;
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
                    .count-item-text {
                        font-size: toRem(15);
                    }
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
                    font-size: toRem(22);
                    text-align: center;
                    color: $appColor;
                }
                .cash-item-text {
                    font-size: toRem(15);
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
                font-size: toRem(15);
            }
            & + .sets-item {
                border-1px-top(#e6e6e6);
            }
            .sets-item-icon {
                width: toRem(15);
                height: toRem(17);
                font-size: toRem(17);
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
