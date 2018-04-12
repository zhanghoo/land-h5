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
                </div>
                <input id="upload" type="file" accept="image/*" multiple=“multiple” @change="upload($event)">
                <label class="upload-btn my-icon-add1" for="upload" v-if="!(picture_preview.length >=3)"></label>
            </div>
            <div class=publish-voice>
                <i class="my-icon-maikefengxianxing"></i>
                发表语音信息
            </div>
        </div>
        <div class=publish-charge>
            <i class="my-icon-renminbi3"></i>
            <span>收费查看</span>
            <div class="charge-btn">
                <input type="checkbox" v-model="chargeVisible">
            </div>
        </div>
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
import { postPublish } from '@/api/moment'
export default {
    name: 'publish',
    data() {
        return {
            chargeVisible: false,
            moneyBtnList: [50, 100, 200, 300],
            moneyActive: 50,
            title: '',
            content: '',
            pictureFile: [],
            picture_preview: []
        }
    },
    methods: {
        upload(ev) {
            let picture = Array.from(ev.target.files)
            let emptyNum = 3 - this.picture_preview.length
            picture = picture.slice(0, emptyNum)
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
            let params = {
                pid: this.$route.query.pid || '',
                uid: this.$store.state.user.user_id,
                title: this.title,
                text: this.content,
                is_pay: this.chargeVisible ? 1 : 0,
                money: this.chargeVisible ? this.moneyActive : 0,
                images: this.pictureFile
            }
            postPublish(params).then(res => {
                console.log(res)
            })
        }
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
            flex-wrap: wrap;
            .picture_preview {
                position: relative;
                width: toRem(55);
                height: toRem(55);
                border: 1px solid #e0e0e0;
                border-radius: toRem(5);
                overflow: hidden;
                margin-right: toRem(12);
                margin-bottom: toRem(10);
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
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
            }
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
                margin-bottom: toRem(10);
            }
        }
        .publish-voice {
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
