<template>
    <div id="index">
        <!-- 内容视口 -->
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <!-- 底部导航条 -->
        <nav-bar v-if="this.$route.name === 'home' || this.$route.name === 'moment' || this.$route.name === 'mine'"></nav-bar>
    </div>
</template>
<script>
import navBar from '@/layout/navBar'
export default {
    name: 'index',
    components: { navBar },
    watch: {
        $route(val) {
            // console.log(this.$route.name)
        }
    }
}
</script>
<style lang='stylus'>
#index {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-bottom: toRem(52);
}
</style>
