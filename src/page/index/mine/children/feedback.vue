<template>
    <div id="feedback">
        <mt-field placeholder="请输入您想反馈的内容" type="textarea" rows="6" v-model="content"></mt-field>
        <div class="button">
            <mt-button @click="postFeddBackContent">提交</mt-button>
        </div>
    </div>
</template>
<script>
import { postFeedBack } from '@/api/mine'
export default {
    name: 'feedback',
    data() {
        return {
            content: '',
            clickFlag: false
        }
    },
    methods: {
        postFeddBackContent() {
            let _self = this
            if (!this.clickFlag) {
                if (!_self.content) {
                    _self.$toast('请填写反馈信息')
                } else {
                    this.clickFlag = true
                    postFeedBack(_self.content).then(res => {
                        if (res && res.Code === 0) {
                            _self.$toast('提交成功')
                            setTimeout(function() {
                                _self.$router.go(-1)
                                _self.clickFlag = false
                            }, 500)
                        } else {
                            _self.clickFlag = false
                            _self.$toast(res.Msg)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        // 上传失败 可再次点击
                        this.clickFlag = false
                    })
                }
            } else {
                this.$toast('请勿重复点击提交')
            }
        }
    }
}
</script>
<style lang='stylus'>
#feedback {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 200;
    background: $appBg;
    .mint-cell-wrapper {
        padding: 0 toRem(17);
        .mint-cell-value {
            padding: toRem(17) 0;
            .mint-field-core {
                font-size: toRem(14);
            }
        }
    }
    .button {
        margin: toRem(250) toRem(18) 0 toRem(18);
        button {
            width: 100%;
            height: toRem(49);
            font-size: toRem(15);
            color: #fff;
            background: $appColor;
        }
    }
}
</style>
