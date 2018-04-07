<template>
    <div id="home">
        <div class="home-top">
            <div class="home-title">
                <p class="ht-line"></p>
                <p>排行榜<span class="en">HOT</span></p>
                <p class="ht-line"></p>
            </div>
            <div class="home-rank">
                <div class="home-rank-item">
                    <rank-top :color="'#BDAFAE'" :rank-no="2" :scale="0.95"></rank-top>
                    <span class="home-rank-name">曹万贯</span>
                    <span class="home-rank-num">36547</span>
                </div>
                <div class="home-rank-item">
                    <rank-top :color="'#FCD107'" :rank-no="1" :scale="1.05"></rank-top>
                    <span class="home-rank-name">曹万贯</span>
                    <span class="home-rank-num">36547</span>
                </div>
                <div class="home-rank-item">
                    <rank-top :color="'#804621'" :rank-no="3" :scale="0.95"></rank-top>
                    <span class="home-rank-name">曹万贯</span>
                    <span class="home-rank-num">36547</span>
                </div>
            </div>
            <div class="home-msg"><span class="hm-icon my-icon-broadcast"></span>地产大师禁止任何形式的违规行为，请广大用户共同维护地产大师的良好形象。</div>
        </div>
        <div class="home-menu">
            <div class="home-menu-item home-menu-evaluate">
                <div class="home-menu-link">
                    <span class="hml-t">地产估价</span>
                    <span class="hml-b">地产大师之路</span>
                </div>
            </div>
            <div class="home-menu-item home-menu-notice">
                <div class="home-menu-link">
                    <span class="hml-t">成交公告</span>
                    <span class="hml-b">成交公布随时看</span>
                </div>
            </div>
        </div>
        <block-slot :title-icon="true" class="publish-newest-list">
            <span slot="title">最新地产公布</span>
            <span slot="more">查看更多<span class="my-icon-more"></span></span>
            <div slot="conent">
                <div class="block-slot-item">江干区（丁桥单元JG0405-11地块），杭州储出[2018] 4号地块</div>
                <div class="block-slot-item">江干区（丁桥单元JG0405-12地块），杭州储出[2018] 5号地块</div>
                <div class="block-slot-item">江干区（丁桥单元JG0405-13地块），杭州储出[2018] 6号地块</div>
            </div>
        </block-slot>
        <block-slot :title-icon="true" class="winner-newest-list">
            <span slot="title">最近优胜名单</span>
            <span slot="more">查看更多<span class="my-icon-more"></span></span>
            <div slot="conent">
                <div class="block-slot-item">
                    <div class="bsi-panel">
                        <div class="bsi-panel-l">
                            <p class="bsi-title">江干区（丁桥单元JG0405-11地块），杭州储出[2018] 4号地块</p>
                            <p class="bsi-type">商用</p>
                            <p class="bsi-price">成交楼面价<span class="bsi-price-num">4000元/m²</span></p>
                            <p class="bsi-price">预估楼面价<span class="bsi-price-num">4000元/m²</span></p>
                        </div>
                        <div class="bsi-panel-c">
                            <div class="bsi-user-avatar">
                                <div class="bsi-avatar"><img  src="~@/assets/img/avatar.jpg"></div>
                                <img class="bsi-win" src="~@/assets/img/win@2x.png">
                            </div>
                            <p class="bsi-user-name">曹万贯</p>
                            <mt-button class="bsi-user-tag" plain type="primary">地产大亨</mt-button>
                        </div>
                        <div class="bsi-panel-r">
                            <span class="my-icon-zan"></span>
                        </div>
                    </div>
                </div>
                <div class="block-slot-item">
                    <div class="bsi-panel">
                        <div class="bsi-panel-l">
                            <p class="bsi-title">江干区（丁桥单元JG0405-11地块），杭州储出[2018] 4号地块</p>
                            <p class="bsi-type">商用</p>
                            <p class="bsi-price">成交楼面价<span class="bsi-price-num">4000元/m²</span></p>
                            <p class="bsi-price">预估楼面价<span class="bsi-price-num">4000元/m²</span></p>
                        </div>
                        <div class="bsi-panel-c">
                            <div class="bsi-user-avatar">
                                <div class="bsi-avatar"><img  src="~@/assets/img/avatar.jpg"></div>
                                <img class="bsi-win" src="~@/assets/img/win@2x.png">
                            </div>
                            <p class="bsi-user-name">曹万贯</p>
                            <mt-button class="bsi-user-tag" plain type="primary">地产大亨</mt-button>
                        </div>
                        <div class="bsi-panel-r">
                            <span class="my-icon-zan"></span>
                        </div>
                    </div>
                </div>
            </div>
        </block-slot>
    </div>
</template>
<script>
import rankTop from '@/components/rankTop'
import blockSlot from '@/components/blockSlot'
export default {
    name: 'home',
    components: { rankTop, blockSlot },
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
    .home-top {
        margin-bottom: toRem(10);
        background: $panelBg;
        .home-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: toRem(18) toRem(100);
            color: #666;
            font-size: toRem(17);
            line-height: 1;
            font-weight: 700;
            .ht-line {
                height: toRem(1);
                width: toRem(37);
                background: #666666;
            }
            .en {
                color: #ff6666;
                margin-left: toRem(4);
            }
        }
        .home-rank {
            display: flex;
            padding: toRem(9) toRem(8) 0;
            margin-bottom: toRem(15);
            align-items: center;
            justify-content: space-around;
            width: 100%;
            .home-rank-item {
                display: flex;
                flex: 1;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                font-size: toRem(12);
                line-height: 1;
                .home-rank-name {
                    margin: toRem(12) 0 toRem(6);
                    color: #333;
                    font-weight: 700;
                }
                .home-rank-num {
                    color: #333;
                    color: $appColor;
                    font-size: toRem(12);
                }
            }
        }
        .home-msg {
            padding: toRem(6) toRem(18);
            font-size: toRem(10);
            line-height: 1;
            color: #333;
            text-ellipsis();
            .hm-icon {
                margin-right: toRem(9);
                color: $appColor;
            }
        }
    }
    .home-menu {
        display: flex;
        margin-bottom: toRem(10);
        padding: toRem(10) 0;
        align-items: center;
        justify-content: space-around;
        background: $panelBg;
        .home-menu-item {
            flex: 1;
            padding: toRem(9)
            .home-menu-link {
                display: flex;
                flex-direction: column;
                align-items: center;
                .hml-t {
                    margin-bottom: toRem(6);
                    font-size: toRem(15);
                }
                .hml-b {
                    font-size: toRem(11);
                    color: $appColor;
                }
            }
            & + .home-menu-item {
                border-1px-right($borderColor);
            }
        }
    }
    .winner-newest-list {
        .bsi-panel {
            display: flex;
            justify-content: space-between;
            .bsi-panel-l {
                flex: 1;
                max-width: 50%;
                line-height: toRem(26);
                .bsi-title {
                    width: 100%;
                    text-ellipsis();
                }
                .bsi-type {
                    color: $appColor;
                }
                .bsi-price-num {
                    padding: toRem(3.5) toRem(6);
                    margin-left: toRem(4.5);
                    font-size: toRem(10);
                    line-height: 1;
                    color: $appColor;
                    border: 1px solid $appColor;
                    border-radius: toRem(2);
                }
            }
            .bsi-panel-c {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                width: toRem(110);
                .bsi-user-avatar {
                    position: relative;
                    width: toRem(47);
                    height: toRem(47);
                    .bsi-avatar {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        overflow: hidden;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .bsi-win {
                        position: absolute;
                        bottom: 0;
                        width: toRem(50);
                    }
                }
                .bsi-user-name {
                    margin: toRem(5.5) 0 toRem(3.5);
                    font-size: toRem(12);
                }
                .bsi-user-tag {
                    padding: toRem(3.5) toRem(5.5);
                    height: auto;
                    font-size: toRem(9);
                    line-height: 1;
                    border-radius: 0;
                }
            }
            .bsi-panel-r {
                display: flex;
                align-items: center;
                margin-right: toRem(8);
            }
        }
    }
}
</style>
