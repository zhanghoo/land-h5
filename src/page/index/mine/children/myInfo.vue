<template>
    <div id="myInfo">
        <div class="avatar">
            <img class="avatar-img" src="~@/assets/img/avatar.jpg">
            <div class="avatar-label">点击图标，更换头像</div>
        </div>
        <div class="username">
            <div class="icon my-icon-name" ></div>
            <span class="text">昵称</span>
            <input class="input" type="text" name="" value="曹万贯">
        </div>
        <div class="button">
            <mt-button>确认修改</mt-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'myInfo',
    data() {
        return {

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
#myInfo {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 200;
    background: $appBg;
    .avatar{
        margin-top: toRem(20);
        .avatar-img{
            display: block;
            width: toRem(70);
            height: toRem(70);
            border-radius: 100%;
            margin: 0 auto toRem(12);
        }
        .avatar-label{
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
        ver
        .icon {
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
