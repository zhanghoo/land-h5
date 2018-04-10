<template>
    <div id="announcement">
        <div class="announce-panel">
            <div class="announce-panel-user">
                <div class="announce-panel-userinfo">
                    <div class="apu-avatar">
                        <img class="apu-avatar-img" src="~@/assets/img/avatar.jpg">
                    </div>
                    <span class="apu-name">曹万贯</span>
                    <mt-button class="apu-tag" plain type="primary">地产大亨</mt-button>
                </div>
                <img class="announce-panel-win" src="~@/assets/img/win@2x.png">
            </div>
            <div class="announce-panel-landinfo" @click="$router.push({name: 'transactionDetail'})">
                <div class="apl-address">江干区（丁桥单元JG0405-12地块），杭政储出［2018］4号地块</div>
                <div class="apl-prices">
                    <div class="apl-prices-tags">成交楼面价<mt-button class="apl-tag" plain type="primary">4000元/m²</mt-button></div>
                    <div class="apl-prices-tags">预估楼面价<mt-button class="apl-tag" plain type="primary">4000元/m²</mt-button></div>
                </div>
            </div>
            <div class="announce-panel-date">2018-03-08</div>
        </div>
        <div class="announce-panel">
            <div class="announce-panel-user">
                <div class="announce-panel-userinfo">
                    <div class="apu-avatar">
                        <img class="apu-avatar-img" src="~@/assets/img/avatar.jpg">
                    </div>
                    <span class="apu-name">曹万贯</span>
                    <mt-button class="apu-tag" plain type="primary">地产大亨</mt-button>
                </div>
                <img class="announce-panel-win" src="~@/assets/img/win@2x.png">
            </div>
            <div class="announce-panel-landinfo">
                <div class="apl-address">江干区（丁桥单元JG0405-12地块），杭政储出［2018］4号地块</div>
                <div class="apl-prices">
                    <div class="apl-prices-tags">成交楼面价<mt-button class="apl-tag" plain type="primary">4000元/m²</mt-button></div>
                    <div class="apl-prices-tags">预估楼面价<mt-button class="apl-tag" plain type="primary">4000元/m²</mt-button></div>
                </div>
            </div>
            <div class="announce-panel-date">2018-03-08</div>
        </div>
        <div class="announce-panel">
            <div class="announce-panel-user">
                <div class="announce-panel-userinfo">
                    <div class="apu-avatar">
                        <img class="apu-avatar-img" src="~@/assets/img/avatar.jpg">
                    </div>
                    <span class="apu-name">曹万贯</span>
                    <mt-button class="apu-tag" plain type="primary">地产大亨</mt-button>
                </div>
                <img class="announce-panel-win" src="~@/assets/img/win@2x.png">
            </div>
            <div class="announce-panel-landinfo">
                <div class="apl-address">江干区（丁桥单元JG0405-12地块），杭政储出［2018］4号地块</div>
                <div class="apl-prices">
                    <div class="apl-prices-tags">成交楼面价<mt-button class="apl-tag" plain type="primary">4000元/m²</mt-button></div>
                    <div class="apl-prices-tags">预估楼面价<mt-button class="apl-tag" plain type="primary">4000元/m²</mt-button></div>
                </div>
            </div>
            <div class="announce-panel-date">2018-03-08</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'announcement',
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
#announcement {
    .announce-panel {
        padding: 0 toRem(18);
        margin-bottom: toRem(5);
        background: $panelBg;
        .announce-panel-user {
            display: flex;
            padding: toRem(15) 0;
            border-1px-bottom($borderColor);
            justify-content: space-between;
            align-items: center;
            .announce-panel-userinfo {
                .apu-avatar {
                    display: inline-block;
                    width: toRem(30);
                    height: toRem(30);
                    vertical-align: middle;
                    border-radius: 100%;
                    overflow: hidden;
                    .apu-avatar-img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .apu-name {
                    font-size: toRem(14);
                    font-weight: 700;
                    color: #333;
                }
                .apu-tag {
                    padding: toRem(3.5) toRem(5.5);
                    height: auto;
                    font-size: toRem(9);
                    line-height: 1;
                }
            }
            .announce-panel-win {
                width: toRem(50);
            }
        }
        .announce-panel-landinfo {
            padding: toRem(14) 0;
            font-size: toRem(13);
            line-height: 1;
            .apl-address {
                line-height: toRem(18);
            }
            .apl-prices {
                margin-top: toRem(10);
                width: 100%;
                color: #666;
                .apl-prices-tags {
                    display: inline-block;
                    .apl-tag {
                        padding: toRem(5) toRem(8);
                        margin-left: toRem(4.5);
                        height: auto;
                        font-size: toRem(9);
                        line-height: 1;
                    }
                    & + .apl-prices-tags {
                        margin-left: toRem(19);
                    }
                }
            }
        }
        .announce-panel-date {
            padding-bottom: toRem(14);
            font-size: toRem(12);
            color: #ccc;
        }
    }
}
</style>
