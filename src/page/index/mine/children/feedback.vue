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
            content: ''
        }
    },
    methods: {
        postFeddBackContent() {
            if (!this.content) {
                this.$toast('请填写反馈信息')
            } else {
                postFeedBack(this.content).then(res => {
                    if (res) {
                        this.$toast('提交成功')
                    }
                })
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
