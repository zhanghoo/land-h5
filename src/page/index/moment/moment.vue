<template>
    <div id="moment">
        <header class="moment-header"><i class="my-icon-add"></i>发布新动态</header>
        <!-- 列表 -->
        <momentList :json="moments"></momentList>
    </div>
</template>
<script>
import momentList from '@/components/momentList'
import { getMomentList } from '@/api'
export default {
    name: 'moment',
    components: { momentList },
    data() {
        return {
            moments: []
        }
    },
    methods: {
        getMomentList_data() {
            getMomentList().then(res => {
                console.log(res)
                this.moments = res.data
            })
        }
    },
    mounted() {
        this.getMomentList_data()
    }
}
</script>
<style lang='stylus'>
$headerHeight = 42px
#moment {
    padding-top: toRem($headerHeight)
    .moment-header{
        position fixed !important
        top 0
        left 0
        right 0
        height toRem($headerHeight)
        font-size toRem(12)
        color $appColor
        display flex
        align-items center
        justify-content flex-end
        padding 0 toRem(15)
        background #fff
        z-index 222;
        border-1px-bottom(#eee)
        i{
            margin-right toRem(4)
        }
    }
}
</style>
