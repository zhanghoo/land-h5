<template>
    <div id="index">
        <!-- 内容视口 -->
        <keep-alive include="moment">
            <router-view></router-view>
        </keep-alive>
        <!-- 底部导航条 -->
        <nav-bar></nav-bar>
    </div>
</template>
<script>
import navBar from '@/layout/navBar'
export default {
    name: 'index',
    components: { navBar }
}
</script>
<style lang='stylus'>
#index {
    position: relative;
    padding-bottom: toRem(56);
}
</style>
