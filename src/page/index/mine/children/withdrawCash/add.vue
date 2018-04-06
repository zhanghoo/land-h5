<template>
    <div id="withdrawCashAdd">
        <p class="w-a-tip">请绑定持卡本人的银行卡</p>
        <div class="w-a-from">
            <mt-field class="w-a-block" label="银行卡号" placeholder="请绑定持卡本人的银行卡" v-model="card"></mt-field>
            <mt-field class="w-a-block" label="持卡人" placeholder="持卡人真实姓名" v-model="name"></mt-field>
            <div class="w-a-block" @click.stop="choiceBank">
                <mt-field label="银行名称" placeholder="请选择银行" readonly v-model="bank">
                    <span class="my-icon-more"></span>
                </mt-field>
            </div>
            <div class="w-a-block bank-type">
                <div class="w-a-title">银行卡种类</div>
                <div class="w-a-value">
                    <mt-radio
                          v-model="bankType"
                          :options="['储蓄卡', '信用卡']">
                        </mt-radio>
                </div>
            </div>
            <mt-field class="w-a-block" label="手机号" placeholder="银行卡预留手机号" v-model="phone"></mt-field>
        </div>
        <p class="w-a-btn-next">
            <mt-button class="wabn-btn" type="primary">添加</mt-button>
        </p>
    </div>
</template>
<script>
export default {
    name: 'withdrawCashAdd',
    data() {
        return {
            card: null,
            name: null,
            bank: null,
            bankType: null,
            phone: null
        }
    },
    computed: {

    },
    methods: {
        choiceBank() {
            // console.log('choice bank')
        }
    },
    mounted() {

    }
}
</script>
<style lang='stylus'>
#withdrawCashAdd {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 200;
    background: $appBg;
    .w-a-tip {
        padding: toRem(14) toRem(18);
        font-size: toRem(12);
        color: #666;
    }
    .w-a-from {
        padding: 0 toRem(18);
        background: $panelBg;
        overflow: hidden;
        font-size: toRem(14);
        .mint-cell {
            background-image: none;
        }
        .w-a-block {
            height: toRem(49);
            &.bank-type {
                display: flex;
                .w-a-title {
                    display: block;
                    text-align: justify;
                    text-align-last: justify;
                    width: toRem(75);
                    line-height: toRem(49);
                }
                .w-a-value {
                    flex: 1;
                    .mint-radiolist {
                        display: flex;
                        justify-content: center;
                        .mint-cell {
                            width: 35%;
                            .mint-cell-wrapper {
                                height: toRem(49);
                            }
                            .mint-radiolist-label {
                                padding: 0;
                            }
                            .mint-radio-core {
                                width: toRem(10);
                                height: toRem(10);
                                &:after{
                                    display: none;
                                }
                            }
                            .mint-radio-label {
                                margin-left: toRem(8);
                            }
                        }
                    }
                }
            }
            & + .w-a-block {
                border-1px-top($borderColor);
            }
        }
        .mint-cell-wrapper {
            padding: 0;
            background-image: none;
            .mint-cell-title {
                width: toRem(60);
                font-size: toRem(14);
                .mint-cell-text {
                    display: block;
                    text-align: justify;
                    text-align-last: justify;
                }
            }
            .mint-cell-value {
                padding-left: toRem(12);
                .mint-field-core {
                    font-size: toRem(14);
                }
            }
        }
    }
    .w-a-btn-next {
        margin-top: toRem(130);
        padding: 0 toRem(18);
        .wabn-btn {
            width: 100%;
            height: toRem(49);
            font-size: toRem(18);
        }
    }
}
</style>
