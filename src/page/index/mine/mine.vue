<template>
    <div id="mine">
        <div class="mine-info">
            <div class="avatar"></div>
            <div class="info">
                <p class="name">曹万贯</p>
                <label-tag :label-text="'地产大亨'"></label-tag>
            </div>
            <div class="to"></div>
        </div>
        <div class="mine-count">
            <ul class="count-list">
                <li class="count-item">
                    <span class="count-item-num">1500</span>
                    <span class="count-item-text">大师币</span>
                </li>
                <li class="count-item">
                    <span class="count-item-num">56543</span>
                    <span class="count-item-text">大师积分</span>
                </li>
                <li class="count-item">
                    <span class="count-item-num">参与记录</span>
                    <span class="count-item-text">参看全部记录</span>
                </li>
            </ul>
        </div>
        <div class="mine-cash">
            <ul class="cash-list">
                <li class="cash-item">
                    <span class="cash-item-icon icon-cash-recharge"></span>
                    <span class="cash-item-text">充值</span>
                </li>
                <li class="cash-item">
                    <span class="cash-item-icon icon-cash-show"></span>
                    <span class="cash-item-text">提现</span>
                </li>
            </ul>
        </div>
        <div class="mine-sets">
            <ul class="sets-list">
                <li class="sets-item">
                    <span class="sets-item-icon icon-authentication"></span>
                    <span class="sets-item-text">身份验证</span>
                    <span class="sets-item-to icon-right"></span>
                </li>
                <li class="sets-item">
                    <span class="sets-item-icon icon-invitation"></span>
                    <span class="sets-item-text">邀请好友</span>
                    <span class="sets-item-to icon-right"></span>
                </li>
                <li class="sets-item">
                    <span class="sets-item-icon icon-feedback"></span>
                    <span class="sets-item-text">用户反馈</span>
                    <span class="sets-item-to icon-right"></span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import labelTag from '@/layout/labelTag'
export default {
    name: 'mine',
    components: { labelTag },
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {

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
        }
        .info {
            flex: 1;
            padding-left: toRem(18.5);
            .name {
                margin: toRem(8.5) 0 toRem(12);
                font-size: toRem(18);
                line-height: 1;
            }
        }
        .to {
            width: toRem(5);
            height: toRem(9);
        }
    }
    .mine-count {
        padding: toRem(10) 0;
        background: $panelBg;
        .count-list {
            display: flex;
            align-items: center;
            .count-item {
                display: flex;
                position: relative;
                flex: 1;
                height: toRem(50);
                align-items: center;
                justify-content: center;
                flex-direction: column;
                font-size: toRem(13);
                line-height: 1.38;
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
            display: flex;
            position: relative;
            height: toRem(48);
            align-items: center;
            justify-content: center;
            font-size: toRem(14);
            & + .sets-item {
                border-1px-top(#e6e6e6);
            }
            .sets-item-icon {
                width: toRem(15);
                height: toRem(14);
            }
            .sets-item-text {
                flex: 1;
            }
            .sets-item-to {
                width: toRem(5);
                height: toRem(9);
            }
        }
    }
}
</style>
