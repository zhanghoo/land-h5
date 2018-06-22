<template>
    <div id="rankList">
        <mt-loadmore :top-method="getRankList_data" @top-status-change="handleTopChange" ref="loadmore" :auto-fill='false'>
            <div slot="top" class="mint-loadmore-top">
                <span v-show="topStatus == 'pull'">下拉刷新↓</span>
                <span v-show="topStatus == 'drop'">释放更新↑</span>
                <span v-show="topStatus == 'loading'">加载中...</span>
            </div>
            <div class="title">
                <p class="line"></p>
                <p>
                    <span>排行榜</span>
                    <span class="en">HOT</span>
                </p>
                <p class="line"></p>
            </div>
            <div class="rankList-content">
                <div class="content-header">
                    <div class="header-item">排名</div>
                    <div class="header-item">昵称</div>
                    <div class="header-item">等级名称</div>
                    <div class="header-item">大师积分</div>
                </div>
                <div class="content-body" v-infinite-scroll="getRankList_more" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
                    <div class="body-item" v-for="(item, index) in rankList" :key="index" @click="$router.push({path: '/userDetail', query: { userId: item.user_id }})">
                        <div class="item item-index">
                            <i :class="{'my-icon-huangguan': index < 3}">
                                <span :style="{'absolute': index < 3}">{{item.rank}}</span>
                            </i>
                        </div>
                        <div class="item item-name">
                            <img class="name-avatar" v-if="item.avatar" :src="item.avatar">
                            <span class="name-text">{{item.nick_name}}</span>
                        </div>
                        <div class="item item-level">{{item.level_name}}</div>
                        <div class="item item-score">{{item.master_score}}</div>
                    </div>
                    <!-- 底部提示 -->
                    <div class="bottomLoad" v-if="rankList.length > 0">
                        <div class="loading" v-show="loading === true">加载中...</div>
                        <div class="noData" v-if="loading === 'nothing'">没有更多了</div>
                    </div>
                </div>
            </div>
        </mt-loadmore>
        <div class="mine-rank-wrap">
            <div class="mine-rank">
                <div class="item item-index" :class="`item-index-${mineRank.rank > 3 ? 4 : mineRank.rank}`">
                    <i :class="{'my-icon-huangguan': mineRank.rank <= 3 && mineRank.rank !== 0}">
                        <span :style="{'absolute':mineRank.rank <= 3}">{{mineRank.rank === 0 ? '未进入排名' : mineRank.rank}}</span>
                    </i>
                </div>
                <div class="item item-name">
                    <img class="name-avatar" v-if="mineRank.avatar" :src="mineRank.avatar">
                    <span class="name-text">{{mineRank.nick_name}}</span>
                </div>
                <div class="item item-level">{{mineRank.level_name}}</div>
                <div class="item item-score">{{mineRank.master_score}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { getRankList } from '@/api/home'

export default {
    name: 'rankList',
    data() {
        return {
            rankList: [],
            mineRank: {},
            page: 1,
            bottomLock: false,
            loading: false,
            topStatus: '',
            dragRefresh: false
        }
    },
    methods: {
        getRankList_data() {
            // 上拉刷新
            this.dragRefresh = true
            this.page = 1
            getRankList(this.page).then(res => {
                if (res && res.Data && res.Data !== 'null') {
                    if (!this.mineRank.nick_name) {
                        // 只赋值一次
                        this.mineRank = res.Data.self
                    }

                    if (res.Data.all.length > 0) {
                        this.rankList = res.Data.all
                    }
                }
                this.loading = false
                if (res.Data.length < 10) {
                    // 小于10条的情况
                    this.loading = 'nothing'
                }
                this.bottomLock = false
                this.$refs.loadmore.onTopLoaded()
            })
        },
        getRankList_more() {
            if (this.dragRefresh) {
                // 如果是下拉刷新, 加载第二页的即可, 因为用的是push
                this.page = 2
                this.dragRefresh = false
            }
            // console.log(this.page)
            this.loading = true
            this.bottomLock = true
            // console.log(this.page)
            getRankList(this.page).then(res => {
                if (res && res.Data) {
                    if (!this.mineRank.nick_name) {
                        // 只赋值一次
                        this.mineRank = res.Data.self
                    }
                    if (res.Data.all.length > 0) {
                        this.rankList.push(...res.Data.all)
                        this.loading = false
                        this.bottomLock = false
                        if (res.Data.length < 10) {
                            // 小于10条的情况
                            this.loading = 'nothing'
                        }
                    } else {
                        this.loading = 'nothing'
                    }
                } else {
                    this.loading = 'nothing'
                }
            })
            .catch(err => {
                console.log(err)
                this.loading = false
            })
            this.page++
        },
        handleTopChange(status) {
            this.topStatus = status
        }
    },
    mounted() {
        this.getRankList_more()
    }
}
</script>
<style lang='stylus'>
#rankList {
    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: toRem(18) toRem(92);
        color: #666;
        font-size: toRem(17);
        line-height: 1;
        font-weight: 700;
        .line {
            height: toRem(1);
            width: toRem(37);
            background: #666666;
        }
        .en {
            color: #ff6666;
            margin-left: toRem(4);
        }
    }
    .rankList-content {
        width: 100%;
        background: #fff;
        .content-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #333;
            font-size: toRem(16);
            padding: toRem(15) 0;
            border-1px-bottom(#e6e6e6);
            .header-item {
                width: 25%;
                text-align: center;
            }
        }
        .content-body {
            color: #666;
            font-size: toRem(14);
            padding-bottom: toRem(60);
            .body-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: toRem(18) 0;
                border-1px-bottom(#e6e6e6);
                .item {
                    width: 25%;
                    text-align: center;
                }
                .item-name {
                    display: flex;
                    align-items: center;
                    .name-avatar {
                        flex-shrink: 0;
                        width: toRem(25);
                        height: toRem(25);
                        border-radius: 100%;
                        overflow: hidden;
                        margin-right: toRem(5);
                    }
                    .name-text {
                        text-ellipsis();
                    }
                }
                .item-index {
                    font-style: normal;
                    i {
                        position: relative;
                        font-size: toRem(22);
                    }
                    span {
                        position: absolute;
                        left: 50%;
                        top: 58%;
                        color: #333;
                        font-size: toRem(14);
                        font-weight: bold;
                        transform: translate3d(-50%, -50%, 0) scale(0.84);
                    }
                }
                &:nth-child(1) .item-index i {
                    color: #FCD107;
                }
                &:nth-child(2) .item-index i {
                    color: #BDAFAE;
                }
                &:nth-child(3) .item-index i {
                    color: #D09168;
                }
                &:nth-child(n+4) .item-index span {
                    position: static;
                    font-weight: normal;
                }
            }
        }
    }
    .mine-rank-wrap {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #fff;
        color: #666;
        font-size: toRem(14);
        .mine-rank {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: toRem(18) 0;
            border-1px-top(#e6e6e6);
            .no-in {
                flex: 1;
                text-align: center;
            }
            .item {
                width: 25%;
                text-align: center;
            }
            .item-name {
                display: flex;
                align-items: center;
                .name-avatar {
                    flex-shrink: 0;
                    width: toRem(25);
                    height: toRem(25);
                    border-radius: 100%;
                    overflow: hidden;
                    margin-right: toRem(5);
                }
                .name-text {
                    text-ellipsis();
                }
            }
            .item-index {
                font-style: normal;
                i {
                    position: relative;
                    display: block;
                    font-size: toRem(22);
                }
                span {
                    position: absolute;
                    left: 50%;
                    top: 58%;
                    color: #333;
                    font-size: toRem(14);
                    font-weight: bold;
                    transform: translate3d(-50%, -50%, 0) scale(0.84);
                }
                &.item-index-1 i {
                    color: #FCD107;
                }
                &.item-index-2 i {
                    color: #BDAFAE;
                }
                &.item-index-3 i {
                    color: #D09168;
                }
                &.item-index-4 span {
                    position: static;
                    font-weight: normal;
                }
            }
        }
    }
}
</style>
