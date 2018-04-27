<template>
    <div id="dealInformation">
        <block-slot class="rans-detail-info" :title-icon="true">
            <span slot="title">交易信息</span>
            <span slot="more"></span>
            <div slot="conent">
                <div class="block-slot-item">
                    <dl>
                        <dt>房产名称</dt>
                        <dd>{{json.name}}</dd>
                    </dl>
                    <dl>
                        <dt>竞得单位</dt>
                        <dd>{{json.buy_unit}}</dd>
                    </dl>
                    <dl>
                        <dt>成交面积</dt>
                        <dd>{{json.sold_area}}</dd>
                    </dl>
                    <dl>
                        <dt>成交总价</dt>
                        <dd>{{json.total_closing_cost}}</dd>
                    </dl>
                    <dl>
                        <dt>成交楼面价</dt>
                        <dd>{{json.closing_cost}}</dd>
                    </dl>
                    <dl>
                        <dt>溢价率</dt>
                        <dd>{{json.premium_rate}}</dd>
                    </dl>
                    <dl>
                        <dt>成交日期</dt>
                        <dd>{{json.closing_time}}</dd>
                    </dl>
                    <dl>
                        <dt>备注</dt>
                        <dd>{{json.remark}}</dd>
                    </dl>
                </div>
            </div>
        </block-slot>
    </div>
</template>
<script>
import blockSlot from '@/components/blockSlot'
import { getLandBusinessTransaction } from '@/api'
export default {
    name: 'dealInformation',
    components: { blockSlot },
    data() {
        return {
            json: ''
        }
    },
    methods: {
        getLandBusinessTransaction_data() {
            getLandBusinessTransaction(this.$route.query.bid).then(res => {
                // console.log(res)
                if (res && res.Data) {
                    this.json = res.Data
                }
            })
        }
    },
    mounted() {
        this.getLandBusinessTransaction_data()
    }
}
</script>
<style lang='stylus'>
#dealInformation {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 200;
    background: $appBg;
    overflow: scroll;
    .block-slot {
        &.rans-detail-info {
            .block-slot-item {
                padding: toRem(20) 0;
                dl {
                    display: flex;
                    font-size: toRem(14);
                    dt {
                        width: toRem(55);
                        word-break: keep-all;
                        text-align: justify;
                        text-align-last: justify;
                        color: #333;
                        font-weight: 700;
                    }
                    dd {
                        flex: 1;
                        padding-left: toRem(21.5);
                        color: #666;
                    }
                    & + dl {
                        margin-top: toRem(14.5);
                    }
                }
            }
        }
    }
}
</style>
