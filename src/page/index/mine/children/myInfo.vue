<template>
    <div id="myInfo">
        <div class="avatar">
            <div class="avatar-wrapper">
                <img class="avatar-img" v-if="mine.avatar" :src="avatar_preview">
                <input id="upload" type="file" accept="image/*" @change="upload($event)" style="display: none;">
                <label class="upload-btn" for="upload"></label>
            </div>
            <div class="avatar-label">点击图标，更换头像</div>
        </div>
        <div class="username">
            <div class="icon my-icon-name"></div>
            <span class="text">昵称</span>
            <input class="input" type="text" v-model="username">
        </div>
        <!-- 0420反馈新增手机号 -->
        <div class="phone">
            <div class="icon my-icon-phone"></div>
            <span class="text">手机号码</span>
            <input class="input" type="tel" maxlength="11" v-model="phone">
        </div>
        <div class="button">
            <mt-button @click="changeUserInfo">确认修改</mt-button>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { postUserInfo } from '@/api/mine'
export default {
    name: 'myInfo',
    data() {
        return {
            avatar_preview: '',
            avatar: '',
            username: '',
            phone: '',
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
            this.avatar = ev.target.files[0]
            var reader = new FileReader()
            reader.readAsDataURL(this.avatar)
            reader.onload = (e) => {
                this.avatar_preview = e.target.result
            }
        },
        changeUserInfo() {
            if (!this.clickFlag) {
                // 0425反馈修改 头像、昵称、手机号可以分开修改
                if (!this.username) {
                    this.$toast('昵称不能为空')
                } else if (this.username.length < 2) {
                    this.$toast('昵称长度不能少于2个字符')
                } else if (this.username.length > 8) {
                    this.$toast('昵称长度不能大于16个字符')
                } else if (!this.phone) {
                    this.$toast('手机号码不能为空')
                } else if (this.phone.length !== 11 || !(/^(1[3,4,5,6,7,8,9])\d{9}$/.test(this.phone))) {
                    this.$toast('请填写正确的手机号码！')
                } else if (!this.avatar && this.username === this.mine.nick_name && this.phone === this.mine.phone) {
                    this.$toast('请至少修改一项后再提交')
                } else {
                    this.clickFlag = true
                    let params = {
                        userid: this.mine.user_id,
                        username: this.username,
                        phone: this.phone,
                        avatar: this.avatar
                    }
                    postUserInfo(params).then(res => {
                        let _self = this
                        if (res && (res.Code === 0 || res.data.Code === 0)) {
                            _self.$toast('修改成功')
                            setTimeout(function() {
                                // location.reload()
                                _self.$router.push({ path: '/index/mine' })
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
    },
    mounted() {
        this.avatar_preview = this.mine.avatar
        this.username = this.mine.nick_name
        this.phone = this.mine.phone
    }
}
</script>
<style lang='stylus'>
#myInfo {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 200;
    background: $appBg;
    .avatar {
        margin-top: toRem(20);
        .avatar-wrapper {
            position: relative;
            display: block;
            width: toRem(70);
            height: toRem(70);
            border-radius: 100%;
            overflow: hidden;
            margin: 0 auto toRem(12);
            .avatar-img {
                position: absolute;
                top: 50%;
                left: 0;
                display: block;
                width: 100%;
                transform: translateY(-50%);
            }
            label {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
            }
        }
        .avatar-label {
            font-size: toRem(12);
            color: #999;
            text-align: center;
        }
    }
    .username,
    .phone {
        display: flex;
        align-items: center;
        margin: toRem(20) toRem(18);
        height: toRem(49);
        border: 1px solid #e6e6e6;
        border-radius: toRem(3);
        background: $panelBg;
        font-size: toRem(14);
        ver, .icon {
            margin-left: toRem(18);
            font-size: toRem(16);
            color: #666;
        }
        .text {
            margin-left: toRem(6);
            color: #666;
        }
        .input {
            flex: 1;
            margin-left: toRem(12);
            padding-right: toRem(18);
            border: none;
            outline: none;
        }
    }
    .button {
        margin: toRem(135) toRem(18) 0 toRem(18);
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
