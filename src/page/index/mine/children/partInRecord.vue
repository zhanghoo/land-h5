<template>
    <div id="partInRecord">
        <mt-navbar class="page-part" v-model="selected">
            <mt-tab-item id="1">全部</mt-tab-item>
            <mt-tab-item id="2">待公布</mt-tab-item>
            <mt-tab-item id="3">估价成功</mt-tab-item>
        </mt-navbar>
        <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <ul class="record-list">
                <li class="record-item" v-show="selected == '1' || selected == '2'">
                    <div class="record-item-panel">
                        <div class="record-head">
                            <span class="rh-address">江干区（丁桥单元JG040513335364513523992）</span>
                            <span class="rh-status">待公布</span>
                        </div>
                        <div class="record-content">
                            <p>投注大师币：200</p>
                            <p>预估成交楼面价: 4000元/m²</p>
                            <p>估计时间：2018-3-6 09:03:28</p>
                        </div>
                    </div>
                </li>
                <li class="record-item" v-show="selected == '1'">
                    <div class="record-item-panel">
                        <div class="record-head">
                            <span class="rh-address">江干区（丁桥单元JG040513335364513523992）</span>
                            <span class="rh-status">已关闭</span>
                        </div>
                        <div class="record-content">
                            <p>投注大师币：200</p>
                            <p>预估成交楼面价: 4000元/m²</p>
                            <p>估计时间：2018-3-6 09:03:28</p>
                        </div>
                    </div>
                </li>
                <li class="record-item" v-show="selected == '1'">
                    <div class="record-item-panel">
                        <div class="record-head">
                            <span class="rh-address">江干区（丁桥单元JG040513335364513523992）</span>
                            <span class="rh-status">估价失败</span>
                        </div>
                        <div class="record-content">
                            <p>投注大师币：200</p>
                            <p>预估成交楼面价: 4000元/m²</p>
                            <p>估计时间：2018-3-6 09:03:28</p>
                        </div>
                    </div>
                </li>
                <li class="record-item" v-show="selected == '1' || selected == '3'">
                    <div class="record-item-panel">
                        <div class="record-head">
                            <span class="rh-address">江干区（丁桥单元JG040513335364513523992）</span>
                            <span class="rh-status">估价成功</span>
                        </div>
                        <div class="record-content">
                            <p>投注大师币：200</p>
                            <p>预估成交楼面价: 4000元/m²</p>
                            <p>估计时间：2018-3-6 09:03:28</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'partInRecord',
    data() {
        return {
            selected: '1',
            wrapperHeight: 0
        }
    },
    created() {

    },
    computed: {

    },
    methods: {

    },
    mounted() {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    }
}
</script>
<style lang='stylus'>
#partInRecord {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 200;
    background: $appBg;
    .mint-navbar {
        border-1px-bottom($borderColor);
        .mint-tab-item {
            padding: toRem(6) 0;
            font-size: toRem(14);
            color: #333;
            .mint-tab-item-label {
                height: toRem(30);
                line-height: toRem(30);
            }
            &.is-selected {
                margin-bottom: 0;
                color: $appColor;
                border-bottom: toRem(1.5) solid $appColor;
            }
            & + .mint-tab-item {
                .mint-tab-item-label {
                    border-1px-left($borderColor);
                }
            }
        }
    }
    .page-infinite-wrapper {
        overflow: scroll;
    }
    .record-list {
       .record-item {
            margin-bottom: toRem(5);
            .record-item-panel {
                padding: 0 toRem(18);
                background: $panelBg;
                .record-head {
                    display: flex;
                    padding: toRem(15) 0;
                    justify-content: space-between;
                    font-size: toRem(14);
                    line-height: toRem(22);
                    border-1px-bottom($borderColor);
                    color: #333;
                    .rh-address {
                        width: 65%;
                        white-space: pre;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .rh-status {
                        color: $appColor;
                    }
                }
                .record-content {
                    padding: toRem(8) 0;
                    line-height: toRem(28);
                    font-size: toRem(13);
                    color: #666;
                }
            }
        }
    }
}
</style>
