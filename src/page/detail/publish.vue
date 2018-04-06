<template>
    <div id="publish">
        <div class="publish-wrapper">
            <mt-field class="publish-title" placeholder="拟个标题吧" v-model="title"></mt-field>
            <mt-field class="publish-content" placeholder="分享点好东西..." type="textarea" rows="3" v-model="content"></mt-field>
            <div class="publish-upload">
                <input id="upload" type="file" accept="image/*" capture="camera" @change="upload($event)">
                <label class="upload-btn" for="upload">+</label>
            </div>
            <div class=piblish-voice>
                <i class="my-icon-add"></i>
                发表语音信息
            </div>
        </div>
        <div class=piblish-charge>
        </div>
        <div class="publish-btn">
            <mt-button class="btn-confirm" type="primary">提交</mt-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'publish',
    data() {
        return {
            title: '',
            content: ''
        }
    },
    computed: {

    },
    methods: {

    },
    mounted() {

    }
}
</script>
<style lang='stylus'>
#publish {
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
                font-size: toRem(13);
                textarea::placeholder {
                    color: #ccc;
                }
            }
        }
        .publish-upload {
            display: flex;
            align-items: center;
            padding-bottom: toRem(15);
            #upload {
                display: none;
            }
            .upload-btn {
                color: #e0e0e0;
                width: toRem(55);
                height: toRem(55);
                font-size: toRem(27.5);
                text-align: center;
                padding: toRem(13.5);
                border: 1px solid #e0e0e0;
                border-radius: toRem(5);
            }
        }
        .piblish-voice {
            display: flex;
            align-items: center;
            color: #333;
            font-size: toRem(13);
            padding: toRem(15) 0;
            border-1px-top(#e6e6e6);
            i {
                color: #666;
                margin-right: toRem(5);
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
