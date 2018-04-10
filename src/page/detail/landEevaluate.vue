<template>
    <div id="landEevaluate">
        <div class="search">
            <div class="search-input-wrapper">
                <i class="my-icon-add"></i>
                <input class="search-input" type="search" placeholder="搜索地产名称">
            </div>
            <div class="search-btn">搜索</div>
        </div>
        <div class="select">
            <div class="select-action">
                <div class="action-item action-city">
                    <span>选择城市</span>
                    <i class="my-icon-jiantouxia"></i>
                </div>
                <div class="action-item action-type">
                    <span>选择类型</span>
                    <i class="my-icon-jiantoushang"></i>
                </div>
            </div>
            <div class="select-list">
                <div class="list-title">热门城市</div>
                <div class="list-wrapper">
                    <div class="list-item" v-for="(item, index) in 10" :key="index">北京</div>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="list-title">全平台投注均为
                <i class="my-icon-qianbi"></i>200/注</div>
            <div class="list-item" v-for="(item, index) in 3" :key="index">
                <div class="item-title">江干区（丁桥单元JG0405-12地块），杭州储出[2018] 4号地块</div>
                <div class="item-adress">
                    <i class="my-icon-adress"></i>浙江 杭州 江干</div>
                <div class="item-label">
                    <mt-button class="label" plain type="primary">挂牌</mt-button>
                    <mt-button class="label" plain type="primary">商用</mt-button>
                    <mt-button class="label" plain type="primary">460平方米</mt-button>
                </div>
            </div>
        </div>
        <div class="v-modal"></div>
    </div>
</template>
<script>
export default {
    name: 'landEevaluate',
    data() {
        return {
            searchKey: ''
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
#landEevaluate {
    .search {
        display: flex;
        align-items: center;
        font-size: toRem(12);
        padding: toRem(8) toRem(18);
        background: #fff;
        border-1px-bottom(#e6e6e6);
        .search-input-wrapper {
            display: flex;
            align-items: center;
            width: 84%;
            padding: toRem(10) toRem(12);
            background: #f5f5f5;
            border-radius: toRem(5);
            i {
                color: #ccc;
                margin-right: toRem(10);
            }
            .search-input {
                width: 100%;
                outline: none;
                appearance: none;
                border: 0;
                background: transparent;
                &::placeholder {
                    color: #ccc;
                }
            }
        }
        .search-btn {
            width: 16%;
            text-align: right;
            color: #333;
            padding: toRem(10) 0;
        }
    }
    .select {
        position: relative;
        background: #fff;
        margin-bottom: toRem(10);
        z-index: 300;
        .select-action {
            display: flex;
            height: toRem(50);
            padding: toRem(10) 0;
            border-1px-bottom(#e6e6e6);
            .action-item {
                width: 50%;
                padding: toRem(5) 0;
                text-align: center;
                color: #333;
                font-size: toRem(14);
                i {
                    display: inline-block;
                    font-size: toRem(12);
                    transform: scale(0.8);
                }
            }
            .action-city {
                border-1px-right(#e6e6e6);
            }
        }
        .select-list {
            position: absolute;
            top: toRem(50);
            left: 0;
            right: 0;
            padding: toRem(18);
            background: #f5f5f5;
            z-index: 300;
            .list-title {
                color: #999999;
                font-size: toRem(12);
                margin-bottom: toRem(12);
            }
            .list-wrapper {
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
                .list-item {
                    min-width: 32%;
                    max-width: 32%;
                    padding: toRem(14) 0;
                    text-align: center;
                    background: #fff;
                    color: #333;
                    font-size: toRem(14);
                    margin-bottom: toRem(10);
                }
            }
        }
    }
    .list {
        color: #333;
        background: #fff;
        .list-title {
            font-size: toRem(14);
            padding: toRem(15) toRem(18);
            border-1px-bottom(#e6e6e6);
        }
        .list-item {
            font-size: toRem(13);
            padding: toRem(15) toRem(18);
            border-1px-bottom(#e6e6e6);
            .item-title {
                line-height: 1.5;
            }
            .item-adress {
                margin: toRem(10) 0;
                i {
                    color: $appColor;
                    margin-right: toRem(5);
                }
            }
            .item-label {
                display: flex;
                align-items: center;
                > button {
                    margin-right: toRem(12);
                }
            }
        }
    }
}
</style>
