<template>
    <div id="landEevaluate">
        <div class="loadMore" v-infinite-scroll="getSearchDetail_more_data" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
            <div class="search">
                <div class="search-input-wrapper">
                    <i class="my-icon-search my-icon-sousuosearch82"></i>
                    <form @submit.prevent="getSearchDetail_data">
                        <input class="search-input" type="search" placeholder="搜索地产名称" v-model="keyWord">
                    </form>
                </div>
                <div class="search-btn" @click="getSearchDetail_data">搜索</div>
            </div>
            <div class="select">
                <div class="select-action">
                    <div class="action-item action-city" :class="{'active': selectType === 'city' && selectVisible === true}" @click="openSelectList('city')">
                        <span>{{citySelectedStr}}</span>
                        <i class="my-icon-jiantoushang" v-if="selectType === 'city' && selectVisible === true"></i>
                        <i class="my-icon-jiantouxia" v-else></i>
                    </div>
                    <div class="action-item action-type" :class="{'active': selectType === 'type' && selectVisible === true}" @click="openSelectList('type')">
                        <span>{{typeSelectedStr}}</span>
                        <i class="my-icon-jiantoushang" v-if="selectType === 'type' && selectVisible === true"></i>
                        <i class="my-icon-jiantouxia" v-else></i>
                    </div>
                </div>
                <div class="select-list" v-if="selectVisible">
                    <!-- city -->
                    <template v-if="selectType === 'city'">
                        <div class="list-title">热门城市</div>
                        <div class="list-wrapper">
                            <div class="list-item" :class="{ 'on' : citySelectedIndex === 0 }" @click="selected(0, '选择城市', 0)">全部</div>
                            <template v-for="(item, index) in hotList">
                                <div class="list-item" :class="{ 'on' : citySelectedIndex === index + 1 }" :key="index" @click="selected(item.id, item.city, index + 1)">{{item.city}}</div>
                            </template>
                        </div>
                    </template>
                    <!-- type -->
                    <template v-if="selectType === 'type'">
                        <div class="list-wrapper">
                            <div class="list-item" :class="{ 'on' : typeSelectedIndex === 0 }" @click="selected(2, '全部', 0)">全部</div>
                            <div class="list-item" :class="{ 'on' : typeSelectedIndex === 1 }" @click="selected(1, '地块', 1)">地块</div>
                            <div class="list-item" :class="{ 'on' : typeSelectedIndex === 2 }" @click="selected(0, '房产', 2)">房产</div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="list">
                <div class="list-title">全平台预估均为
                    <i class="my-icon-zuanshi"></i>100/次</div>
                <div class="list-item" v-for="(item, index) in landList" :key="index" @click="$router.push({path: '/landDetail', query: { 'pid': item.id}})">
                    <div class="item-title">{{item.name}}</div>
                    <div class="item-adress">
                        <i class="my-icon-adress"></i>{{item.province}}</div>
                    <div class="item-label">
                        <!-- 出售方式 sold_type -->
                        <mt-button class="label" plain type="primary">{{item.sold_type}}</mt-button>
                        <!-- 用途 purpose 1商住 2商办 3工业 -->
                        <mt-button class="label" plain type="primary">{{item.purpose | purposeToString}}</mt-button>
                        <!-- 面积 sold_area -->
                        <mt-button class="label" plain type="primary">{{item.sold_area}}平方米</mt-button>
                    </div>
                </div>
            </div>
            <!-- 底部提示 -->
            <div class="bottomLoad" v-if="landList.length > 5">
                <div class="loading" v-show="loading === true">加载中...</div>
                <div class="noData" v-if="loading === 'nothing'">没有更多了</div>
            </div>
        </div>
        <div class="v-modal" v-if="selectVisible" @click="selectVisible = false"></div>
    </div>
</template>
<script>
import { getSearchDetail } from '@/api'
import { getHotCity } from '@/api/home'
export default {
    name: 'landEevaluate',
    data() {
        return {
            keyWord: '',
            selectVisible: false,
            selectType: '',
            citySelected: 0,
            citySelectedStr: '选择城市',
            citySelectedIndex: 0,
            typeSelected: 2,
            typeSelectedStr: '选择类型',
            typeSelectedIndex: 0,
            landList: [],
            hotList: [],
            page: 1,
            bottomLock: false,
            loading: true
        }
    },
    filters: {
        purposeToString(val) {
            switch (val) {
                case '1':
                    return '商住'
                case '2':
                    return '商办'
                case '3':
                    return '工业'
            }
        }
    },
    watch: {
        $route(to, from) {
            if (from.name === 'home') {
                $('#landEevaluate').scrollTop(0)
                this.keyWord = ''
                this.selectVisible = false
                this.selectType = ''
                this.citySelected = 0
                this.citySelectedStr = '选择城市'
                this.citySelectedIndex = 0
                this.typeSelected = 2
                this.typeSelectedStr = '选择类型'
                this.typeSelectedIndex = 0
                this.landList = []
                this.hotList = []
                this.page = 1
                this.bottomLock = false
                this.loading = true
                this.getHotCity_date()
                this.getSearchDetail_data()
            }
        }
    },
    methods: {
        getHotCity_date() {
            getHotCity().then(res => {
                if (res && res.Data) {
                    this.hotList = res.Data
                }
            })
        },
        getSearchDetail_data() {
            // 全传0时 默认返回第一进入时所展示内容
            this.page = 1
            let params = {
                keyWord: this.keyWord || 0,
                cityID: this.citySelected,
                type: this.typeSelected,
                page: this.page
            }
            // console.log(params)
            getSearchDetail(params).then(res => {
                if (res && res.Data) {
                    this.landList = res.Data
                }
            })
        },
        getSearchDetail_more_data() {
            if (this.loading !== 'nothing') {
                let params = {
                    keyWord: this.keyWord || 0,
                    cityID: this.citySelected,
                    type: this.typeSelected,
                    page: this.page
                }
                this.loading = true
                this.bottomLock = true
                getSearchDetail(params).then(res => {
                    if (res && res.Data && res.Data.length > 0) {
                        this.landList.push(...res.Data)
                        this.page++
                        this.loading = false
                    } else {
                        this.loading = 'nothing'
                    }
                    this.bottomLock = false
                })
            }
        },
        openSelectList(val) {
            if (this.selectType === val) {
                this.selectVisible = !this.selectVisible
            } else {
                this.selectType = val
                this.selectVisible = true
            }
        },
        selected(item, str, index) {
            // item 用于传值
            // str 用于显示选择城市text
            // index 用于 on
            if (this.selectType === 'city') {
                this.citySelected = item
                this.citySelectedStr = str
                this.citySelectedIndex = index
            } else if (this.selectType === 'type') {
                this.typeSelected = item
                this.typeSelectedStr = str
                this.typeSelectedIndex = index
            }
            this.selectVisible = false
            this.getSearchDetail_data()
        }
    },
    mounted() {
        this.getHotCity_date()
        this.getSearchDetail_data()
    }
}
</script>
<style lang='stylus'>
#landEevaluate {
    position: relative;
    width: 100%;
    height: 100vh;
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
            height: toRem(38);
            line-height: toRem(38);
            padding: 0 toRem(12);
            background: #f5f5f5;
            border-radius: toRem(5);
            i {
                color: #ccc;
                margin-right: toRem(10);
                font-size: toRem(16);
                line-height: 1;
            }
            .search-input {
                width: 100%;
                outline: none;
                appearance: none;
                border: 0;
                background: transparent;
                font-size: toRem(14);
                height: toRem(38);
                line-height: toRem(14);
                padding: toRem(12) 0;
                vertical-align: bottom;
                &::placeholder {
                    color: #ccc;
                }
            }
        }
        .search-btn {
            width: 16%;
            text-align: right;
            color: #333;
            padding: toRem(10) 0 toRem(10) toRem(10);
            text-align: center;
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
                &.active {
                    color: $appColor;
                }
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
                flex-wrap: wrap;
                .list-item {
                    min-width: 30%;
                    max-width: 30%;
                    padding: toRem(14) 0;
                    text-align: center;
                    background: #fff;
                    color: #333;
                    font-size: toRem(14);
                    margin-bottom: toRem(10);
                    &:nth-child(3n-1) {
                        margin: 0 5% toRem(10);
                    }
                    &.on {
                        background: $appColor;
                        color: #fff;
                    }
                }
            }
        }
    }
    .list {
        width: 100%;
        height: 100%;
        color: #333;
        background: #fff;
        .list-title {
            font-size: toRem(14);
            padding: toRem(15) toRem(18);
            border-1px-bottom(#e6e6e6);
        }
        .list-item {
            font-size: toRem(15);
            padding: toRem(15) toRem(18);
            border-1px-bottom(#e6e6e6);
            .item-title {
                font-size: toRem(15);
                line-height: 1.5;
            }
            .item-adress {
                margin: toRem(10) 0;
                font-size: toRem(14);
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
