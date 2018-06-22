<template>
    <div id="publish">
        <div class="publish-wrapper">
            <mt-field class="publish-title" placeholder="拟个标题吧" v-model="title"></mt-field>
            <mt-field class="publish-content" placeholder="分享点好东西..." type="textarea" rows="3" v-model="content"></mt-field>
            <div class="publish-upload">
                <div class="picture_preview" v-for="(item, index) in picture_preview" :key="index" v-if="item">
                    <img class="preview-img" :src="item">
                    <input class="preview-input" :id="`preview-${index}`" type="file" accept="image/*" @change="changePreview($event,index)">
                    <label class="preview-label" :for="`preview-${index}`"></label>
                    <span class="preview-close my-icon-baocuo" @click="deletePic(index)"></span>
                </div>
                <input id="upload" type="file" accept="image/*" multiple="multiple" @change="upload($event)">
                <label class="upload-btn my-icon-add1" for="upload" v-if="!(picture_preview.length >=3)"></label>
                <!-- <label class="upload-btn my-icon-add1" for="upload"></label> -->
            </div>
            <div class="publish-voice">
                <span class="publish-voice-btn" @click="record">
                    <i class="icon-voice my-icon-maikefengxianxing"></i>
                    <i>{{voiceTip}}</i>
                </span>
            </div>
        </div>
        <!-- 排名前18%的用户发布动态可设置收费查看。
             v8 排名18%-22%   地产大师五级-->
        <template v-if="showRecharge">
            <div class=publish-charge>
                <i class="my-icon-renminbi3"></i>
                <span>收费查看</span>
                <div class="charge-btn">
                    <input type="checkbox" v-model="chargeVisible">
                </div>
            </div>
        </template>
        <div class="charge-list" v-if="chargeVisible">
            <div class="list-label">大师币：
                <span class="label-numer">{{moneyActive}}</span>
            </div>
            <div class="list-money">
                <span class="money-btn" v-for="(item, index) in moneyBtnList" :key="index" :class="{'active': item === moneyActive}" @click="moneyActive = item">{{item}}</span>
            </div>
        </div>
        <div class="publish-btn">
            <mt-button class="btn-confirm" type="primary" @click="publish">提交</mt-button>
        </div>
    </div>
</template>
<script>
import { postPublish, getCommentLevel, getPublishMoneyOptions } from '@/api/moment'
import { trim } from '@/utils/utils'
import { mapState } from 'vuex'
export default {
    name: 'publish',
    data() {
        return {
            chargeVisible: false,
            moneyBtnList: [],
            moneyActive: 50,
            title: '',
            content: '',
            pictureFile: [],
            picture_preview: [],
            voiceTip: '发表语音信息',
            voiceFlag: false, // 录音状态
            localId: '',
            serverId: '',
            recordStep: 0, // 录音操作 0 开始录音 1 结束录音
            showRecharge: false,
            type: '',
            publishClick: false,
            voiceClick: false
        }
    },
    computed: {
        ...mapState([
            'mine'
        ]),
        isWeiXin() {
            // 判断是否是微信
            let ua = window.navigator.userAgent.toLowerCase()
            // 如果匹配到了 则 用匹配到的返回数组第一项再次 判断
            let wx = ua.match(/MicroMessenger/i)
                    ? ua.match(/MicroMessenger/i)[0] === 'micromessenger' ? 1 : 0
                    : 0
            return wx
        }
    },
    methods: {
        upload(ev) {
            let picture = Array.from(ev.target.files)
            if (picture.length <= 3) {
                // 一次选择超过3张事
                let emptyNum = 3 - this.picture_preview.length
                picture = picture.slice(0, emptyNum)
                if (this.picture_preview.length < 3) {
                    for (let i = 0; i < picture.length; i++) {
                        if (picture[i]) {
                            let reader = new FileReader()
                            reader.readAsDataURL(picture[i])
                            reader.onload = (e) => {
                                this.picture_preview.unshift(e.target.result)
                                this.pictureFile.unshift(ev.target.files[i])
                            }
                        }
                    }
                } else {
                    this.$toast('最多只能选择3张图片')
                }
            } else {
                this.$toast('最多只能选择3张图片，请重新选择')
            }
        },
        deletePic(index) {
            // 0421 删除图片
            this.$delete(this.picture_preview, index)
            this.$delete(this.pictureFile, index)
        },
        changePreview(ev, index) {
            let img = ev.target.files[0]
            let reader = new FileReader()
            reader.readAsDataURL(img)
            reader.onload = (e) => {
                this.$set(this.picture_preview, index, e.target.result)
            }
        },
        publish() {
            let _self = this
            if (!_self.publishClick) {
                if (_self.isWeiXin) {
                    // alert('isWeiXin')
                    // 微信端
                    // 如果正在录音 提示停止录音后再发布
                    if (_self.recordStep === 1) {
                        _self.$toast('请停止录音后再发布')
                    } else {
                        if (_self.localId) {
                            // alert('localId = ' + _self.localId)
                            // 如果 localId 存在 获取微信端 serverId
                                wx.uploadVoice({
                                    localId: _self.localId,
                                    success: function (res) {
                                        _self.serverId = res.serverId
                                        // alert('上传语音成功，serverId 为' + _self.serverId)
                                        // 获得serverId
                                        _self._postPublish()
                                    }
                                })
                        } else {
                            // 不存在 直接上传
                            _self._postPublish()
                        }
                    }
                } else {
                    // alert('非微信')
                    // 其他端测试用
                    _self._postPublish()
                }
            } else {
                // _self.publishClick = false
                _self.$toast('请勿重复点击提交')
            }
        },
        _publishVerify() {
            // 发布校验
            let _self = this
            let t = false
            // console.log(trim(_self.title).length)
            if (trim(_self.title)) {
                if (trim(_self.title).length <= 64) {
                    if (trim(_self.content)) {
                        if (_self.localId !== '') {
                            // 如果点击了录音, 则必须停止, 否则提示
                            // 注意不是两个都不为空, localId 可以为空, 即没有点击录音
                            // if (_self.serverId !== '') {
                            // 20180527: 不是用serverId 而是用 recordStep 判断
                            if (_self.recordStep === 1) {
                                _self.$toast('请停止录音后再发布')
                            } else {
                                t = true
                            }
                        } else {
                            t = true
                        }
                    } else {
                        _self.$toast('请输入内容')
                    }
                } else {
                    _self.$toast('标题字符不能超过64个字符')
                }
            } else {
                _self.$toast('请输入标题')
            }
            return t
        },
        _postPublish() {
            let _self = this
            if (_self._publishVerify()) {
                // 在检验通过之后设置不能点击, 即此时已可提交
                _self.publishClick = true

                // 房产id为空传0
                let params = {
                    pid: _self.$route.query.pid || 0,
                    uid: _self.$store.state.mine.user_id,
                    title: _self.title,
                    text: this.contentFormatter(_self.content),
                    is_pay: _self.chargeVisible ? 1 : 0,
                    money: _self.chargeVisible ? _self.moneyActive : 0,
                    images: _self.pictureFile,
                    voice_id: _self.serverId
                }
                // console.log(params)
                // alert('发布动态传params的voice_id = ' + params.voice_id + ' 本地获得的serverId = ' + _self.serverId)
                // console.log(params)
                postPublish(params).then(res => {
                    // console.log(typeof (res.Code)) -> string
                    if (res.Code === '0') {
                        this.$toast('发布成功')
                        if (!this.$route.query.pid) {
                            // 操作为发布动态时, 成功 3s 跳转到回动态页面
                            setTimeout(function() {
                                _self.$router.push({name: 'moment', params: {'json': res.Data}})
                                _self.publishClick = false
                            }, 500)
                        } else {
                            _self.$router.go(-1)
                        }
                    } else {
                        _self.publishClick = false
                        this.$toast(res.Msg)
                    }
                })
                .catch(err => {
                    console.log(err)
                    // 上传失败 可再次点击
                    _self.publishClick = false
                })
            }
        },
        record() {
            var _self = this
            // let _setT = null
            if (_self.isWeiXin) {
                if (_self.recordStep === 0) {
                    if (!_self.voiceClick) {
                        _self.voiceClick = true
                        // 开始录音
                        wx.startRecord({
                            cancel() {
                                _self.recordStep = 0
                                _self.voiceClick = false
                                _self.voiceTip = '您已拒绝授权录音，无法为您录音'
                            },
                            success() {
                                setTimeout(() => {
                                    _self.recordStep = 1
                                    _self.voiceClick = false
                                }, 5000)
                                _self.voiceTip = '正在录音...5秒后可再次点击停止录音或将在1分钟后自动停止录音'
                            }
                        })
                        // 相当下面的setTimeout函数
                        wx.onVoiceRecordEnd({
                            // 录音时间超过一分钟没有停止的时候会执行 complete 回调
                            complete(res) {
                                _self.localId = res.localId
                                // alert('onVoiceRecordEnd, localId = ' + _self.localId)
                                _self.recordStep = 2
                                _self.voiceClick = false
                                _self.voiceTip = '已停止录音，再次点击可试听录音'
                            }
                        })
                    } else {
                        _self.$toast('正在录音，请勿重复点击')
                    }
                } else if (_self.recordStep === 1) {
                    // 停止录音
                    wx.stopRecord({
                        success(res) {
                            _self.localId = res.localId
                            // alert('stopRecord, localId = ' + _self.localId)
                            _self.recordStep = 2
                            _self.voiceTip = '已停止录音，再次点击可试听录音'
                        },
                        fail(res) {
                            alert(JSON.stringify(res))
                        }
                    })
                } else if (_self.recordStep === 2) {
                    // 试听录音
                    wx.playVoice({
                        localId: _self.localId
                    })
                    // alert('playVoice, localId = ' + _self.localId)
                    _self.recordStep = 3
                    _self.voiceTip = '正在播放，再次点击可停止播放'
                    wx.onVoicePlayEnd({
                        complete(res) {
                            // alert('onVoicePlayEnd, localId = ' + _self.localId)
                            _self.recordStep = 0
                            _self.voiceTip = '播放完毕，再次点击可重新录音'
                        }
                    })
                } else if (_self.recordStep === 3) {
                    // 停止录音
                    wx.stopVoice({
                        localId: _self.localId
                    })
                    // alert('stopVoice, localId = ' + _self.localId)
                    _self.recordStep = 0
                    _self.voiceTip = '停止播放，再次点击可重新录音'
                }
            } else {
                // clearTimeout(_setT)
                // if (_self.recordStep === 0) {
                //     // 开始录音
                //     _self.recordStep = 1
                //     _self.voiceTip = '正在录音...再次点击停止录音或将在1分钟后自动停止录音'
                //     _setT = setTimeout(function() {
                //         if (_self.recordStep === 1) {
                //             // 处在录音状态才能停止录音
                //             _self.recordStep = 2
                //             _self.voiceTip = '已停止录音，再次点击可试听录音'
                //         }
                //     }, 6000)
                // } else if (_self.recordStep === 1) {
                //     clearTimeout(_setT)
                //     // 停止录音
                //     _self.recordStep = 2
                //     _self.voiceTip = '已停止录音，再次点击可试听录音'
                // } else if (_self.recordStep === 2) {
                //     // 播放录音
                //     _self.recordStep = 3
                //     _self.voiceTip = '正在播放，再次点击可停止播放'
                // } else if (_self.recordStep === 3) {
                //     // 停止播放
                //     _self.recordStep = 0
                //     _self.voiceTip = '停止播放，再次点击可重新录音'
                // }
            }
        },
        get_CommentLevel() {
            getCommentLevel(this.mine.user_id).then(res => {
                // 排名前18%的用户发布动态可设置收费查看。
                // v8 排名18%-22%   地产大师五级
                if (res && res.Data && res.Data) {
                    // this.showRecharge = true
                    if (res.Data.level >= 8) {
                        this.showRecharge = true
                    } else {
                        this.showRecharge = false
                    }
                }
            })
        },
        contentFormatter(val) {
            let result = val
            result = result.replace(/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g, '<a href="$&">$&</a>') // 超链接
            result = result.replace(/\r|\n/g, '<br/>') // 换行
            return result
        }
    },
    mounted() {
        this.get_CommentLevel()
        getPublishMoneyOptions().then(res => {
            // console.log(res)
            this.moneyBtnList = res.Data
            // 默认选择第一个
            this.moneyActive = this.moneyBtnList[0]
        })
        this.type = this.$route.query.type
    }
}
</script>
<style lang='stylus'>
#publish {
    color: #333;
    font-size: toRem(14);
    .mint-field {
        .mint-cell-wrapper {
            padding: 0;
        }
        .mint-cell-value {
            padding: 0;
        }
    }
    .publish-wrapper {
        background: #fff;
        padding: 0 toRem(18);
        .publish-title {
            .mint-cell-wrapper {
                font-size: toRem(15);
                border-1px-bottom(#e6e6e6);
                input::placeholder {
                    color: #999;
                }
            }
        }
        .publish-content {
            padding: toRem(15) 0;
            .mint-cell-wrapper {
                font-size: toRem(15);
                textarea::placeholder {
                    color: #ccc;
                }
            }
        }
        .publish-upload {
            display: flex;
            align-items: center;
            padding-bottom: toRem(15);
            flex-wrap: wrap;
            .picture_preview {
                position: relative;
                width: toRem(55);
                height: toRem(55);
                border: 1px solid #e0e0e0;
                border-radius: toRem(5);
                margin-right: toRem(12);
                margin-bottom: toRem(10);
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    border-radius: toRem(5);
                }
                .preview-input {
                    display: none;
                }
                .preview-label {
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    background: transparent;
                    z-index: 10;
                }
                .preview-close {
                    display: block;
                    position: absolute;
                    top: toRem(-8);
                    right: toRem(-8);
                    width: toRem(16);
                    height: toRem(16);
                    line-height: toRem(16);
                    font-size: toRem(14);
                    text-align: center;
                    opacity: 0.7;
                }
            }
            #upload {
                display: none;
            }
            .upload-btn {
                display: block;
                color: #e0e0e0;
                width: toRem(55);
                height: toRem(55);
                line-height: toRem(55);
                font-size: toRem(27.5);
                text-align: center;
                border: 1px solid #e0e0e0;
                border-radius: toRem(5);
                margin-bottom: toRem(10);
            }
        }
        .publish-voice {
            border-1px-top(#e6e6e6);
            .publish-voice-btn {
                display: flex;
                align-items: center;
                color: #333;
                font-size: toRem(15);
                i {
                    color: #666;
                    font-style: normal;
                }
                .icon-voice {
                    display: inline-block;
                    padding: toRem(15) toRem(5) toRem(15) 0;
                    font-size: toRem(18);
                }
            }
        }
    }
    .publish-charge {
        display: flex;
        align-items: center;
        color: #333;
        font-size: toRem(13);
        background: #fff;
        padding: toRem(15) toRem(18);
        margin-top: toRem(10);
        i {
            color: #666;
            margin-right: toRem(5);
            margin-top: toRem(2);
        }
        .charge-btn {
            margin-left: auto;
        }
    }
    .charge-list {
        padding: toRem(12) toRem(18);
        background: #fff;
        border-1px-top(#e6e6e6);
        .list-label {
            display: flex;
            align-items: center;
            margin: toRem(8) 0 toRem(15);
            .label-numer {
                color: $appColor;
            }
        }
        .list-money {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .money-btn {
                min-width: 82px;
                color: #666;
                text-align: center;
                padding: toRem(10) toRem(26);
                margin-right: toRem(4);
                border: 1px solid #e6e6e6;
                border-radius: toRem(5);
                &:last-child {
                    margin: 0;
                }
                &.active {
                    color: #fff;
                    background: $appColor;
                }
            }
        }
    }
    .publish-btn {
        margin-top: toRem(38);
        padding: 0 toRem(18);
        .btn-confirm {
            display: block;
            width: 100%;
            color: #fff;
            font-size: toRem(15);
            background: $appColor;
        }
    }
}
</style>
