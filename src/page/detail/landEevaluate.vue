<template>
    <div id="landEevaluate">
        <div class="search">
            <div class="search-input-wrapper">
                <i class="my-icon-add"></i>
                <form @submit.prevent="getSearchDetail_data">
                    <input class="search-input" type="search" placeholder="搜索地产名称" v-model="keyWord">
                </form>
            </div>
            <div class="search-btn" @click="getSearchDetail_data">搜索</div>
        </div>
        <div class="select">
            <div class="select-action">
                <div class="action-item action-city" :class="{'active': selectType === 'city' && selectVisible === true}" @click="openSelectList('city')">
                    <span v-if="citySelected">{{citySelected}}</span>
                    <span v-else>选择城市</span>
                    <i class="my-icon-jiantoushang" v-if="selectType === 'city' && selectVisible === true"></i>
                    <i class="my-icon-jiantouxia" v-else></i>
                </div>
                <div class="action-item action-type" :class="{'active': selectType === 'type' && selectVisible === true}" @click="openSelectList('type')">
                    <span v-if="typeSelected">{{typeSelected}}</span>
                    <span v-else>选择类型</span>
                    <i class="my-icon-jiantoushang" v-if="selectType === 'type' && selectVisible === true"></i>
                    <i class="my-icon-jiantouxia" v-else></i>
                </div>
            </div>
            <div class="select-list" v-if="selectVisible">
                <!-- city -->
                <template v-if="selectType === 'city'">
                    <div class="list-title">热门城市</div>
                    <div class="list-wrapper">
                        <div class="list-item" v-for="(item, index) in 10" :key="index" @click="selected(item)">北京</div>
                    </div>
                </template>
                <!-- type -->
                <template v-if="selectType === 'type'">
                    <div class="list-wrapper">
                        <div class="list-item" v-for="(item, index) in 2" :key="index" @click="selected(item)">北京</div>
                    </div>
                </template>
            </div>
        </div>
        <div class="list">
            <div class="list-title">全平台投注均为
                <i class="my-icon-zuanshi"></i>100/次</div>
            <div class="list-item" v-for="(item, index) in landList" :key="index">
                <div class="item-title" @click="$router.push({path: '/landDetail', query: { 'pid': item.id}})">{{item.name}}</div>
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
        <div class="v-modal" v-if="selectVisible" @click="selectVisible = false"></div>
    </div>
</template>
<script>
import { getSearchDetail } from '@/api'
export default {
    name: 'landEevaluate',
    data() {
        return {
            keyWord: '',
            selectVisible: false,
            selectType: '',
            cityJson: [],
            typeJson: [],
            citySelected: '',
            typeSelected: '',
            landList: []
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
    methods: {
        getSearchDetail_data() {
            // 全传0时 默认返回第一进入时所展示内容
            let params = {
                keyWord: this.keyWord || 0,
                cityID: this.citySelected || 0,
                type: this.typeSelected || 0,
                page: 1
            }
            getSearchDetail(params).then(res => {
                if (res && res.Data) {
                    this.landList = res.Data
                }
            })
        },
        openSelectList(val) {
            if (this.selectType === val) {
                this.selectVisible = !this.selectVisible
            } else {
                this.selectType = val
                this.selectVisible = true
            }
        },
        selected(item) {
            if (this.selectType === 'city') {
                this.citySelected = item
            } else if (this.selectType === 'type') {
                this.typeSelected = item
            }
            this.selectVisible = false
        }
    },
    mounted() {
        this.getSearchDetail_data()
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
