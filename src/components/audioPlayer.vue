<template>
    <div @click="clickAudio" class="audio-palyer">
        <span class="audio-caret-box">
            <i class="audio-caret-b"></i>
            <i class="audio-caret-t"></i>
        </span>
        <span class="audio-icon my-icon-31shengbo"></span>
        <span class="audio-duration">{{showTip}}</span>
        <audio ref="audioCtrl" class="audio-ctrl" :src="`http://${audioSrc}`" preload></audio>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'audioPalyer',
    props: {
        audioSrc: {
            type: String
        },
        audioCId: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            duration: 0, // 总时长
            currentTime: 0, // 当前播放的时间
            audio: null
        }
    },
    computed: {
        ...mapState([
            'playingAudioCId'
        ]),
        audioWidth() {
            // 默认最小宽度20 微信语音最长时长为 60s
            let t = `${20 + this.duration}%`
            return t
        },
        leftTime() {
            // 剩余播放的时间
            let t = this.duration - this.currentTime
            return t
        },
        showTime() {
            // 播放显示的时间 如果是暂停 且剩余时长为0 即初始状态
            // 如果 this.audio 存在
            // 暂停状态 且 剩余时间 为0 即播放完毕显示总时长, 否则 如果 总时长 = 当前播放时间, 即播放完毕显示总时长, 否则显示当前播放的而时间
            // audio 不存在 直接显示 0
            // 安卓 和 pc 都 OK ios 初始无法得到 duration
            let t = this.audio ? this.audio.paused && this.leftTime === 0 ? this.duration : this.duration === this.currentTime ? this.duration : this.leftTime
            : 0
            return t
        },
        showTip() {
            let tip = '点击播放'
            if (this.audio) {
                if (this.duration !== this.currentTime) {
                    if (!this.audio.paused) {
                        tip = this.leftTime
                    } else {
                        tip = '点击播放'
                    }
                } else {
                    tip = '点击播放'
                }
            } else {
                tip = '点击播放'
            }
            tip = tip === '点击播放' ? tip : `${tip}''`
            return tip
        }
    },
    watch: {
        playingAudioCId() {
            const self = this
            if (self.audio) {
                if (self.playingAudioCId === self.audioCId) {
                    self.audio.play()
                } else {
                    // 重新加载
                    this.duration = 0
                    this.currentTime = 0
                    self.audio.load()
                }
            }
        }
    },
    methods: {
        clickAudio() {
            const self = this
            if (self.audio.paused) {
                self.audio.play()
                this.$store.commit('setPlayingAudioCId', self.audioCId)
            } else {
                self.audio.pause()
            }
        },
        addEventListeners() {
            const self = this
            self.$refs.audioCtrl.addEventListener('timeupdate', self._currentTime)
            self.$refs.audioCtrl.addEventListener('canplay', self._durationTime)
        },
        removeEventListeners() {
            const self = this
            self.$refs.audioCtrl.removeEventListener('timeupdate', self._currentTime)
            self.$refs.audioCtrl.removeEventListener('canplay', self._durationTime)
        },
        _currentTime() {
            const self = this
            self.currentTime = parseInt(self.$refs.audioCtrl.currentTime)
        },
        _durationTime() {
            const self = this
            self.duration = parseInt(self.$refs.audioCtrl.duration)
        }
    },
    mounted() {
        let self = this
        self.audio = self.$refs.audioCtrl
        self.addEventListeners()
        // console.log(self.audioCId)
    },
    beforeDestroyed() {
        this.removeEventListeners()
    }
}
</script>
<style lang='stylus'>
.audio-palyer {
    position: relative;
    display: inline-block;
    top: 0;
    left: toRem(4);
    padding: 0 toRem(10);
    width: 35%;
    height: toRem(28);
    line-height: toRem(28);
    background: $appBg;
    border-radius: toRem(6);
    border: toRem(0.5) solid #ccc;
    color: #888;
    font-size: toRem(14);
    .audio-caret-box {
        position: absolute;
        top: toRem(0);
        left: toRem(-3.5);
        width: toRem(4);
        height: 100%;
        z-index: 10;
        .audio-caret-b {
            position: absolute;
            display: inline-block;
            top: 50%;
            left: toRem(-0.5);
            margin-top: toRem(-4);
            width: 0;
            height: 0;
            vertical-align: middle;
            border-right: toRem(4) solid #ccc;
            border-top: toRem(4) solid transparent;
            border-bottom: toRem(4) solid transparent;
        }
        .audio-caret-t {
            position: absolute;
            display: inline-block;
            top: 50%;
            left: 0;
            margin-top: toRem(-4);
            width: 0;
            height: 0;
            vertical-align: middle;
            border-right: toRem(4) solid $appBg;
            border-top: toRem(4) solid transparent;
            border-bottom: toRem(4) solid transparent;
        }
    }
}
</style>
