<template>
    <nav id="navBar">
        <ul class="nav">
            <li class='nav-item'>
                <router-link class="nav-item-route" :to="{name: 'moment'}">
                    <div class="nav-item-icon">

                    </div>
                    <div class="nav-item-label">动态</div>
                </router-link>
            </li>
            <li class='nav-item'>
                <router-link class="nav-item-route" :to="{name: 'home'}">
                    <div class="nav-item-icon">

                    </div>
                    <div class="nav-item-label">地产大师</div>
                </router-link>
            </li>
            <li class='nav-item'>
                <router-link class="nav-item-route" :to="{name: 'mine'}">
                    <div class="nav-item-icon">

                    </div>
                    <div class="nav-item-label">我的</div>
                </router-link>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    name: 'navBar'
}
</script>
<style lang='stylus'>
#navBar {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    .nav {
        display: flex;
        align-items: center;
        user-select: none;
        background-color: #fff;
        .nav-item {
            text-align: center;
            flex: 1;
            padding: toRem(8) 0;
            .nav-item-route {
                display: block;
                color: #999;
                &.router-link-active {
                    color: $appColor;
                }
                .nav-item-icon {
                    width: toRem(24);
                    height: toRem(24);
                    margin: 0 auto toRem(4);
                    img {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                .nav-item-label {
                    font-size: toRem(12);
                    color: inherit;
                    line-height: 1;
                }
            }
        }
    }
}
</style>
