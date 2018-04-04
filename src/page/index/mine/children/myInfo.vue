<template>
    <div id="myInfo">
        <div class="avatar">
            <img class="avatar-img" src="~@/assets/img/avatar.jpg">
            <div class="avatar-label">点击图标，更换头像</div>
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
    background: #F5F5F5;
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
}
</style>
