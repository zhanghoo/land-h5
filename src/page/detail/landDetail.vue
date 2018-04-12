<template>
    <div id="landDetail">
        <div class="land-tab-nav">
            <mt-navbar class="page-land" v-model="selected">
                <mt-tab-item id="summarize">
                    <span class="land-tab-btn">{{landText}}概况</span>
                </mt-tab-item>
                <mt-tab-item id="details">
                    <span class="land-tab-btn">{{landText}}详情</span>
                </mt-tab-item>
            </mt-navbar>
        </div>
        <div class="land-tab-container">
            <mt-tab-container class="page-tabbar-tab-container" v-model="selected">
                <mt-tab-container-item id="summarize">
                    <div class="land-detail-summarize">
                        <div class="lds-shows">
                            <div class="lds-shows-map" v-if="type === 0" :key="0">
                                <el-amap vid="amap-vue"></el-amap>
                            </div>
                            <div class="lds-shows-img" v-else :key="1"></div>
                        </div>
                        <div class="lds-desc">
                            <div class="lds-desc-title">{{landText}}概况</div>
                            <div class="lds-desc-text">{{landAbstractJson.desc}}</div>
                        </div>
                    </div>
                    <block-slot class="land-detail-comments">
                        <span slot="title">用户评论</span>
                        <div slot="more">
                            <span @click="$router.push({path: '/publish', query: { 'pid': $route.query.pid}})" class="land-detail-publish">发表评论</span>
                        </div>
                        <div slot="conent">
                            <moment-list :json="landAbstractJson.comment"></moment-list>
                        </div>
                    </block-slot>
                </mt-tab-container-item>
                <mt-tab-container-item id="details">
                    <div class="land-detail-info">
                        <div class="ldi-table land-detail-border">
                            <dl class="ldi-col">
                                <dt>{{landText}}名称</dt>
                                <dd>{{landDetailJson.name}}</dd>
                            </dl>
                            <dl class="ldi-col">
                                <dt>所在省市</dt>
                                <dd>{{landDetailJson.province}}</dd>
                            </dl>
                            <dl class="ldi-col">
                                <dt>板块位置</dt>
                                <dd>{{landDetailJson.location}}</dd>
                            </dl>
                            <dl class="ldi-col">
                                <dt>{{landText}}编号</dt>
                                <dd>{{landDetailJson.number}}</dd>
                            </dl>
                            <dl class="ldi-col">
                                <dt>出让面积</dt>
                                <dd>{{landDetailJson.sarea}}</dd>
                            </dl>
                            <dl class="ldi-col">
                                <dt>用途</dt>
                                <dd>{{landDetailJson.purpose}}</dd>
                            </dl>
                            <dl class="ldi-col">
                                <dt>起始价</dt>
                                <dd>{{landDetailJson.sprice}}</dd>
                            </dl>
                            <dl class="ldi-col">
                                <dt>容积率</dt>
                                <dd>{{landDetailJson.pratio}}</dd>
                            </dl>
                            <dl class="ldi-col">
                                <dt>截止时间</dt>
                                <dd>{{landDetailJson.deadline}}</dd>
                            </dl>
                            <dl class="ldi-col">
                                <dt>让出单位</dt>
                                <dd>{{landDetailJson.sunit}}</dd>
                            </dl>
                            <dl class="ldi-col">
                                <dt>让出方式</dt>
                                <dd>{{landDetailJson.stype}}</dd>
                            </dl>
                        </div>
                        <div class="land-price-count land-detail-border">已估价{{landDetailJson.enum}}次，估价后可查看他人估价</div>
                        <div class="land-detail-tip land-detail-border">
                            <span class="ldt-icon my-icon-guanyuwomen"></span>
                            截止时间前可修改估价
                        </div>
                    </div>
                    <template v-if="partIn">
                        <block-slot class="land-detail-price land-detail-myprice">
                            <span slot="title">我的估价</span>
                            <span slot="more"></span>
                            <div slot="conent">
                                <div class="block-slot-item" v-for="(item,index) in landDetailJson.evaluate" :key="index">
                                    <div class="bs-col">{{item.eprice}}</div>
                                    <div class="bs-col">
                                        <span>无字段</span>
                                        <span class="icon my-icon-qianbi"></span>
                                    </div>
                                    <div class="bs-col">{{item.etime}}</div>
                                </div>
                            </div>
                        </block-slot>
                        <block-slot class="land-detail-price land-detail-other-price">
                            <span slot="title">他人估价</span>
                            <span slot="more"></span>
                            <div slot="conent">
                                <div class="block-slot-item" v-for="(item,index) in landDetailJson.evaluate" :key="index">
                                    <div class="bs-col">{{item.name}}</div>
                                    <div class="bs-col">{{item.eprice}}</div>
                                    <div class="bs-col">{{item.etime}}</div>
                                </div>
                            </div>
                        </block-slot>
                    </template>
                    <div v-if="deadlineYN == 'Y'" class="land-detail-btns">
                        <template v-if="partIn">
                            <div v-show="!popupVisible" class="btn-operats">
                                <mt-button @click="clickInvitation(1)" class="btn-again" type="default">再次估价</mt-button>
                                <mt-button class="btn-edit" @click="clickInvitation(2)" type="primary">修改估价</mt-button>
                            </div>
                        </template>
                        <template v-else>
                            <mt-button v-show="!popupVisible" @click="clickInvitation(0)" class="btn-evaluate" type="primary">估价（200大师币）</mt-button>
                        </template>
                    </div>
                    <mt-popup v-model="popupVisible" class="evaluate-wrap" position="bottom">
                        <div class="land-detail-evaluate">
                            <div class="lde-top" v-show="operation !== 2">
                                <div class="lde-left">
                                    <span class="lde-icon my-icon-qianbi"></span>1088</div>
                                <div class="lde-right">
                                    <span class="lde-add my-icon-add"></span>
                                </div>
                            </div>
                            <div class="lde-bottom">
                                <mt-field placeholder="预估成交楼面价（元/m²）" type="number" v-model="evaluatePrice" class="">
                                    <mt-button class="btn-evaluate small" type="primary">
                                        <span class="btn-evaluate-text">估价</span>
                                        <span v-show="operation !== 2" class="btn-evaluate-tip">（200大师币）</span>
                                    </mt-button>
                                </mt-field>
                            </div>
                        </div>
                    </mt-popup>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <!-- 金币掉落 -->
        <div v-if="goldDrop" class="gold-drop-box" @click="goldDrop = false">
            <img class="home-box-close-img" src="~@/assets/img/golddrop.gif">
        </div>
    </div>
</template>
<script>
import blockSlot from '@/components/blockSlot'
import momentList from '@/components/momentList'
import { getLandAbstract, getLandDetail } from '@/api'
export default {
    name: 'landDetail',
    components: { blockSlot, momentList },
    data() {
        return {
            selected: 'summarize', // 当前显示的标题,summarize=概况,details=详情
            type: 0, // 0地块1房产
            partIn: true, // 是否参与true->参与false->未参与
            deadline: 1523229861000, // 截止时间时间戳判断是否显示下方按钮
            popupVisible: false,
            evaluatePrice: null,
            operation: 0, // 点击的是哪个按钮,0=第一次估价,1=再次估价,2=修改估价
            goldDrop: false, // 金币掉落,第一估计和再次估价的时候为true
            landAbstractJson: '',
            landDetailJson: ''
        }
    },
    computed: {
        landText() {
            var t = this.type === 0 ? '地块' : '房产'
            return t
        },
        deadlineYN() {
            var t = Date.parse(new Date()) > this.deadline ? 'Y' : 'N'
            return t
        }
    },
    methods: {
        clickInvitation(operation) {
            this.operation = !operation ? 3 : operation
            this.popupVisible = !this.popupVisible
            if (this.operation === 0 || this.operation === 1) {
                this.goldDrop = true
            }
        },
        getLandAbstract_data() {
            let params = {
                pid: this.$route.query.pid,
                uid: this.$store.state.user.user_id
            }
            getLandAbstract(params).then(res => {
                if (res && res.Data) {
                    this.landAbstractJson = res.Data
                }
            })
        },
        getLandDetail_data() {
            let params = {
                pid: this.$route.query.pid,
                uid: this.$store.state.user.user_id
            }
            getLandDetail(params).then(res => {
                if (res && res.Data) {
                    this.landDetailJson = res.Data
                }
            })
        }
    },
    mounted() {
        this.getLandAbstract_data()
        this.getLandDetail_data()
    }
}
</script>
<style lang='stylus'>
#landDetail {
    font-size: toRem(14);
    .land-tab-nav {
        background: $panelBg;
        border-1px-bottom($borderColor);
        padding: toRem(6.5) 0;
        .page-land {
            position: relative;
            padding: 0;
            .mint-tab-item {
                flex-vertical-center();
                position: relative;
                padding: 0;
                width: 50%;
                height: toRem(30);
                line-height: toRem(30);
                .land-tab-btn {
                    padding: toRem(10) toRem(20);
                    font-size: toRem(14);
                }
                &.is-selected {
                    position: relative;
                    border-bottom: none;
                    color: $appColor;
                    &:after {
                        content: '';
                        display: block;
                        position: absolute;
                        left: 50%;
                        bottom: toRem(-5.5);
                        margin-left: toRem(-40);
                        width: toRem(80);
                        border-bottom: toRem(2) solid $appColor;
                    }
                }
            }
            &:after {
                display: block;
                position: absolute;
                left: 50%;
                bottom: 0;
                height: 100%;
                border-left: 1px solid #e6e6e6;
                content: '';
            }
        }
    }
    .land-tab-container {
        .land-detail-summarize {
            padding: toRem(15) toRem(18);
            background: $panelBg;
            margin-bottom: toRem(10);
            .lds-shows {
                position: relative;
                padding-top: 50%;
                width: 100%;
                height: 0;
                overflow: hidden;
                background: $appBg;
                .lds-shows-img, .lds-shows-map {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            }
            .lds-desc {
                line-height: 1;
                .lds-desc-title {
                    padding: toRem(12.5) 0 toRem(8.5);
                    font-size: toRem(14);
                }
                .lds-desc-text {
                    color: #666;
                    font-size: toRem(13);
                    line-height: toRem(18);
                }
            }
        }
        .land-detail-info {
            background: $panelBg;
            padding: 0 toRem(18.5);
            margin-bottom: toRem(10);
            .ldi-table {
                padding: toRem(20) 0;
                .ldi-col {
                    display: flex;
                    font-size: toRem(14);
                    line-height: toRem(20);
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
                        padding-left: toRem(7);
                        color: #666;
                    }
                    & + .ldi-col {
                        margin-top: toRem(12.5);
                    }
                }
            }
            .land-price-count {
                padding: toRem(12.5) 0;
                color: $appColor;
            }
            .land-detail-tip {
                padding: toRem(12.5) 0;
                color: #999;
                .ldt-icon {
                    margin-right: toRem(3.5);
                }
            }
            .land-detail-border {
                & + .land-detail-border {
                    border-1px-top($borderColor);
                }
            }
        }
        .block-slot {
            &.land-detail-comments {
                .land-detail-publish {
                    font-size: toRem(12);
                    color: $appColor;
                }
                .block-slot-body {
                    padding: 0;
                }
            }
            &.land-detail-price {
                .block-slot-item {
                    display: flex;
                    .bs-col {
                        text-ellipsis();
                        text-align: center;
                        font-size: toRem(12);
                        line-height: 1;
                        &:nth-child(1) {
                            text-align: left;
                            width: 20%;
                        }
                        &:nth-child(2) {
                            width: 40%;
                        }
                        &:nth-child(3) {
                            width: 40%;
                        }
                    }
                }
            }
            &.land-detail-myprice {
                .bs-col {
                    color: $appColor;
                    .icon {
                        margin-left: toRem(4.5);
                        color: #ffed96;
                        font-size: toRem(13);
                    }
                }
            }
        }
        .land-detail-btns {
            .btn-operats {
                display: flex;
                justify-content: space-between;
                padding: toRem(20) toRem(18);
                .mint-button {
                    padding: toRem(17) toRem(49);
                    height: auto;
                    border-radius: toRem(3);
                    font-size: toRem(15);
                    line-height: 1;
                    color: #fff;
                    &.mint-button--default {
                        background: #ccc;
                    }
                }
            }
            .btn-evaluate {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                height: toRem(49);
                line-height: toRem(49);
                text-align: center;
                font-size: toRem(15);
                color: #fff;
                background: $appColor;
                border-radius: 0;
            }
        }
        .mint-popup {
            &.evaluate-wrap {
                width: 100%;
            }
        }
        .land-detail-evaluate {
            background: $appBg;
            .lde-top {
                display: flex;
                padding: toRem(12) toRem(18);
                justify-content: space-between;
                .lde-left {
                    font-size: toRem(14);
                    color: #666;
                    .lde-icon {
                        margin-right: toRem(5);
                    }
                }
                .lde-right {
                    .lde-add {
                        font-size: toRem(16);
                        color: $appColor;
                    }
                }
            }
            .lde-bottom {
                font-size: toRem(14);
                .mint-cell-wrapper {
                    padding: 0;
                    height: toRem(49);
                    .mint-field-core {
                        padding: 0 toRem(18);
                        height: toRem(49);
                        font-size: toRem(14);
                        line-height: toRem(49);
                    }
                    .mint-field-clear {
                        position: relative;
                        left: toRem(-14);
                    }
                    .mint-button {
                        padding: 0;
                        width: toRem(120);
                        height: toRem(49);
                        border-radius: 0;
                        .mint-button-text {
                            flex-vertical-center();
                            font-size: toRem(15);
                            .btn-evaluate-tip {
                                font-size: toRem(14);
                            }
                        }
                    }
                }
            }
        }
    }
    .gold-drop-box {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        background: #000;
        z-index: 4000;
        .home-box-close-img {
            position: absolute;
            top: 50%;
            left: 50%;
            width: toRem(390);
            transform: translateX(-50%) translateY(-50%);
        }
    }
}
</style>
<!--
房产页, 概括+详情  房产 = 地块 + 房产
进入页: 所有点击地产的地方可进入
地产大师->(地产估价)->地产列表->(地产panel)->本页
    or ->(地产公布)->(地产panel)->本页
动态->(地产panel)->本页
我的->(参与记录)->参与详情->(地产panel)->本页
ps:
1.在概括container, 房产上方的介绍是图片, 地块是地图
2.在详情container中,
2.1下方按钮区别
2.1.1截止日期前, 下方按钮, 会分是否参与,
     未参与, 按钮为估价(大师币200), 如果不足则为灰色, 且当预估楼价不为空时, 可点击
     已参与, 按钮为左侧再次估价(重新判断是否能估价且生成新记录和未参与情况一样, 生成新参与记录)
              和右侧重新估价(在原记录上修改价格即可)
2.1.2截止日期后, 下方无按钮
2.2我的估价区别
2.2.1如果参与了就显示, 未参与不显示
2.3他人估价区别
2.3.1同上,参与了显示, 未参与不显示
-->
