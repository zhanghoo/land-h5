<template>
    <div id="mineScore">
        <div class="m-score-count">
            <p class="count">当前大师积分：
                <span class="num">{{score}}</span>
            </p>
            <p class="rule" @click="openScoreRule">
                <span class="icon my-icon-tishi"></span>&nbsp;规则</p>
        </div>
        <div class="loadMore" v-infinite-scroll="getScoreRecord_data" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
            <ul class="m-score-list">
                <li class="m-score-item" v-for="(item, index) in scoreRecord" :key="index">
                    <div class="m-score-item-record">
                        <div class="sir-desc">{{item.action}}</div>
                        <div class="sir-date">{{item.act_time}}</div>
                    </div>
                    <div class="m-score-item-num">{{item.type === '1'? '+' : '-'}}{{item.score_num}}</div>
                </li>
            </ul>
            <!-- 底部提示 -->
            <div class="bottomLoad" v-if="scoreRecord.length > 0">
                <div class="loading" v-show="loading === true">加载中...</div>
                <div class="noData" v-if="loading === 'nothing'">没有更多了</div>
            </div>
        </div>
        <mt-popup v-model="popupVisible" position="right" :modal="false">
            <div class="m-score-rule" @click="popupVisible = false">
                <div class="m-score-count">
                    <p class="count">当前大师积分：
                        <span class="num">{{$store.state.mine.master_score}}</span>
                    </p>
                </div>
                <div class="m-score-detail">
                    <div class="sd-title">
                        <span class="my-icon-tishi"></span>&nbsp;积分规则</div>
                    <div class="sd-desc">大师积分是地产大师会员用户可以在使用本游戏软件中获取一定的积分，同时根据累计获取的积分可以升级至不同的会员等级，等级越高的用户拥有更高的威望哦。</div>
                    <div class="sd-title-level">等级划分如下：</div>
                    <table class="m-score-table">
                        <thead>
                            <tr>
                                <th class="st-h1">等级</th>
                                <th class="st-h2">大师积分</th>
                                <th class="st-h3">等级名称</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in scoreRule" :key="index">
                                <td class="st-1">v{{item.level}}</td>
                                <td class="st-2">{{item.score}}</td>
                                <td class="st-3">{{item.level_name}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { getScoreRecord, getScoreRule } from '@/api/mine'
export default {
    name: 'mineScore',
    data() {
        return {
            popupVisible: false,
            score: 0,
            scoreRecord: [],
            scoreRule: '',
            page: 1,
            bottomLock: false,
            loading: false
        }
    },
    computed: {
        ...mapState([
            'mine'
        ])
    },
    methods: {
        openScoreRule() {
            this.popupVisible = !this.popupVisible
            if (!this.scoreRule) {
                getScoreRule().then(res => {
                    if (res && res.Data) {
                        this.scoreRule = res.Data
                    }
                })
            }
        },
        // 获取记录
        getScoreRecord_data() {
            this.loading = true
            this.bottomLock = true
            let params = {
                userid: this.$store.state.mine.user_id,
                page: this.page
            }
            getScoreRecord(params).then(res => {
                if (res && res.Data && res.Data.record) {
                    this.score = res.Data.count
                    if (res.Data.record.length > 0) {
                        this.scoreRecord.push(...res.Data.record)
                        this.page++
                        this.loading = false
                        this.bottomLock = false
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
        }
    },
    mounted() {
        this.getScoreRecord_data()
    }
}
</script>
<style lang='stylus'>
#mineScore {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 200;
    background: $appBg;
    .m-score-count {
        display: flex;
        padding: toRem(15) toRem(19);
        color: #666;
        justify-content: space-between;
        background: $panelBg;
        border-1px-bottom($borderColor);
        .count {
            font-size: toRem(14);
            .num {
                color: $appColor;
            }
        }
        .rule {
            font-size: toRem(14);
        }
    }
    .loadMore {
        padding-bottom: toRem(52);
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .m-score-list {
        padding: 0 toRem(18);
        background: $panelBg;
        .m-score-item {
            padding: toRem(14) 0;
            display: flex;
            justify-content: space-between;
            .m-score-item-record {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                text-align: left;
                .sir-desc {
                    font-size: toRem(15);
                    color: #333;
                }
                .sir-date {
                    margin-top: toRem(12);
                    font-size: toRem(10);
                    color: #ccc;
                }
            }
            .m-score-item-num {
                display: flex;
                align-items: center;
                font-size: toRem(15);
                text-align: right;
                color: $appColor;
            }
            & + .m-score-item {
                border-1px-top($borderColor);
            }
        }
    }
    .mint-popup {
        width: 100%;
        height: 100%;
        background: $appBg;
        overflow: scroll;
        .m-score-rule {
            padding-bottom: toRem(24);
            background: $panelBg;
            .m-score-detail {
                padding: 0 toRem(19);
                background: $panelBg;
                .sd-title {
                    padding: toRem(15) 0;
                    font-size: toRem(13);
                    border-1px-bottom($borderColor);
                }
                .sd-desc {
                    padding: toRem(13) 0;
                    font-size: toRem(15);
                    line-height: toRem(20);
                    color: #666;
                }
                .sd-title-level {
                    margin: toRem(4) 0;
                    font-size: toRem(13);
                    line-height: toRem(18);
                    color: #333;
                    font-weight: 700;
                }
                .m-score-table {
                    background: $appBg;
                    width: 100%;
                    line-height: toRem(42);
                    text-align: center;
                    font-size: toRem(13);
                    .st-h1 {
                        border-right: 1px solid $borderColor;
                    }
                    .st-h2 {
                        border-right: 1px solid $borderColor;
                    }
                    .st-1 {
                        width: 25%;
                        border-top: 1px solid $borderColor;
                        border-right: 1px solid $borderColor;
                    }
                    .st-2 {
                        width: 38%;
                        border-top: 1px solid $borderColor;
                        border-right: 1px solid $borderColor;
                    }
                    .st-3 {
                        width: 37%;
                        border-top: 1px solid $borderColor;
                    }
                }
            }
        }
    }
}
</style>
