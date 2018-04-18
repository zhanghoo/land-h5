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
            username: ''
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
            if (!this.avatar) {
                this.$toast('请上传头像')
            } else if (!this.username) {
                this.$toast('昵称不能为空')
            } else {
                let params = {
                    userid: this.mine.user_id,
                    username: this.username,
                    avatar: this.avatar
                }
                console.log(params)
                postUserInfo(params).then(res => {
                    if (res && (res.Code === 0 || res.data.Code === 0)) {
                        this.$toast('修改成功')
                    }
                })
            }
        }
    },
    mounted() {
        this.avatar_preview = this.mine.avatar
        this.username = this.mine.nick_name
    }
}
</script>
<style lang='stylus'>
#myInfo {
    position: absolute;
    width: 100%;
    height: 100vh;
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
                display: block;
                width: 100%;
                height: 100%;
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
    .username {
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
        }
        .text {
            margin-left: toRem(6);
            color: #333;
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
