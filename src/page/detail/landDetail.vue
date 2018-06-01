<template>
    <div id="landDetail" v-infinite-scroll="getLandAbstract__more_data" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
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
                            <div class="lds-shows-map" :key="0">
                                <!-- <el-amap vid="amap-vue" :center="center">
                                    <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position"></el-amap-marker>
                                </el-amap> -->
                                <baidu-map class="lds-baidu-map" :zoom="zoom" :center="center" @ready="handler">
                                    <bm-marker :position="position" :dragging="true"></bm-marker>
                                </baidu-map>
                            </div>
                        </div>
                        <div class="lds-desc">
                            <div class="lds-desc-title">{{landText}}概况</div>
                            <div class="lds-desc-text" v-html="landAbstractJson.desc"></div>
                        </div>
                    </div>
                    <block-slot class="land-detail-comments">
                        <span slot="title">用户评论</span>
                        <div slot="more">
                            <span @click="$router.push({path: '/publish', query: { 'pid': $route.query.pid}})" class="land-detail-publish">发表评论</span>
                        </div>
                        <div slot="conent">
                            <moment-list :json="comment"></moment-list>
                            <!-- 底部提示 -->
                            <div class="bottomLoad" v-if="comment.length > 0">
                                <div class="loading" v-show="loading === true">加载中...</div>
                                <div class="noData" v-if="loading === 'nothing'">没有更多了</div>
                            </div>
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
                                <dd>{{landDetailJson.sold_area}}</dd>
                            </dl>
                            <dl class="ldi-col">
                                <dt>用途</dt>
                                <dd>{{landDetailJson.purpose | purposeToString}}</dd>
                            </dl>
                            <dl class="ldi-col">
                                <dt>起始价</dt>
                                <dd>{{landDetailJson.starting_price}}元/平方米</dd>
                            </dl>
                            <dl class="ldi-col">
                                <dt>容积率</dt>
                                <dd>{{landDetailJson.plot_ratio}}</dd>
                            </dl>
                            <dl class="ldi-col">
                                <dt>截止时间</dt>
                                <dd>{{landDetailJson.deadline}}</dd>
                            </dl>
                            <dl class="ldi-col">
                                <dt>出让单位</dt>
                                <dd>{{landDetailJson.sold_unit}}</dd>
                            </dl>
                            <dl class="ldi-col">
                                <dt>出让方式</dt>
                                <dd>{{landDetailJson.sold_type}}</dd>
                            </dl>
                        </div>
                        <div class="land-price-count land-detail-border">已估价{{landDetailJson.enum}}次，估价后可查看他人估价</div>
                        <div class="land-detail-tip land-detail-border">
                            <span class="ldt-icon my-icon-guanyuwomen"></span>
                            截止时间前可修改估价；若地产流拍，以所有参与玩家的加权平均数作为结果公布
                        </div>
                    </div>
                    <template v-if="partIn">
                        <block-slot class="land-detail-price land-detail-myprice">
                            <span slot="title">我的估价</span>
                            <span slot="more"></span>
                            <div slot="conent">
                                <div class="block-slot-item">
                                    <div class="bs-col">{{mineEvaluateNum}}元/m²</div>
                                    <div class="bs-col">
                                        <span>100</span>
                                        <span class="icon my-icon-zuanshi"></span>
                                    </div>
                                    <div class="bs-col">{{mineEvaluateTime}}</div>
                                </div>
                            </div>
                        </block-slot>
                        <div v-if="deadlineYN == 'Y'" class="land-detail-btns">
                            <template v-if="partIn">
                                <div v-show="!popupVisible" class="btn-operat">
                                    <!-- !!PS: 据0412需求修改, 再次估价去掉, 改为只能修改估价 -->
                                    <!-- <mt-button @click="clickInvitation(1)" class="btn-again" type="default">再次估价</mt-button> -->
                                    <mt-button class="btn-edit" @click="clickInvitation(2)" type="primary">修改估价</mt-button>
                                </div>
                            </template>
                        </div>
                        <block-slot class="land-detail-price land-detail-other-price">
                            <span slot="title">他人估价</span>
                            <span slot="more"></span>
                            <div slot="conent">
                                <template v-if="landDetailJson.evaluate">
                                    <div class="block-slot-item" v-for="(item,index) in landDetailJson.evaluate" :key="index">
                                        <div class="bs-col">{{item.nick_name}}</div>
                                        <div class="bs-col">{{item.evaluate_num}}元/m²</div>
                                        <div class="bs-col">{{item.evaluate_time}}</div>
                                    </div>
                                </template>
                                <p v-else class="block-slot-item">暂无他人估价</p>
                            </div>
                        </block-slot>
                    </template>
                    <div v-if="deadlineYN == 'Y' && !partIn" class="land-detail-btns">
                        <mt-button v-show="!popupVisible" @click="clickInvitation(0)" class="btn-evaluate" type="primary">估价（100大师积分）</mt-button>
                    </div>
                    <mt-popup v-model="popupVisible" class="evaluate-wrap" position="bottom">
                        <div class="land-detail-evaluate">
                            <!-- !!PS: 据0412需求修改, 金币>=200限定去掉, 所以这里不显示了 -->
                            <!-- <div class="lde-top" v-show="operation !== 2">
                                <div class="lde-left">
                                    <span class="lde-icon my-icon-zuanshi"></span>{{mine.master_score}}</div>
                                <div class="lde-right">
                                    <span class="lde-add my-icon-add"></span>
                                </div>
                            </div> -->
                            <div class="lde-bottom">
                                <mt-field placeholder="预估成交楼面价（元/m²）" type="number" v-model="evaluatePrice" class="">
                                    <mt-button class="btn-evaluate small" type="primary" @click="buy">
                                        <span class="btn-evaluate-text">估价</span>
                                        <span v-show="operation !== 2" class="btn-evaluate-tip">（100大师积分）</span>
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
// import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'
// import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
// import VueUeditorWrap from 'vue-ueditor-wrap'
import blockSlot from '@/components/blockSlot'
import momentList from '@/components/momentList'
import { getLandAbstract, getLandDetail, postLandEvaluation } from '@/api'
import { mapState } from 'vuex'
import { formatDate } from '@/utils/utils'
import cache from '@/utils/cache'
export default {
    name: 'landDetail',
    components: { blockSlot, momentList },
    data() {
        return {
            selected: cache.getSession('landDetailSelected') || 'details', // 当前显示的标题,summarize=概况,details=详情
            showFlag: false, // 用于第一次切换
            type: '0', // 0地块1房产 后台返回的是字符串
            partIn: true, // 是否参与true->参与false->未参与 !!!合接口后弃用
            deadline: 1523229861000, // 截止时间时间戳判断是否显示下方按钮 !!!合接口后弃用
            popupVisible: false,
            evaluatePrice: '',
            operation: 0, // 点击的是哪个按钮,0=第一次估价,1=再次估价,2=修改估价 !!PS:0412需求修改, 再次估价去掉, 只能修改
            goldDrop: false, // 金币掉落,第一估计和再次估价的时候为true
            landAbstractJson: '',
            landDetailJson: '',
            comment: [],
            page: 1,
            bottomLock: false,
            loading: false,
            deadlineYN: 'N',
            firstIn: true, // 第一次进入的时候不触发 getLandAbstract_data 概况的请求 解决百度地图异步渲染的问题
            center: {lng: 0, lat: 0},
            position: {lng: 0, lat: 0},
            zoom: 15,
            landAbstractJsonDesc: '',
            map: null
            // center: [121.59996, 31.197646],
            // markers: [
            //     {
            //         position: [121.59996, 31.197646]
            //     }
            // ]
        }
    },
    computed: {
        ...mapState([
            'mine'
        ]),
        mineEvaluateNum() {
            let t = this.landDetailJson && this.landDetailJson.user ? this.landDetailJson.user[0].evaluate_num : 0
            return t
        },
        mineEvaluateTime() {
            let date = new Date()
            let t = this.landDetailJson && this.landDetailJson.user ? this.landDetailJson.user[0].evaluate_time : formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            return t
        },
        // deadlineYN() {
        //     var t = Date.parse(new Date()) > this.deadline ? 'Y' : 'N'
        //     return t
        // },
        landText() {
            console.log(parseInt(this.$route.query.type))
            var t = parseInt(this.$route.query.type) === 0 ? '地块' : '房产'
            return t
        }
    },
    watch: {
        selected() {
            // 第一次点击切换的时候 初始化概览
            // 百度地图渲染标记 div 初始显示的时候是详情, 概览页是 display:none div 也是 none 所以终点标记也是none
            // 所以会出现中心点在左上角的情况
            if (!this.showFlag) {
                this.showFlag = true
                this.getLandAbstract_data()
            }
        },
        $route(to, from) {
            if (from.name === 'publish') {
                this.selected = 'summarize'
                this.getLandAbstract_data()
            }
        }
    },
    filters: {
        purposeToString(val) {
            switch (val) {
                case '1':
                    return '商住'
                case '2':
                    return '商办'
                case '3':
                    return '工业'
            }
        }
    },
    methods: {
        clickInvitation(operation) {
            this.operation = operation
            this.popupVisible = !this.popupVisible
        },
        handler({BMap, map}) {
            this.center.lng = 0
            this.center.lat = 0
            this.position.lng = 0
            this.position.lat = 0
            if (cache.getSession('landDetailSelected') === 'summarize') {
                this.getLandAbstract_data()
            }
        },
        getLandAbstract_data() {
            let _self = this
            this.loading = true
            this.bottomLock = true
            let params = {
                pid: this.$route.query.pid,
                uid: this.$store.state.mine.user_id,
                page: this.page
            }
            // console.log(params)
            getLandAbstract(params).then(res => {
                if (res && res.Data) {
                    this.landAbstractJson = res.Data
                    let lng = Number(res.Data.longitude)
                    let lat = Number(res.Data.latitude)
                    this.landAbstractJsonDesc = res.Data.desc
                    if (lng && lat) {
                        // console.log('getLandAbstract = ', lng, lat)
                        // this.center = [lng, lat]
                        // this.markers[0].position = [lng, lat]
                        _self.center.lng = lng
                        _self.center.lat = lat
                        _self.position.lng = lng
                        _self.position.lat = lat
                    }
                    if (res.Data.comment && res.Data.comment.length > 0) {
                        this.comment.push(...res.Data.comment)
                        this.page++
                        this.bottomLock = false
                        this.loading = false
                        this.handleLocaltion('get')
                    } else {
                        this.loading = 'nothing'
                    }
                }
            })
            .catch(err => {
                console.log(err)
                this.loading = false
            })
        },
        getLandAbstract__more_data() {
            if (this.selected === 'summarize') {
                this.getLandAbstract_data()
            }
        },
        getLandDetail_data() {
            let params = {
                pid: this.$route.query.pid,
                uid: this.$store.state.mine.user_id
            }
            getLandDetail(params).then(res => {
                if (res && res.Data) {
                    this.landDetailJson = res.Data
                    this.type = res.Data.tstatus
                    if (this.landDetailJson.user === '') {
                        // 如果 user 为 '' 即未参与 则 我的估价 和 他人估价不显示
                        this.partIn = false
                    }
                    // 这里后台 php 返回 的是 s 级 * 1000 转换为 ms
                    // 当前时间 Date.parse(new Date()) 小于 截止时间 this.landDetailJson.time * 1000 则 Y 可估价
                    this.deadlineYN = Date.parse(new Date()) < this.landDetailJson.time * 1000 ? 'Y' : 'N'
                }
            })
        },
        buy() {
            let _self = this
            if (!_self.evaluatePrice) {
                _self.$toast('请填写金额')
            } else {
                let params = {
                    pid: _self.$route.query.pid,
                    uid: _self.$store.state.mine.user_id,
                    money: _self.evaluatePrice
                }
                // if (this.operation === 0) {
                //     // 初次估价 播放金币动画 这里还没播放
                //     this.goldDrop = true
                //     // !!!PS播放完毕 跳到 成交详情页面 动画播放时间为 9s
                //     // setTimeout(() => {
                //     //     this.$router.push({ path: 'transactionDetail', query: { id: 1 } })
                //     // }, 9000)
                // }
                postLandEvaluation(params).then(res => {
                    if (res.Code === '0') {
                        if (_self.operation === 2) {
                            // 估价成功 关闭 覆盖层 !!!要在这里关闭 因为不传 operation 为undefined
                            _self.clickInvitation()
                            // 重新修改估计触发
                            _self.$toast('已重新修改估价')
                            _self.getLandDetail_data()
                        } else if (_self.operation === 0) {
                            // 估价成功 关闭 覆盖层 !!!要在这里关闭 因为不传 operation 为undefined
                            _self.clickInvitation()
                            // 初次估价 播放金币动画 这里还没播放
                            _self.goldDrop = true
                            // !!!PS播放完毕 跳到 成交详情页面 动画播放时间为 9s
                            // 0425 反馈修改 时长缩短一半 4.5s
                            setTimeout(() => {
                                _self.$router.push({ path: 'transactionDetail', query: { id: res.Data } })
                            }, 4500)
                        }
                    } else {
                        _self.$toast(res.Msg)
                    }
                })
            }
        },
        // 处理滚动条位置的方法
        handleLocaltion(type) {
            if (type === 'get') {
                this.$nextTick(() => {
                    let location = cache.getSession('landDetailLocation')
                    $('#landDetail').scrollTop(location)
                })
            } else if (type === 'set') {
                let scrollTop = $('#landDetail').scrollTop()
                // console.log(scrollTop)
                if (scrollTop >= 0) {
                    cache.setSession('landDetailLocation', scrollTop)
                }
            }
        }
    },
    mounted() {
        // 详情
        this.getLandDetail_data()
        // this.$nextTick(() => {
        //     // 概况 百度地图会异步加载
        //     this.getLandAbstract_data()
        // })
    },
    beforeRouteLeave(to, from, next) {
        this.handleLocaltion('set')
        if ((to.name === 'publish' && this.selected === 'summarize') || (to.name === 'momentDetail' && this.selected === 'summarize')) {
            cache.setSession('landDetailSelected', 'summarize')
        } else {
            cache.removeSession('landDetailSelected')
        }
        next()
    }
}
</script>
<style lang='stylus'>
#landDetail {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
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
                    font-size: toRem(16);
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
                    .lds-baidu-map {
                        width: 100%;
                        height: 100%;
                    }
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
                    img {
                        max-width: 100%;
                    }
                    p {
                        word-wrap: break-word;
                        word-break: normal;
                    }
                }
            }
        }
        .land-detail-info {
            background: $panelBg;
            padding: 0 toRem(18.5);
            margin-bottom: toRem(49);
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
                    font-size: toRem(14);
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
                            width: 24%;
                        }
                        &:nth-child(2) {
                            width: 38%;
                        }
                        &:nth-child(3) {
                            width: 38%;
                        }
                    }
                }
            }
            &.land-detail-myprice {
                .bs-col {
                    /* width: fit-content !important; */
                    color: $appColor;
                    .icon {
                        margin-left: toRem(4.5);
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
            .btn-operat {
                display: flex;
                justify-content: center;
                padding: toRem(10) toRem(18) toRem(20) toRem(18);
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
