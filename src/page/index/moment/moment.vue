<template>
    <div id="moment">
        <header class="moment-header">
            <router-link :to="{name: 'publish'}">
                <i class="my-icon-add"></i>发布新动态</router-link>
        </header>
        <!-- 列表 -->
        <div class="loadMore" v-infinite-scroll="getMomentList_data" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
            <mt-loadmore :top-method="loadTopAjax" @top-status-change="handleTopChange" ref="loadmore" :auto-fill='false'>
                <div slot="top" class="mint-loadmore-top">
                    <span v-show="topStatus == 'pull'">下拉刷新↓</span>
                    <span v-show="topStatus == 'drop'">释放更新↑</span>
                    <span v-show="topStatus == 'loading'">加载中...</span>
                </div>
                <momentList :json="moments"></momentList>
                <!-- 底部提示 -->
                <div class="bottomLoad">
                    <div class="loading" v-if="loading === 'loading'">加载中...</div>
                    <div class="noData" v-else-if="loading === 'nothing'">没有更多了</div>
                </div>
            </mt-loadmore>
        </div>
    </div>
</template>
<script>
import momentList from '@/components/momentList'
import { getMomentList } from '@/api/moment'
import cache from '@/utils/cache'
import { mapState } from 'vuex'
export default {
    name: 'moment',
    components: { momentList },
    data() {
        return {
            moments: [],
            page: 1,
            bottomLock: false,
            loading: false,
            topStatus: ''
        }
    },
    watch: {
        paidItem(val) {
            console.log('paidItem', val)
            this.moments.forEach(item => {
                if (item.cid === val) {
                    item.is_pay = '0'
                }
            })
        }
    },
    computed: {
        ...mapState([
            'paidItem'
        ])
    },
    methods: {
        loadTopAjax() {
            this.page = 1
            let params = {
                page: this.page,
                uid: this.$store.state.mine.user_id
            }
            getMomentList(params).then(res => {
                if (res && res.Data && res.Data !== 'null') {
                    this.moments = res.Data
                }
                this.$refs.loadmore.onTopLoaded()
            })
                .catch(err => {
                    console.log(err)
                    this.loading = false
                    this.$refs.loadmore.onTopLoaded()
                })
        },
        // 获取动态列表
        getMomentList_data() {
            if (this.loading !== 'nothing') {
                this.loading = 'loading'
                this.bottomLock = true
                this.page++
                let params = {
                    page: this.page,
                    uid: this.$store.state.mine.user_id
                }
                getMomentList(params).then(res => {
                    if (res && res.Data && res.Data.length > 0 && res.Data !== 'null') {
                        this.moments.push(...res.Data)
                        this.loading = false
                    } else {
                        this.loading = 'nothing'
                    }
                    this.bottomLock = false
                }).catch(err => {
                    console.log(err)
                    this.loading = false
                    this.bottomLock = false
                })
            }
        },
        handleTopChange(status) {
            this.topStatus = status
        },
        // 处理滚动条位置的方法
        handleLocaltion(type) {
            if (type === 'get') {
                this.$nextTick(() => {
                    let location = cache.getSession('momentLocation')
                    $('.loadMore').scrollTop(location)
                })
            } else if (type === 'set') {
                let scrollTop = $('.loadMore').scrollTop()
                if (scrollTop >= 0) {
                    cache.setSession('momentLocation', scrollTop)
                }
            }
        }
    },
    mounted() {
        this.loadTopAjax()
    },
    activated() {
        if (this.$route.params.json) {
            this.moments.unshift(this.$route.params.json)
            this.$route.params.json = ''
        } else {
            this.handleLocaltion('get')
        }
        if (this.$store.state.momentLike && this.moments.length > 0) {
            this.moments.forEach(item => {
                if (item.cid === this.$store.state.momentLike) {
                    item.is_like = '1'
                    item.lnum++
                }
            })
        }
    },
    beforeRouteLeave(to, from, next) {
        this.handleLocaltion('set')
        next()
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
    .mint-loadmore-top {
        font-size: toRem(14);
        color: #999;
    }
    .loadMore {
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
}
</style>
