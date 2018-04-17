<template>
    <div id="rankList">
        <div class="title">
            <p class="line"></p>
            <p>
                <span>排行榜</span>
                <span class="en">HOT</span>
            </p>
            <p class="line"></p>
        </div>
        <div class="rankList-content">
            <div class="content-header">
                <div class="header-item">排名</div>
                <div class="header-item">昵称</div>
                <div class="header-item">等级名称</div>
                <div class="header-item">大师积分</div>
            </div>
            <div class="content-body">
                <div class="body-item" v-for="(item, index) in rankList" :key="index">
                    <div class="item item-index">
                        <i :class="{'my-icon-huangguan': index < 3}">
                            <span :style="{'absolute': index < 3}">{{item.rank}}</span>
                        </i>
                    </div>
                    <div class="item item-name">
                        <img class="name-avatar" v-if="item.avatar" :src="item.avatar">
                        <span class="name-text">{{item.nick_name}}</span>
                    </div>
                    <div class="item item-level">{{item.level_name}}</div>
                    <div class="item item-score">{{item.master_score}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getRankList } from '@/api/home'

export default {
    name: 'rankList',
    data() {
        return {
            rankList: ''
        }
    },
    methods: {
        getRankList_data() {
            getRankList().then(res => {
                if (res && res.Data) {
                    this.rankList = res.Data
                }
            })
        }
    },
    mounted() {
        this.getRankList_data()
    }
}
</script>
<style lang='stylus'>
#rankList {
    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: toRem(18) toRem(100);
        color: #666;
        font-size: toRem(17);
        line-height: 1;
        font-weight: 700;
        .line {
            height: toRem(1);
            width: toRem(37);
            background: #666666;
        }
        .en {
            color: #ff6666;
            margin-left: toRem(4);
        }
    }
    .rankList-content {
        width: 100%;
        background: #fff;
        .content-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #333;
            font-size: toRem(14);
            padding: toRem(15) 0;
            border-1px-bottom(#e6e6e6);
            .header-item {
                width: 25%;
                text-align: center;
            }
        }
        .content-body {
            color: #666;
            font-size: toRem(12);
            .body-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: toRem(18) 0;
                border-1px-bottom(#e6e6e6);
                .item {
                    width: 25%;
                    text-align: center;
                }
                .item-name {
                    display: flex;
                    align-items: center;
                    justify-content center;
                    .name-avatar {
                        flex-shrink: 0;
                        width: toRem(25);
                        height: toRem(25);
                        border-radius: 100%;
                        overflow: hidden;
                        margin-right: toRem(5);
                    }
                    .name-text {
                        text-ellipsis();
                    }
                }
                .item-index {
                    font-style: normal;
                    i {
                        position: relative;
                        font-size: toRem(22);
                    }
                    span {
                        position: absolute;
                        left: 50%;
                        top: 58%;
                        color: #333;
                        font-size: toRem(12);
                        font-weight: bold;
                        transform: translate3d(-50%, -50%, 0) scale(0.84);
                    }
                }
                &:nth-child(1) .item-index i {
                    color: #FCD107;
                }
                &:nth-child(2) .item-index i {
                    color: #BDAFAE;
                }
                &:nth-child(3) .item-index i {
                    color: #D09168;
                }
                &:nth-child(n+4) .item-index span {
                    position: static;
                    font-weight: normal;
                }
            }
        }
    }
}
</style>
