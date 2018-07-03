<template>
    <div id="momentDetail">
        <template v-if="json">
            <div class="momentDetail-info">
                <img class="info-avatar" v-if="json.avatar" :src="json.avatar">
                <span class="info-name" v-if="json.uname">{{json.uname}}</span>
                <mt-button class="label" plain type="primary" v-if="json.label">{{json.label}}</mt-button>
                <span class="info-time" v-if="json.ptime">{{json.ptime}}</span>
            </div>
            <div class="momentDetail-zan">
                <i class="my-icon-zan" :class="{'active': json.is_like !== '0'}" @click="addZan(json)"> {{json.lnum}}</i>
            </div>
            <div class="momentDetail-content">
                <div class="content-title">{{json.title}}</div>
                <div class="content-text" v-html="json.content"></div>
            </div>
            <!-- 音频内容 -->
            <div v-if="json.voice_url !== '' && json.voice_url !== undefined" class="content-audio">
                <audioPlayer :audioSrc="json.voice_url"></audioPlayer>
            </div>
            <template v-if="json.image && json.image != null && json.image != 'null'">
                <div class="content-preview" :class="`content-preview-${json.image.length}`">
                    <div class="preview-item" v-for="(item, index) in json.image" :key="index">
                        <img class="preview-img" :src="item.s_img" @click="clickPopupvisible(item.b_img)">
                    </div>
                </div>
                <mt-popup v-model="popupVisible" popup-transition="popup-fade">
                    <img :src="showImg" class="momentDetail-img" @click="popupVisible = false" id="bigImg">
                    <mt-spinner v-show="showLoading" type="fading-circle" color="#99999"></mt-spinner>
                </mt-popup>
            </template>
            <!-- 概览 -->
            <template v-if="json.product && json.product !== 'null'">
                <div class="content-overview-wrap">
                    <router-link class="content-overview" :to="{path: '/landDetail', query: { 'pid': json.product.pid, 'type': json.product.tstatus}}" tag="div">
                        <div class="overview-title">{{json.product.name}}</div>
                        <div class="overview-adress">
                            <i class="my-icon-adress"></i>{{json.product.province}}
                        </div>
                        <mt-button class="overview-type" plain type="primary">{{json.product.sold_type}}</mt-button>
                    </router-link>
                </div>
            </template>
        </template>
        <div class="backHome my-icon-home" @click="$router.push('/')"></div>
        <!-- 支付弹框 -->
        <div ref="msgbox" class="pay-msgbox-wrapper" v-if="payMsgBox">
            <transition name="bounce">
                <div class="pay-msgbox" v-if="payMsgBox">
                    <div class="pay-msgbox-header">确认支付</div>
                    <div class="pay-msgbox-content">
                        <div class="content-message">查看需支付{{payToWatchItem.money}}大师币,是否确认查看?</div>
                        <div class="content-money">
                            剩余：
                            <i class="my-icon-tongqian"></i>
                            <span class="text">{{$store.state.mine.master_coin}}</span>
                            <router-link :to="{name: 'recharge'}" class="my-icon-add"></router-link>
                        </div>
                    </div>
                    <div class="pay-msgbox-btns">
                        <div class="pay-msgbox-btn cancle" @click="$router.push('/')">不看了</div>
                        <!-- 判断余额是否能查看 -->
                        <template v-if="$store.state.mine.master_coin >= payToWatchItem.money">
                            <div class="pay-msgbox-btn confirm" @click="confirmWatch">确认查看</div>
                        </template>
                        <template v-else>
                            <div class="pay-msgbox-btn cancle" @click="watchNoMoney">确认查看</div>
                        </template>
                    </div>
                </div>
            </transition>
            <div class="pay-msgbox-modal" v-show="payMsgBox"></div>
        </div>
    </div>
</template>
<script>
import audioPlayer from '@/components/audioPlayer'
import { getMomentDetail, postZan, checkShare } from '@/api/moment'
import { mapState } from 'vuex'
import { wxShare } from '@/api/wx'
import $ from 'jquery'
import { getQueryString } from '@/utils/utils'
export default {
    name: 'momentDetail',
    components: { audioPlayer },
    beforeRouteEnter (to, from, next) {
        // console.log(to.name, from.name)
        if (from.name === 'moment' || from.name === 'userDetail' || from.name === 'homePage') {
            // 点击动态进入
            next()
        } else if (from.name === null) {
            // 从链接直接进入
            if (getQueryString('action') === 'momentDetail') {
                // 从动态页分享链接进入
                next()
                // // 弹出弹框
                // next(vm => {
                //     // 通过 `vm` 访问组件实例
                //     vm.$refs.msgbox.style.display = 'block'
                // })
            } else {
                next(vm => {
                    // 通过 `vm` 访问组件实例
                    vm.$router.push({ path: '/index/home' })
                })
            }
        } else {
            // 其他
            next(vm => {
                // 通过 `vm` 访问组件实例
                vm.$router.push({ path: '/index/home' })
            })
        }
    },
    data() {
        return {
            json: '',
            popupVisible: false,
            showImg: '',
            payMsgBox: false,
            payToWatchItem: {},
            showLoading: false
        }
    },
    computed: {
        ...mapState([
            'mine',
            'shareInfoDesc',
            'isWeiXin'
        ])
    },
    methods: {
        checkPay() {
            let params = {
                'cid': this.$route.query.cid,
                'user_id': this.mine.user_id
            }
            // console.log(params)
            checkShare(params).then(res => {
                console.log(res)
                if (res && res.Data) {
                    this.payToWatchItem.cid = this.$route.query.cid
                    this.payToWatchItem.money = res.Data.coin
                    if (res.Data.coin !== 0) {
                        // 付费金额
                        if (res.Data.is_pay === '1') {
                            console.log('this.payMsgBox = true')
                            // 需要付费
                            this.payMsgBox = true
                        } else {
                            this.getMomentsDetail_data()
                        }
                    } else {
                        this.getMomentsDetail_data()
                    }
                }
            })
        },
        // 确认查看余额不足
        watchNoMoney() {
            this.$toast('大师币不足')
        },
        // 支付查看内容
        confirmWatch() {
            if (this.$store.state.mine.master_coin >= this.payToWatchItem.money) {
                this.$store.dispatch('post_reduceUserMoney', this.payToWatchItem.money)
                this.payToWatchItem.is_pay = '0'
                this.$store.commit('setPaid', this.payToWatchItem.cid)
                this.$toast(`-${this.payToWatchItem.money}大师币`)
                this.$router.push({ path: '/momentDetail', query: { 'cid': this.payToWatchItem.cid } })
            }
            this.$refs.msgbox.style.display = 'none'
            this.payMsgBox = false
            this.getMomentsDetail_data()
        },
        clickPopupvisible(b_img) {
            let _self = this
            _self.showImg = b_img
            let _img = new Image()
            _img.src = _self.showImg
            if (_img.complete) {
                // 已加载
                _self.popupVisible = true
            } else {
                let _img = $('#bigImg')
                // 未加载
                _img.off('load').on('load', function () {
                    let imgW = _img[0].naturalWidth
                    let imgH = _img[0].naturalHeight
                    if (imgW >= imgH) {
                        // 横图
                        _img.css({ 'width': '100vw', 'height': 'auto' })
                    } else {
                        // 竖图
                        let _clientW = $(window).width()
                        let _clientH = $(window).height()
                        let _clientWH = _clientW / _clientH
                        let imgWH = imgW / imgH
                        if (_clientWH > imgWH) {
                            // 视宽高比 大于 图片宽高比  设置图片高
                            _img.css({ 'width': 'unset', 'height': '100vh' })
                        } else if (_clientWH < imgWH) {
                            // 视宽高比 大于 图片宽高比  设置图片宽
                            _img.css({ 'width': '100vw', 'height': 'unset' })
                        } else {
                            _img.css({ 'width': '100vw', 'height': '100vh' })
                        }
                    }
                    _self.popupVisible = true
                })
            }
        },
        getMomentsDetail_data() {
            let params = {
                'cid': this.$route.query.cid,
                'uid': this.mine.user_id
            }
            // console.log(params)
            getMomentDetail(params).then(res => {
                if (res && res.Data) {
                    this.json = res.Data
                }
            })
        },
        addZan(item) {
            this.$store.commit('setMomentLike', item.cid)
            if (item.is_like === '0') {
                let params = {
                    cid: item.cid,
                    uid: this.mine.user_id
                }
                postZan(params).then(res => {
                    if (res.Code === '0' || res.Code === 0) {
                        this.$toast('-10大师积分')
                        item.lnum++
                        item.is_like = true
                    } else {
                        this.$toast(res.Msg)
                    }
                })
            }
        },
        initShare() {
            // transactionDetail页面 和 mine页面 分享需要重新设置 加上userid, 这里分享的是当前详情页面
            // 其余页面分享的都是, empty入口界面
            // 遗留分享问题, 在其他页面的分享应该是默认的全局默认的shareInfo 在 main.js 里面 每个router里面拼接一下链接, 在state 里面保存其他的微信参数
            let url = `${window.location.href.split('#')[0]}#/momentDetail?cid=${this.$route.query.cid}&action=momentDetail&userid=${this.mine.user_id}`
            // console.log(url)
            wxShare(url).then(res => {
                if (res && res.Data) {
                    this.shareInfo = res.Data
                    this.onWxMenuShare()
                }
            })
        },
        onWxMenuShare() {
            let self = this
            // 配置微信分享按钮
            let _shareInfo = self.shareInfo
            // console.log(_shareInfo)
            if (self.isWeiXin) {
                // alert('点击了分享, 开始config')
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: _shareInfo.appId, // 必填，公众号的唯一标识
                    timestamp: _shareInfo.timestamp, // 必填，生成签名的时间戳
                    nonceStr: _shareInfo.nonceStr, // 必填，生成签名的随机串
                    signature: _shareInfo.signature, // 必填，签名
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'translateVoice',
                        'startRecord',
                        'stopRecord',
                        'onVoiceRecordEnd',
                        'playVoice',
                        'onVoicePlayEnd',
                        'pauseVoice',
                        'stopVoice',
                        'uploadVoice',
                        'downloadVoice'
                    ]
                })
                wx.ready(function () {
                    // console.log('momentDetail wx.ready _shareInfo.url = ', _shareInfo.url)
                    wx.onMenuShareTimeline({
                        'title': self.shareInfoDesc.timeline_title,
                        'imgUrl': self.shareInfoDesc.timeline_imgUrl,
                        'link': _shareInfo.url
                    })
                    wx.onMenuShareAppMessage({
                        'title': self.shareInfoDesc.appmessage_title,
                        'desc': self.shareInfoDesc.appmessage_desc,
                        'imgUrl': self.shareInfoDesc.appmessage_imgUrl,
                        'link': _shareInfo.url
                    })
                })
            } else {
                // alert('呀T_T, 好像出错了~~快去微信朋友圈分享试试吧')
            }
        }
    },
    mounted() {
        if (getQueryString('action') !== 'momentDetail') {
            // 非分享链接进入
            this.getMomentsDetail_data()
        } else {
            // 从分享链接进入
            this.checkPay()
        }
        this.$nextTick(() => {
            this.initShare()
        })
    }
}
</script>
<style lang='stylus'>
#momentDetail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    top: 0;
    left: 0;
    z-index: 300;
    background: $panelBg;
    .momentDetail-info {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: toRem(10);
        font-size: 0;
        margin: toRem(12) 0;
        padding: 0 toRem(18);
        .info-avatar {
            width: toRem(25);
            height: toRem(25);
            border-radius: 100%;
        }
        .info-name {
            color: $mainText;
            font-size: toRem(14);
            margin: 0 toRem(8);
        }
        .info-time {
            color: #ccc;
            font-size: toRem(14);
            margin-left: auto;
            transform: scale(0.9);
        }
    }
    .momentDetail-zan {
        display: flex;
        padding: 0 toRem(18);
        align-items: center;
        justify-content: flex-end;
        margin-bottom: toRem(14);
        .my-icon-zan {
            color: #ccc;
            font-size: toRem(14);
            transform: scale(0.9);
            &.active {
                color: $appColor;
            }
        }
    }
    .momentDetail-content {
        padding: 0 toRem(18);
        .content-title {
            color: #333;
            font-size: toRem(16);
            margin-bottom: toRem(10);
            word-wrap:break-word ;
            word-break: break-all;
        }
        .content-text {
            margin-bottom: toRem(7);
            color: #666;
            font-size: toRem(16);
            text-align: justify;
            word-break: break-all;
            word-wrap: break-word;
            text-align justify;
            line-height: 1.5em;
            a {
                color: $appColor;
            }
        }
    }
    .content-audio {
        padding: 0 toRem(18);
        margin-bottom: toRem(14);
    }
    .content-preview {
        display: flex;
        padding: 0 toRem(18);
        align-items: flex-start;
        max-height: toRem(180);
        overflow: hidden;
        .preview-item {
            .preview-img {
                display: block;
                width: 100%;
            }
        }
        &.content-preview-1 {
            .preview-item {
                max-width: 100%;
                max-height: 100%;
                margin: auto 0;
            }
        }
        &.content-preview-2 {
            .preview-item {
                width: 50%;
                &:nth-child(1) {
                    padding-right: 0.5%;
                }
                &:nth-child(2) {
                    padding-left: 0.5%;
                }
            }
        }
        &.content-preview-3 {
            .preview-item {
                width: 33%;
                &:nth-child(2) {
                    margin: 0 0.5%;
                }
            }
        }
    }
    .content-overview-wrap {
        margin-top: toRem(14);
        padding: 0 toRem(18);
        .content-overview {
            padding: toRem(14) toRem(12);
            background: #f5f5f5;
            .overview-title {
                color: $mainText;
                font-size: toRem(15);
                text-align: justify;
                margin-bottom: toRem(10);
            }
            .overview-adress {
                display: flex;
                align-items: center;
                color: $subText;
                font-size: toRem(14);
                margin-bottom: toRem(10);
                i {
                    color: $appColor;
                    margin-right: toRem(5);
                }
            }
            .overview-type {
                margin: 0 toRem(5) 0 0;
                height: toRem(20);
                line-height: toRem(20);
                border-radius: toRem(2);
                font-size: toRem(12);
                .mint-button-text {
                    line-height: toRem(20);
                }
            }
        }
    }
    .mint-popup {
        flex-vertical-center();
        overflow: hidden;
        white-space: nowrap;
        background: transparent;
    }
    .backHome{
        position: fixed;
        right: toRem(20);
        bottom: toRem(20);
        z-index: 9;
        width: toRem(40);
        height toRem(40);
        background: $appColor;
        border-radius: 100%;
        box-shadow: 0 0 toRem(10) rgba($appColorRGB, .7);
        font-size: toRem(28);
        color #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .pay-msgbox-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3000;
        .pay-msgbox {
            position: fixed;
            top: 50%;
            left: 50%;
            background-color: #fff;
            width: 80%;
            border-radius: toRem(5);
            font-size: toRem(15);
            overflow: hidden;
            backface-visibility: hidden;
            padding: toRem(15) toRem(10);
            z-index: 3002;
            transform: translate3d(-50%, -50%, 0);
            .pay-msgbox-header {
                font-size: toRem(16);
                font-weight: 700;
                color: #666;
                text-align: center;
                padding-bottom: toRem(15);
                border-1px-bottom(#eee);
            }
            .pay-msgbox-content {
                position: relative;
                color: #000;
                padding: toRem(25) toRem(10);
                .content-message {
                    font-size: toRem(15);
                    margin-bottom: toRem(10);
                }
                .content-money {
                    .my-icon-tongqian {
                        color: #f9c546;
                    }
                    .text {
                        color: #666;
                        margin: 0 toRem(10) 0 toRem(5);
                    }
                    .my-icon-add {
                        color: $appColor;
                    }
                }
            }
            .pay-msgbox-btns {
                display: flex;
                height: 40px;
                line-height: 40px;
                justify-content: space-around;
                .pay-msgbox-btn {
                    display: block;
                    background-color: #fff;
                    flex: 1;
                    text-align: center;
                    color: #fff;
                    border-radius: toRem(5);
                }
                .cancle {
                    width: 50%;
                    background: #ccc;
                    margin-right: toRem(5);
                }
                .confirm {
                    width: 50%;
                    background: $appColor;
                    margin-left: toRem(5);
                }
            }
        }
        .pay-msgbox-modal {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            opacity: 0.5;
            background: #000;
            z-index: 3001;
            transition: all 0.2s;
        }
    }
}
</style>
