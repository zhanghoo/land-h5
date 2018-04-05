<template>
    <div id="partInRecord">
        <mt-navbar class="page-part" v-model="selected">
            <mt-tab-item id="1">全部</mt-tab-item>
            <mt-tab-item id="2">待公布</mt-tab-item>
            <mt-tab-item id="3">估价成功</mt-tab-item>
        </mt-navbar>
    </div>
</template>
<script>
export default {
    name: 'partInRecord',
    data() {
        return {
            selected: '1'
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
}
</style>
