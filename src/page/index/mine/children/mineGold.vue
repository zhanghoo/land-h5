<template>
    <div id="mineGold">
        <div class="m-gold-count">
            <p class="count">当前大师币：
                <span class="num">{{coin}}</span>
            </p>
            <p class="btn">
                <mt-button type="primary" @click="popupVisible = !popupVisible">转赠</mt-button>
            </p>
        </div>
        <div class="loadMore" v-infinite-scroll="getCoinRecord_data" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
            <ul class="m-gold-list">
                <li class="m-gold-item" v-for="(item, index) in coinRecord" :key="index">
                    <div class="m-gold-item-record">
                        <div class="sir-desc">{{item.action}}</div>
                        <div class="sir-date">{{item.act_time}}</div>
                    </div>
                    <div class="m-gold-item-num">{{item.type === '1'? '+' : '-'}}{{item.coin_num}}</div>
                </li>
            </ul>
            <!-- 底部提示 -->
            <div class="bottomLoad" v-if="coinRecord.length > 0">
                <div class="loading" v-show="loading === true">加载中...</div>
                <div class="noData" v-if="loading === 'nothing'">没有更多了</div>
            </div>
        </div>
        <mt-popup v-model="popupVisible" class="mp-popup">
            <div class="mine-present">
                <div class="mine-present-title">转赠他人
                    <span class="mp-icon my-icon-baocuo" @click="popupVisible = false"></span>
                </div>
                <div class="mine-present-content">
                    <p class="mpc-input">
                        <mt-field label="对方ID" v-model="presentUserid"></mt-field>
                    </p>
                    <p class="mpc-input">
                        <mt-field label="转赠大师币" v-model="presentNumber" type="number"></mt-field>
                    </p>
                    <p class="mpc-btn">
                        <mt-button type="primary" @click="confirmPresent">确认转赠</mt-button>
                    </p>
                </div>
            </div>
        </mt-popup>
        <mt-popup v-model="tipVisible" class="tip-popup">
            <div class="mine-present-tip">
                <div class="mpt-icon" :class="sendCoinReturnCode === 0 ? 'my-icon-chenggong' : 'my-icon-shibai'"></div>
                <div class="mpt-text">{{sendCoinReturnMsg}}</div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { getCoinRecord, postSendCoin } from '@/api/mine'
export default {
    name: 'mineGold',
    data() {
        return {
            coin: 0,
            popupVisible: false,
            tipVisible: false,
            coinRecord: [],
            presentUserid: '',
            presentNumber: '',
            sendCoinReturnCode: 1,
            sendCoinReturnMsg: '请求失败',
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
        // 获取记录
        getCoinRecord_data() {
            this.loading = true
            this.bottomLock = true
            let params = {
                userid: this.$store.state.mine.user_id,
                page: this.page
            }
            // console.log(params)
            getCoinRecord(params).then(res => {
                // console.log(res.Data.record)
                if (res && res.Data && res.Data.record) {
                    if (res.Data.record.length > 0) {
                        this.coinRecord.push(...res.Data.record)
                        this.coin = res.Data.count
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
        },
        // 确认转赠
        confirmPresent() {
            var _self = this
            if (!this.presentUserid || !this.presentNumber) {
                this.$toast('请填写信息')
            } else {
                let params = {
                    presentUserid: this.presentUserid,
                    presentNumber: this.presentNumber
                }
                postSendCoin(params).then(res => {
                    this.popupVisible = false
                    _self.sendCoinReturnMsg = res.Msg
                    _self.sendCoinReturnCode = res.Code
                    this.tipVisible = true
                    setTimeout(() => {
                        this.tipVisible = false
                    }, 3000)
                    if (res.Code === 0 || res.Code === '0') {
                        this.page = 1
                        let params = {
                            userid: this.$store.state.mine.user_id,
                            page: this.page
                        }
                        getCoinRecord(params).then(res => {
                            if (res && res.Data && res.Data.record) {
                                if (res.Data.record.length > 0) {
                                    this.coinRecord = res.Data.record
                                    this.coin = res.Data.count
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
                })
            }
        }
    },
    mounted() {
        this.getCoinRecord_data()
    }
}
</script>
<style lang='stylus'>
#mineGold {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 200;
    background: $appBg;
    .m-gold-count {
        display: flex;
        padding: toRem(6.5) toRem(19);
        color: #666;
        justify-content: space-between;
        align-items: center;
        background: $panelBg;
        border-1px-bottom($borderColor);
        .count {
            font-size: toRem(14);
            .num {
                color: $appColor;
            }
        }
        .btn {
            button {
                position: relative;
                top: toRem(-2);
                padding: toRem(9) toRem(18);
                width: auto;
                height: auto;
                font-size: toRem(12);
                line-height: 1;
                background: $appColor;
            }
        }
    }
    .loadMore {
        padding-bottom: toRem(52);
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .m-gold-list {
        padding: 0 toRem(18);
        background: $panelBg;
        .m-gold-item {
            padding: toRem(14) 0;
            display: flex;
            justify-content: space-between;
            .m-gold-item-record {
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
            .m-gold-item-num {
                display: flex;
                align-items: center;
                font-size: toRem(15);
                text-align: right;
                color: $appColor;
            }
            & + .m-gold-item {
                border-1px-top($borderColor);
            }
        }
    }
    .mp-popup {
        width: auto;
        border-radius: toRem(10);
        .mine-present {
            width: toRem(300);
            height: auto;
            .mine-present-title {
                position: relative;
                height: toRem(40);
                line-height: toRem(40);
                color: #aaa;
                font-size: toRem(18);
                text-align: center;
                border-1px-bottom($borderColor);
                .mp-icon {
                    position: absolute;
                    right: toRem(10);
                }
            }
            .mine-present-content {
                padding: toRem(10);
                .mpc-input {
                    padding: 0 toRem(18);
                    font-size: toRem(15);
                    color: #333;
                    .mint-cell {
                        background-image: none;
                    }
                    .mint-cell-wrapper {
                        background-image: none;
                        .mint-cell-title {
                            width: toRem(85);
                            font-size: toRem(15);
                            color: #333;
                        }
                        .mint-cell-value {
                            padding: toRem(9) toRem(10);
                            border: toRem(1) solid $borderColor;
                            border-radius: toRem(2);
                            .mint-field-core {
                                font-size: toRem(14);
                                line-height: toRem(11);
                            }
                        }
                    }
                }
                .mpc-btn {
                    margin-top: toRem(8);
                    .mint-button {
                        width: 100%;
                        height: toRem(48);
                        line-height: toRem(48);
                        font-size: toRem(16);
                    }
                }
            }
        }
    }
    .tip-popup {
        width: toRem(182);
        height: toRem(104);
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: toRem(3);
        .mpt-icon {
            font-size: toRem(36);
            color: $appColor;
        }
        .mpt-text {
            margin-top: toRem(8);
            font-size: toRem(15);
        }
    }
}
</style>
