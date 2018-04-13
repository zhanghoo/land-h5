<template>
    <div id="announcement">
        <div class="announce-panel" v-for="(item, index) in json" :key="index">
            <div class="announce-panel-user">
                <div class="announce-panel-userinfo">
                    <div class="apu-avatar">
                        <img class="apu-avatar-img" :src="item.avatar">
                    </div>
                    <span class="apu-name">{{item.nick_name}}</span>
                    <mt-button class="apu-tag" plain type="primary">{{item.level}}</mt-button>
                </div>
                <img class="announce-panel-win" src="~@/assets/img/win@2x.png">
            </div>
            <div class="announce-panel-landinfo" @click="$router.push({path: '/transactionDetail', query: {'id': item.id}})">
                <div class="apl-address">{{item.name}}</div>
                <div class="apl-prices">
                    <div class="apl-prices-tags">成交楼面价<mt-button class="apl-tag" plain type="primary">{{item.evaluate_num}}元/m²</mt-button></div>
                    <div class="apl-prices-tags">预估楼面价<mt-button class="apl-tag" plain type="primary">{{item.starting_price}}元/m²</mt-button></div>
                </div>
            </div>
            <div class="announce-panel-date">{{item.evaluate_time}}</div>
        </div>
    </div>
</template>
<script>
import { getLandBusinessList } from '@/api/home'
export default {
    name: 'announcement',
    data() {
        return {
            page: 1,
            json: []
        }
    },
    methods: {
        getLandBusinessList_data() {
            getLandBusinessList(this.page).then(res => {
                if (res && res.Data) {
                    this.json = res.Data
                }
                console.log(res)
            })
        }
    },
    mounted() {
        this.getLandBusinessList_data()
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
                display flex
                align-items center
                margin-right: toRem(4.5);
                .apl-prices-tags {
                    font-size toRem(13)
                    .apl-tag {
                        padding: toRem(5) toRem(8);
                        height: auto;
                        font-size: toRem(12);
                        transform scale(0.82)
                        line-height: 1;
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
