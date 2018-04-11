<template>
    <div class="block-slot">
        <div class="block-slot-head">
            <div class="block-slot-title">
                <div v-if="titleIcon" class="title-icon"></div>
                <slot name="title">标题</slot>
            </div>
            <div class="block-slot-more">
                <slot name="more"></slot>
            </div>
        </div>
        <div class="block-slot-body">
            <slot name="conent">
            </slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'block-slot',
    props: {
        titleIcon: {
            type: Boolean,
            default: false
        }
    },
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
.block-slot {
    margin-bottom: toRem(10);
    width: 100%;
    height: auto;
    background: $panelBg;
    .block-slot-head {
        display: flex;
        justify-content: space-between;
        padding: toRem(14) toRem(18);
        width: 100%;
        line-height: toRem(15);
        border-1px-bottom($borderColor);
        .block-slot-title {
            position: relative;
            font-size: toRem(15);
            line-height: 1;
            .title-icon {
                position: absolute;
                top: 0;
                left: toRem(-18);
                width: toRem(5);
                height: 100%;
                background: $appColor;
            }
        }
        .block-slot-more {
            font-size: toRem(12);
            color: #999;
        }
    }
    .block-slot-body {
        padding: 0 toRem(17);
        .block-slot-item {
            padding: toRem(14) 0;
            font-size: toRem(13);
            line-height: toRem(16);
            color: #666;
            &:not(:first-child) {
                border-1px-top($borderColor);
            }
        }
    }
}
</style>
