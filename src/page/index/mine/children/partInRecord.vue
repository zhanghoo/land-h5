<template>
    <div id="partInRecord">
        <mt-navbar class="page-part" v-model="selected">
            <mt-tab-item id="all">全部</mt-tab-item>
            <mt-tab-item id="wait">待公布</mt-tab-item>
            <mt-tab-item id="success">估价成功</mt-tab-item>
        </mt-navbar>
        <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <ul class="record-list" v-if="record">
                <li class="record-item">
                    <div class="record-item-panel" @click="$router.push({name: 'transactionDetail'})">
                        <div class="record-head">
                            <span class="rh-address">纯前端数据-测试用跳到交易详情页</span>
                            <span class="rh-status">****</span>
                        </div>
                        <div class="record-content">
                            <p>投注大师币：200</p>
                            <p>预估成交楼面价: 4000/m²</p>
                            <p>估计时间：2018-04-04 14:14:09</p>
                        </div>
                    </div>
                </li>
                <li class="record-item" v-for="item in filterRecord" :key="item.id">
                    <div class="record-item-panel">
                        <div class="record-head">
                            <span class="rh-address">{{item.name}}</span>
                            <span class="rh-status" v-if="item.estatus === '0'">待公布</span>
                            <span class="rh-status" v-else-if="item.estatus === '1'">估价成功</span>
                            <span class="rh-status" v-else-if="item.estatus === '2'">估价失败</span>
                        </div>
                        <div class="record-content">
                            <p>投注大师币：200</p>
                            <p>预估成交楼面价: {{item.evaluate_num}}/m²</p>
                            <p>估计时间：{{item.evaluate_time}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { getEvaluateRecord } from '@/api'
export default {
    name: 'partInRecord',
    data() {
        return {
            selected: 'all',
            record: '',
            filterRecord: '',
            wrapperHeight: 0
        }
    },
    watch: {
        selected(val) {
            this.filterRecord_data(val)
        }
    },
    methods: {
        getEvaluateRecord_data() {
            getEvaluateRecord().then(res => {
                if (res && res.Data) {
                    this.filterRecord = this.record = res.Data
                }
            })
        },
        filterRecord_data(type) {
            let selectType = type
            switch (selectType) {
                case 'wait': selectType = '0'
                    break
                case 'success': selectType = '1'
                    break
                default: selectType = ''
            }
            if (selectType) {
                this.filterRecord = this.record.filter(item => item.estatus === selectType)
            } else {
                this.filterRecord = this.record
            }
        }
    },
    mounted() {
        this.getEvaluateRecord_data()
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    }
}
</script>
<style lang='stylus'>
#partInRecord {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 200;
    background: $appBg;
    .mint-navbar {
        border-1px-bottom($borderColor);
        .mint-tab-item {
            padding: toRem(6) 0;
            font-size: toRem(14);
            color: #333;
            .mint-tab-item-label {
                height: toRem(30);
                line-height: toRem(30);
            }
            &.is-selected {
                margin-bottom: 0;
                color: $appColor;
                border-bottom: toRem(1.5) solid $appColor;
            }
            & + .mint-tab-item {
                .mint-tab-item-label {
                    border-1px-left($borderColor);
                }
            }
        }
    }
    .page-infinite-wrapper {
        overflow: scroll;
    }
    .record-list {
        .record-item {
            margin-bottom: toRem(5);
            .record-item-panel {
                padding: 0 toRem(18);
                background: $panelBg;
                .record-head {
                    display: flex;
                    padding: toRem(15) 0;
                    justify-content: space-between;
                    font-size: toRem(14);
                    line-height: toRem(22);
                    border-1px-bottom($borderColor);
                    color: #333;
                    .rh-address {
                        width: 65%;
                        white-space: pre;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .rh-status {
                        color: $appColor;
                    }
                }
                .record-content {
                    padding: toRem(8) 0;
                    line-height: toRem(28);
                    font-size: toRem(13);
                    color: #666;
                }
            }
        }
    }
}
</style>
