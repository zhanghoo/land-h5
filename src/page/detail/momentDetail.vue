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
                <div class="content-text">{{json.content}}</div>
            </div>
            <template v-if="json.image && json.image != null && json.image != 'null'">
                <div class="content-preview"
                     :class="`content-preview-${json.image.length}`">
                     <img v-for="(item, index) in json.image"
                          :src="item.s_img"
                          :key="index"
                          @click="clickPopupvisible(item.b_img)"
                          class="preview-img">
                </div>
                <mt-popup
                    v-model="popupVisible"
                    popup-transition="popup-fade">
                    <img :src="showImg" class="momentDetail-img" @click="popupVisible = false" id="bigImg">
                    <mt-spinner v-show="showLoading" type="fading-circle" color="#99999"></mt-spinner>
                </mt-popup>
            </template>
        </template>
    </div>
</template>
<script>
import { getMomentDetail, postZan } from '@/api/moment'
import $ from 'jquery'
export default {
    name: 'momentDetail',
    data() {
        return {
            json: '',
            popupVisible: false,
            showImg: '',
            showLoading: false
        }
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
                _img.off('load').on('load', function() {
                    let imgW = _img[0].naturalWidth
                    let imgH = _img[0].naturalHeight
                    if (imgW >= imgH) {
                        // 横图
                        _img.css({'width': '100vw', 'height': 'auto'})
                    } else {
                        // 竖图
                        let _clientW = $(window).width()
                        let _clientH = $(window).height()
                        let _clientWH = _clientW / _clientH
                        let imgWH = imgW / imgH
                        if (_clientWH > imgWH) {
                            // 视宽高比 大于 图片宽高比  设置图片高
                            _img.css({'width': 'unset', 'height': '100vh'})
                        } else if (_clientWH < imgWH) {
                            // 视宽高比 大于 图片宽高比  设置图片宽
                            _img.css({'width': '100vw', 'height': 'unset'})
                        } else {
                            _img.css({'width': '100vw', 'height': '100vh'})
                        }
                    }
                    _self.popupVisible = true
                })
            }
        },
        getMomentsDetail_data() {
            let params = {
                'cid': this.$route.query.cid,
                'uid': this.$store.state.mine.user_id
            }
            getMomentDetail(params).then(res => {
                if (res && res.Data) {
                    this.json = res.Data
                }
            })
        },
        addZan(item) {
            if (item.is_like === '0') {
                let params = {
                    cid: item.cid,
                    uid: this.$store.state.mine.user_id
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
        }
    },
    mounted() {
        this.getMomentsDetail_data()
    }
}
</script>
<style lang='stylus'>
#momentDetail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 300;
    background: $appBg;
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
            font-size: toRem(12);
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
            font-size: toRem(12);
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
            font-size: toRem(14);
            margin-bottom: toRem(10);
        }
        .content-text {
            margin-bottom: toRem(15);
            color: #666;
            font-size: toRem(14);
            text-align: justify;
        }
    }
    .content-preview {
        display: flex;
        padding: 0 toRem(18);
        align-items: center;
        justify-content: space-around;
        max-height: toRem(180);
        overflow: hidden;
        .preview-img {
            display: inline-block;
            width: 100%;
            border-width: 0 toRem(5);
            border-style: solid;
            border-color: transparent;
        }
        &.content-preview-1 {
            .preview-img {
                border: none;
            }
        }
        &.content-preview-2 {
            .preview-img {
                width: 50%;
                &:nth-child(1) {
                    border-width: 0 toRem(5) 0 0;
                }
                &:nth-child(2) {
                    border-width: 0 0 0 toRem(5);
                }
            }
        }
        &.content-preview-3 {
            .preview-img {
                width: 33.33%;
                &:nth-child(1) {
                    border-width: 0 toRem(6.6) 0 0;
                }
                &:nth-child(2) {
                    border-width: 0 toRem(3.3);
                }
                &:nth-child(3) {
                    border-width: 0 0 0 toRem(6.6);
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
}
</style>
