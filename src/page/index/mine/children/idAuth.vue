<template>
    <div id="idAuth">
        <!-- auth_status：1（已审核，我这里直接点击验证显示，成功的页面）； -->
        <div v-if="mine.auth_status === 1" class="authed">
            <div class="text">恭喜你！<br>已完成地产相关人士认证</div>
        </div>
        <template v-else>
            <p class="desc">地产行业相关人士身份验证成功后可获得
                <span class="icon my-icon-zuanshi"></span>
                <span class="num">1000</span>
            </p>
            <div class="idAuth-form">
                <mt-field class="form-title" placeholder="请填写所在公司" v-model="company"></mt-field>
                <div class="publish-upload">
                    <div class="upload-title">上传相关证明
                        <span>（证书、工牌等）</span>
                    </div>
                    <div class="upload-preview">
                        <div class="picture_preview" v-for="(item, index) in picture_preview" :key="index" v-if="item">
                            <img class="preview-img" :src="item">
                            <input class="preview-input" :id="`preview-${index}`" type="file" accept="image/*" @change="changePreview($event,index)">
                            <label class="preview-label" :for="`preview-${index}`"></label>
                            <span class="preview-close my-icon-baocuo" @click="deletePic(index)"></span>
                        </div>
                        <input id="upload" type="file" accept="image/*" multiple="multiple" @change="upload($event)">
                        <label class="upload-btn my-icon-add1" for="upload" v-if="!(picture_preview.length >=3)"></label>
                    </div>
                </div>
            </div>
            <div class="button">
                <mt-button @click="postIdAuth">提交</mt-button>
            </div>
        </template>
    </div>
</template>
<script>
import { postAuthValidate } from '@/api/mine'
import { mapState } from 'vuex'
export default {
    name: 'idAuth',
    data() {
        return {
            company: '',
            pictureFile: [],
            picture_preview: [],
            clickFlag: false
        }
    },
    computed: {
        ...mapState([
            'mine'
        ])
    },
    methods: {
        upload(ev) {
            let picture = Array.from(ev.target.files)
            if (picture.length <= 3) {
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
            // 0422 删除图片
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
        postIdAuth() {
            let _self = this
            if (!this.clickFlag) {
                if (!_self.company) {
                    _self.$toast('请填写公司名称')
                } else {
                    if (_self.mine.auth_status === 2) {
                        // auth_status：2（表示不能提交验证，已提交）
                        _self.$toast('申请已提交，请勿频繁操作')
                    } else {
                        this.clickFlag = true
                        // auth_status：3（表示可提交验证，未提交或者未审核通过可再提交验证的状态）
                        let params = {
                            company: _self.company,
                            file: _self.pictureFile
                        }
                        postAuthValidate(params).then(res => {
                            if (res.Code === 0) {
                                _self.$toast('申请提交成功')
                                _self.$store.commit('setAuthStatus', 2)
                                setTimeout(() => {
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
                }
            } else {
                this.$toast('请勿重复点击提交')
            }
        }
    }
}
</script>
<style lang='stylus'>
#idAuth {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 200;
    background: $appBg;
    .authed {
        .text {
            width: 100%;
            height: 100%;
            padding-top: toRem(255);
            text-align: center;
            color: #666;
            font-size: toRem(18);
            line-height: toRem(25);
        }
    }
    .desc {
        padding: toRem(15) toRem(18);
        font-size: toRem(14);
        line-height: 1;
        color: #666;
        .icon {
            font-size: toRem(13);
        }
        .num {
            color: $appColor;
        }
    }
    .idAuth-form {
        padding: 0 toRem(18);
        background: #fff;
        .form-title {
            border-1px-bottom(#e6e6e6);
            .mint-cell-wrapper {
                padding: 0;
            }
            input{
                font-size toRem(14)
                &::placeholder{
                    color #ccc
                }
            }
        }
        .publish-upload {
            padding: toRem(15) 0;
            .upload-title {
                color: #333;
                font-size: toRem(14);
                margin-bottom toRem(15)
                span {
                    color: #ccc;
                }
            }
            .upload-preview {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                .picture_preview {
                    position: relative;
                    width: toRem(55);
                    height: toRem(55);
                    border: 1px solid #e0e0e0;
                    border-radius: toRem(5);
                    margin-right: toRem(12);
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
                }
            }
        }
    }
    .button {
        margin: toRem(211) toRem(18) 0 toRem(18);
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
