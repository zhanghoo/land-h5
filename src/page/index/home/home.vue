<template>
    <div id="home">
        <router-link :to="{name: 'detail'}">跳转至详情页，方式1</router-link>
        <mt-button type="primary" @click="$router.push({name: 'detail'})">跳转至详情页，方式2</mt-button>
    </div>
</template>
<script>
export default {
    name: 'home',
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
#home {
}
</style>
