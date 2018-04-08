<template>
    <div id="systemNews">
        <div class="systemNews-title">
            <mt-button class="title-btn" type="primary" size="small">系统广播</mt-button>
            <div class="title-label" v-if="json.title">{{json.title}}</div>
        </div>
        <div class="systemNews-time" v-if="json.create_time">{{json.create_time}}</div>
        <div class="systemNews-content" v-if="json.content">{{json.content}}</div>
    </div>
</template>
<script>
export default {
    name: 'systemNews',
    data() {
        return {
            json: ''
        }
    },
    computed: {

    },
    methods: {

    },
    mounted() {
        this.json = this.$route.params.json
    }
}
</script>
<style lang='stylus'>
#systemNews {
    width 100%
    height 100vh
    background #fff;
    padding: 0 toRem(12);
    .systemNews-title {
        display: flex;
        align-items: center;
        padding: toRem(15) 0;
        .title-btn {
            padding: toRem(4) toRem(6);
            height: inherit;
            margin-right: toRem(12);
            .mint-button-text {
                font-size: toRem(12);
                transform: scale(0.75);
            }
        }
        .title-label {
            color: #333;
            font-size: toRem(14);
        }
    }
    .systemNews-time{
        color #ccc
        font-size toRem(14)
        margin-bottom toRem(20)
    }
    .systemNews-content{
        color #666
        font-size toRem(14)
        text-indent: 2em;
        line-height toRem(24)
    }
}
</style>
