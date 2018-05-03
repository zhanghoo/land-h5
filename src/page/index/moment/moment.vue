<template>
    <div id="moment">
        <header class="moment-header">
            <router-link :to="{name: 'publish'}">
                <i class="my-icon-add"></i>发布新动态</router-link>
        </header>
        <!-- 列表 -->
        <div class="loadMore" v-infinite-scroll="getMomentList_data" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
            <momentList :json="moments"></momentList>
            <!-- 底部提示 -->
            <div class="bottomLoad" v-if="moments.length > 0">
                <div class="loading" v-show="loading === true">加载中...</div>
                <div class="noData" v-if="loading === 'nothing'">没有更多了</div>
            </div>
        </div>
    </div>
</template>
<script>
import momentList from '@/components/momentList'
import { getMomentList } from '@/api/moment'
export default {
    name: 'moment',
    components: { momentList },
    data() {
        return {
            moments: [],
            page: 1,
            bottomLock: false,
            loading: false
        }
    },
    methods: {
        // 获取动态列表
        getMomentList_data() {
            this.loading = true
            this.bottomLock = true
            let params = {
                page: this.page,
                uid: this.$store.state.mine.user_id
            }
            getMomentList(params).then(res => {
                if (res && res.Data) {
                    this.moments.push(...res.Data)
                    this.page++
                    this.loading = false
                    this.bottomLock = false
                } else {
                    this.loading = 'nothing'
                }
            })
            .catch(err => {
                console.log(err)
                this.loading = false
            })
        }
    },
    activated() {
        this.getMomentList_data()
    }
}
</script>
<style lang='stylus'>
$headerHeight = 42;
#moment {
    padding-top: toRem($headerHeight);
    height: 100%;
    .moment-header {
        position: fixed !important;
        top: 0;
        left: 0;
        right: 0;
        height: toRem($headerHeight);
        font-size: toRem(14);
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
    .loadMore {
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
}
</style>
