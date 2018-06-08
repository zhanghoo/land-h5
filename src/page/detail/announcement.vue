<template>
    <div id="announcement">
        <div class="loadMore" v-infinite-scroll="getLandBusinessList_data" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
            <mt-loadmore :top-method="loadTopAjax" @top-status-change="handleTopChange" ref="loadmore" :auto-fill='false'>
                <div slot="top" class="mint-loadmore-top">
                    <span v-show="topStatus == 'pull'">下拉刷新↓</span>
                    <span v-show="topStatus == 'drop'">释放更新↑</span>
                    <span v-show="topStatus == 'loading'">加载中...</span>
                </div>
                <div class="announce-panel" v-for="(item, index) in json" :key="index">
                    <div class="announce-panel-user">
                        <div class="announce-panel-userinfo">
                            <div class="apu-avatar" @click.stop="$router.push({path: '/userDetail', query: { userId: item.user_id }})">
                                <img class="apu-avatar-img" :src="item.avatar">
                            </div>
                            <span class="apu-name">{{item.nick_name}}</span>
                            <mt-button class="apu-tag" plain type="primary">{{item.level}}</mt-button>
                        </div>
                        <img class="announce-panel-win" src="~@/assets/img/win@2x.png">
                    </div>
                    <div class="announce-panel-landinfo" @click="$router.push({path: '/transactionDetail', query: {'id': item.id}})">
                        <div class="apl-address">{{item.name}}</div>
                        <div class="apl-prices">
                            <div class="apl-prices-tags">
                                <span>成交楼面价</span>
                                <mt-button class="apl-tag" plain type="primary">{{item.closing_cost}}元/m²</mt-button>
                            </div>
                            <div class="apl-prices-tags">
                                <span>预估楼面价</span>
                                <mt-button class="apl-tag" plain type="primary">{{item.evaluate_num}}元/m²</mt-button>
                            </div>
                        </div>
                    </div>
                    <div class="announce-panel-date">{{item.evaluate_time}}</div>
                </div>
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
import { getLandBusinessList } from '@/api/home'
export default {
    name: 'announcement',
    data() {
        return {
            page: 1,
            json: [],
            bottomLock: false,
            loading: false,
            topStatus: ''
        }
    },
    methods: {
        loadTopAjax() {
            this.page = 1
            getLandBusinessList(this.page).then(res => {
                if (res && res.Data && res.Data !== 'null') {
                    this.json = res.Data
                }
                this.loading = false
                this.$refs.loadmore.onTopLoaded()
            })
                .catch(err => {
                    console.log(err)
                    this.loading = false
                    this.$refs.loadmore.onTopLoaded()
                })
        },
        getLandBusinessList_data() {
            if (this.loading !== 'nothing') {
                this.loading = 'loading'
                this.bottomLock = true
                getLandBusinessList(this.page).then(res => {
                    if (res && res.Data && res.Data.length > 0 && res.Data !== 'null') {
                        this.json.push(...res.Data)
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
                this.page++
            }
        },
        handleTopChange(status) {
            this.topStatus = status
        }
    },
    mounted() {
        this.getLandBusinessList_data()
    }
}
</script>
<style lang='stylus'>
#announcement {
    .announce-panel {
        padding: 0 toRem(14);
        margin-bottom: toRem(5);
        background: $panelBg;
        .announce-panel-user {
            display: flex;
            padding: toRem(15) 0;
            border-1px-bottom($borderColor);
            justify-content: space-between;
            align-items: center;
            .announce-panel-userinfo {
                .apu-avatar {
                    display: inline-block;
                    width: toRem(30);
                    height: toRem(30);
                    vertical-align: middle;
                    border-radius: 100%;
                    overflow: hidden;
                    .apu-avatar-img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .apu-name {
                    font-size: toRem(14);
                    font-weight: 700;
                    color: #333;
                    vertical-align: middle;
                }
                .apu-tag {
                    padding: toRem(3.5) toRem(5.5);
                    height: auto;
                    font-size: toRem(9);
                    line-height: 1;
                    vertical-align: middle;
                }
            }
            .announce-panel-win {
                width: toRem(50);
            }
        }
        .announce-panel-landinfo {
            padding: toRem(14) 0;
            font-size: toRem(15);
            line-height: 1;
            .apl-address {
                line-height: toRem(18);
            }
            .apl-prices {
                margin-top: toRem(10);
                width: 100%;
                color: #666;
                display: flex;
                align-items: center;
                margin-right: toRem(4.5);
                .apl-prices-tags {
                    font-size: toRem(14);
                    .apl-tag {
                        padding: toRem(5);
                        height: auto;
                        font-size: toRem(12);
                        transform: scale(0.82);
                        line-height: 1;
                    }
                }
            }
        }
        .announce-panel-date {
            padding-bottom: toRem(14);
            font-size: toRem(12);
            color: #ccc;
        }
    }
}
</style>
