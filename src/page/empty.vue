<template>
    <div id="empty">
        <div class="tip">用户已被封禁<br>请联系管理员</div>
    </div>
</template>
<script>
export default {
    name: 'empty',
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
#empty {
    .tip {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        transform: translateY(-50%);
        text-align: center;
    }
}
</style>
