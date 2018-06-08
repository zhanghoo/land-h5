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
    </div>
</template>
<script>
import audioPlayer from '@/components/audioPlayer'
import { getMomentDetail, postZan } from '@/api/moment'
import { mapState } from 'vuex'
import { wxShare } from '@/api/wx'
import $ from 'jquery'
export default {
    name: 'momentDetail',
    components: { audioPlayer },
    data() {
        return {
            json: '',
            popupVisible: false,
            showImg: '',
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
        this.getMomentsDetail_data()
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
            text-align justify
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
        bottom: toRem(200);
        z-index: 9;
        width: toRem(50);
        height toRem(50);
        background: $appColor;
        border-radius: 100%;
        box-shadow: 0 0 toRem(10) rgba($appColorRGB, .7);
        font-size: 36px;
        color #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
