<template>
    <div id="withdrawCash">
        <!-- 子页面 -->
        <ul class="w-card-list">
            <li class="w-card-item selected">
                <div class="card-t">
                    <div class="card-t-l">
                        <span class="card-icon-bank my-icon-nonghang"></span>
                    </div>
                    <div class="card-t-c">
                        <p class="card-name">农业银行</p>
                        <p class="card-type">储蓄卡</p>
                    </div>
                    <div class="card-t-r">
                        <span class="card-icon-select my-icon-chenggong1"></span>
                    </div>
                </div>
                <div class="card-b">
                    <div class="card-t-l"></div>
                    <div class="card-t-c">＊＊＊＊  ＊＊＊＊  ＊＊＊＊  1121</div>
                    <div class="card-t-r"></div>
                </div>
            </li>
            <li class="w-card-item">
                <div class="card-t">
                    <div class="card-t-l">
                        <span class="card-icon-bank my-icon-jianhang"></span>
                    </div>
                    <div class="card-t-c">
                        <p class="card-name">建设银行</p>
                        <p class="card-type">储蓄卡</p>
                    </div>
                    <div class="card-t-r">
                        <span class="card-icon-select my-icon-chenggong1"></span>
                    </div>
                </div>
                <div class="card-b">
                    <div class="card-t-l"></div>
                    <div class="card-t-c">＊＊＊＊  ＊＊＊＊  ＊＊＊＊  1121</div>
                    <div class="card-t-r"></div>
                </div>
            </li>
        </ul>
        <router-link class="w-btn-add" :to="{name: 'add'}">
            <span class="icon-add my-icon-add1"></span>
            <span class="wba-text">添加银行卡</span>
            <span class="my-icon-more"></span>
        </router-link>
        <p class="w-btn-next">
            <router-link :to="{name: 'next'}">
                <mt-button class="wbn-btn" type="primary">下一步</mt-button>
            </router-link>
        </p>
        <router-view/>
    </div>
</template>
<script>
export default {
    name: 'withdrawCash',
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
#withdrawCash {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 200;
    background: $appBg;
    .w-card-list {
        padding: toRem(15) toRem(18);
        .w-card-item {
            padding: toRem(23) toRem(18);
            border-radius: toRem(5);
            background: #e6e6e6;
            .card-t {
                display: flex;
                align-item: center;
                .card-t-l {
                    width: toRem(37);
                    height: toRem(37);
                    .card-icon-bank {
                        position: relative;
                        top: toRem(-2);
                        font-size: toRem(36);
                    }
                }
                .card-t-c {
                    display: flex;
                    padding: 0 toRem(8);
                    justify-content: space-between;
                    flex-direction: column;
                    flex: 1;
                    height: toRem(37);
                    .card-name {
                        font-size: toRem(17);
                        line-height: 1;
                        color: #333;
                    }
                    .card-type {
                        font-size: toRem(12);
                        line-height: 1;
                        color: #808080;
                    }
                }
                .card-t-r {
                    width: toRem(15);
                    height: toRem(37);
                    .card-icon-select {
                        font-size: toRem(15);
                        color: #ccc;
                    }
                }
            }
            .card-b {
                display: flex;
                margin-top: toRem(18);
                align-item: center;
                .card-t-l {
                    width: toRem(37);
                }
                .card-t-c {
                    padding: 0 toRem(8);
                    flex: 1;
                    font-size: toRem(17);
                    color: #000;
                    white-space: pre;
                    letter-spacing: toRem(-2);
                }
                .card-t-r {
                    width: toRem(15);
                }
            }
            &.selected {
                background: #fff;
                .card-t-r {
                    .card-icon-select {
                        color: $appColor;
                    }
                }
            }
            & + .w-card-item {
                margin-top: toRem(10);
            }
        }
    }
    .w-btn-add {
        display: flex;
        padding: 0 toRem(18);
        height: toRem(49);
        line-height: toRem(49);
        background: $panelBg;
        font-size: toRem(18);
        color: #999;
        .wba-text {
            flex: 1;
            padding-left: toRem(15);
            font-size: toRem(14);
        }
        &:active {
            background: #e6e6e6;
        }
    }
    .w-btn-next {
        margin-top: toRem(99);
        padding: 0 toRem(18);
        .wbn-btn {
            width: 100%;
            height: toRem(49);
            font-size: toRem(18);
        }
    }
}
</style>
