<template>
    <div id="mineGold">
        <div class="m-gold-count">
            <p class="count">当前大师币：
                <span class="num">1500</span>
            </p>
            <p class="btn">
                <mt-button type="primary" @click="popupVisible = !popupVisible">转赠</mt-button>
            </p>
        </div>
        <ul class="m-gold-list">
            <li class="m-gold-item" v-for="(item, index) in coinRecord" :key="index">
                <div class="m-gold-item-record">
                    <div class="sir-desc">{{item.action}}</div>
                    <div class="sir-date">{{item.act_time}}</div>
                </div>
                <div class="m-gold-item-num">{{item.type === '1'? '+' : '-'}}{{item.coin_num}}</div>
            </li>
        </ul>
        <mt-popup v-model="popupVisible" class="mp-popup">
            <div class="mine-present">
                <div class="mine-present-title">转增他人
                    <span class="mp-icon my-icon-baocuo" @click="popupVisible = !popupVisible"></span>
                </div>
                <div class="mine-present-content">
                    <p class="mpc-input">
                        <mt-field label="对方账户" v-model="presentUserid"></mt-field>
                    </p>
                    <p class="mpc-input">
                        <mt-field label="转增大师币" v-model="presentNumber" type="number"></mt-field>
                    </p>
                    <p class="mpc-btn">
                        <mt-button type="primary" @click="confirmPresent">确认转赠</mt-button>
                    </p>
                </div>
            </div>
        </mt-popup>
        <mt-popup v-model="tipVisible" class="tip-popup">
            <div class="mine-present-tip">
                <div class="mpt-icon my-icon-chenggong"></div>
                <div class="mpt-text">转增成功</div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import { getCoinRecord, postSendCoin } from '@/api'
export default {
    name: 'mineGold',
    data() {
        return {
            popupVisible: false,
            tipVisible: false,
            coinRecord: '',
            presentUserid: '',
            presentNumber: ''
        }
    },
    methods: {
        // 获取记录
        getCoinRecord_data() {
            getCoinRecord(this.$store.state.user.user_id).then(res => {
                if (res && res.Data && res.Data.record) {
                    this.coinRecord = res.Data.record
                }
            })
        },
        // 确认转赠
        confirmPresent() {
            if (!this.presentUserid || !this.presentNumber) {
                this.$toast('请填写信息')
            } else {
                let params = {
                    presentUserid: this.presentUserid,
                    presentNumber: this.presentNumber
                }
                postSendCoin(params).then(res => {
                    if (res) {
                        this.popupVisible = !this.popupVisible
                        this.tipVisible = !this.tipVisible
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
