<template>
    <div id="home">
        <div class="home-top">
            <div class="home-title" @click="$router.push({name: 'rankList'})">
                <p class="ht-line"></p>
                <p>
                    <span>排行榜</span>
                    <span class="en">HOT</span>
                </p>
                <p class="ht-line"></p>
            </div>
            <div class="home-rank">
                <div class="home-rank-item" v-if="rankList[1]" @click.self="$router.push({name: 'rankList'})">
                    <div @click="$router.push({name: 'userDetail', params: { userId: rankList[1].user_id }})">
                        <rank-top :color="'#C6C6C6'" :avatar="rankList[1].avatar" :rank-no="2" :scale="0.95" :desc="rankList[1].level_name"></rank-top>
                    </div>
                    <span class="home-rank-name">{{rankList[1].nick_name}}</span>
                    <span class="home-rank-num" @click="$router.push({name: 'userDetail', params: { userId: rankList[1].user_id }})">{{rankList[1].master_score}}</span>
                </div>
                <div class="home-rank-item" v-if="rankList[0]" @click.self="$router.push({name: 'rankList'})">
                    <div @click="$router.push({name: 'userDetail', params: { userId: rankList[0].user_id }})">
                        <rank-top :color="'#FCD107'" :avatar="rankList[0].avatar" :rank-no="1" :scale="1.05" :desc="rankList[0].level_name"></rank-top>
                    </div>
                    <span class="home-rank-name">{{rankList[0].nick_name}}</span>
                    <span class="home-rank-num" @click="$router.push({name: 'userDetail', params: { userId: rankList[0].user_id }})">{{rankList[0].master_score}}</span>
                </div>
                <div class="home-rank-item" v-if="rankList[2]" @click.self="$router.push({name: 'rankList'})">
                    <div @click="$router.push({name: 'userDetail', params: { userId: rankList[2].user_id }})">
                        <rank-top :color="'#804621'" :avatar="rankList[2].avatar" :rank-no="3" :scale="0.95" :desc="rankList[2].level_name"></rank-top>
                    </div>
                    <span class="home-rank-name">{{rankList[2].nick_name}}</span>
                    <span class="home-rank-num" @click="$router.push({name: 'userDetail', params: { userId: rankList[2].user_id }})">{{rankList[2].master_score}}</span>
                </div>
            </div>
            <div class="home-msg">
                <div class="home-msg-box">
                    <ul id="homeMsgList" class="home-msg-list">
                        <li class="home-msg-item" v-for="(item, index) in systemNews" :key="index">
                            <router-link :to="{name: 'systemNews', params: {json: item}}" class="home-msg-a">
                                <i class="hm-icon my-icon-broadcast"></i>{{item.title}}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="home-menu">
            <div class="home-menu-item home-menu-evaluate">
                <div class="home-menu-link">
                    <span class="hml-t" @click="$router.push({name: 'landEevaluate'})">地产估价</span>
                    <span class="hml-b" @click="$router.push({name: 'landEevaluate'})">地产大师之路</span>
                </div>
            </div>
            <div class="home-menu-item home-menu-notice">
                <div class="home-menu-link">
                    <span class="hml-t" @click="$router.push({name: 'announcement'})">成交公告</span>
                    <span class="hml-b" @click="$router.push({name: 'announcement'})">成交公布随时看</span>
                </div>
            </div>
        </div>
        <block-slot :title-icon="true" class="publish-newest-list">
            <span slot="title">最新地产发布</span>
            <span slot="more" @click="$router.push({name: 'landEevaluate'})">查看更多
                <span class="my-icon-more"></span>
            </span>
            <div slot="conent">
                <template v-for="(item, index) in newestList">
                    <div class="block-slot-item"
                         @click="$router.push({path: '/landDetail', query: { 'pid': item.id}})"
                         :key="index">
                        {{item.name}}
                    </div>
                </template>
            </div>
        </block-slot>
        <block-slot :title-icon="true" class="winner-newest-list">
            <span slot="title">最近优胜名单</span>
            <span slot="more" @click="$router.push({name: 'announcement'})">查看更多
                <span class="my-icon-more"></span>
            </span>
            <div slot="conent">
                <div v-for="(item, index) in announceList" :key="index" class="block-slot-item">
                    <div class="bsi-panel" @click="$router.push({name: 'homeDealInformation', params: { bid: item.bid}})">
                        <div class="bsi-panel-l">
                            <p class="bsi-title">{{item.name}}</p>
                            <p class="bsi-type">{{item.purpose | purposeToString}}</p>
                            <p class="bsi-price">成交楼面价
                                <span class="bsi-price-num">{{item.evaluate_num}}元/m²</span>
                            </p>
                            <p class="bsi-price">预估楼面价
                                <span class="bsi-price-num">{{item.starting_price}}元/m²</span>
                            </p>
                        </div>
                        <div class="bsi-panel-c">
                            <div class="bsi-user-avatar" @click.stop="$router.push({name: 'userDetail', params: { userId: item.user_id }})">
                                <div class="bsi-avatar"><img v-if="item.avatar" :src="item.avatar"></div>
                                <img class="bsi-win" src="~@/assets/img/win@2x.png">
                            </div>
                            <p class="bsi-user-name">{{item.nick_name}}</p>
                            <mt-button class="bsi-user-tag" plain type="primary">{{item.level}}</mt-button>
                        </div>
                        <!-- <div class="bsi-panel-r">
                            <span class="my-icon-zan"></span>
                        </div> -->
                    </div>
                </div>
            </div>
        </block-slot>
        <template v-if="!mine.is_sign">
            <mt-popup v-model="popupVisible"
                      popup-transition="popup-fade"
                      class="h-popup"
                      :closeOnClickModal="false">
                <!-- <div v-if="!scoreBtnClicked" class="home-get-score">
                    <div class="home-get-score-title">每日签到
                        <span class="hg-icon my-icon-baocuo" @click="clickInvitation"></span>
                    </div>
                    <div class="home-get-score-content">
                        <div class="hgsc-gold">
                            <p class="hgsc-golds">
                                <span class="icon my-icon-qianbi"></span>
                                <span class="icon my-icon-qianbi"></span>
                                <span class="icon my-icon-qianbi"></span>
                            </p>
                            <p class="hgsc-gold-tip">10大师积分</p>
                        </div>
                        <p class="hgsc-btn">
                            <mt-button type="primary" @click="getScore">确认领取</mt-button>
                        </p>
                    </div>
                </div>
                <div v-show="scoreBtnClicked"
                     @click="clickInvitation" -->
                <div class="home-box-open">
                    <div class="home-box" :class="boxOpen ? 'open' : ''">
                        <img @click="getScore" class="home-box-close-img" src="~@/assets/img/box.png">
                        <img class="home-box-open-score" src="~@/assets/img/addscore.png">
                        <img class="home-box-open-img" src="~@/assets/img/boxopen.png">
                    </div>
                    <p class="home-box-open-tip">开启宝箱获得积分</p>
                </div>
            </mt-popup>
        </template>
    </div>
</template>
<script>
import rankTop from '@/components/rankTop'
import blockSlot from '@/components/blockSlot'
import { getRankList, getSystemNews, postSign, getLandBusinessList } from '@/api/home'
import { getSearchDetail } from '@/api'
import { mapState } from 'vuex'
import $ from 'jquery'
export default {
    name: 'home',
    components: { rankTop, blockSlot },
    data() {
        return {
            firstIn: 0, // firstIn每日第一进入链接 !!!合接口之后启用, 使用返回字段is_sign 0 是未签 1 是已签
            rankList: '',
            systemNews: [],
            animate: false,
            newestList: [],
            newestListNum: 3, // home页最新地产展示上限数
            announceList: [],
            announceListNum: 3, // home页最近优胜名单展示上限数
            popupVisible: false,
            scoreBtnClicked: false,
            boxOpen: false,
            page: 1
        }
    },
    computed: {
        ...mapState([
            'mine'
        ])
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
        initScroll() {
            // ul
            let $ulList = $('#homeMsgList')
            let timer = null
            $ulList.hover(() => {
                // 触摸清空定时器
                clearInterval(timer)
            }, () => {
                // 离开启动定时器
                timer = setInterval(() => {
                    this.scrollList($ulList)
                }, 2000)
            }).trigger('mouseleave') // 自动触发触摸事件
        },
        scrollList(el) {
            // ul
            let $ulList = $('#homeMsgList')
            // 获得当前li的高度
            let scrollH = $('#homeMsgList li:first').height()
            // 滚动出一个li的高度
            $ulList.stop().animate({
                marginTop: -scrollH
            }, 600, function() {
                // 动画结束后, 将当前ul marginTop置为初始值
                $ulList.css({
                    marginTop: 0
                }).find('li:first').appendTo($ulList)
            })
        },
        getRankList_data() {
            getRankList().then(res => {
                if (res && res.Data) {
                    this.rankList = res.Data
                }
            })
        },
        getSystemNews_data() {
            getSystemNews().then(res => {
                if (res && res.Data) {
                    this.systemNews = res.Data
                }
            })
        },
        getLandEevaluate_data() {
            // 全传0时 默认返回第一进入时所展示内容
            let params = {
                keyWord: this.keyWord || 0,
                cityID: this.citySelected || 0,
                type: this.typeSelected || 0,
                page: this.page
            }
            getSearchDetail(params).then(res => {
                if (res && res.Data) {
                    // 截取数组的前 3 个展示
                    // this.newestList = res.Data.alice(0, this.newestListNum)
                    var _list = res.Data
                    var _len = _list.length > this.newestListNum ? this.newestListNum : _list.length
                    for (var i = 0; i < _len; i++) {
                        this.newestList.push(_list[i])
                    }
                }
            })
        },
        getLandBusinessList_data() {
            getLandBusinessList(this.page).then(res => {
                if (res && res.Data) {
                    var _list = res.Data
                    var _len = _list.length > this.announceListNum ? this.announceListNum : _list.length
                    for (var i = 0; i < _len; i++) {
                        this.announceList.push(_list[i])
                    }
                }
            })
        },
        clickInvitation() {
            this.popupVisible = !this.popupVisible
            /*
            if (!this.scoreBtnClicked) {
                // 未点击直接隐藏,扣除10积分
                console.log('未点击签到, 扣除10积分')
            } else {
            }
            */
        },
        getScore() {
            var _self = this
            // _self.scoreBtnClicked = true
            setTimeout(function() {
                // 定时关闭弹框
                _self.clickInvitation()
            }, 2000)
            postSign().then(res => {
                // console.log(res.Msg)
                _self.boxOpen = true
            })
        }
    },
    mounted() {
        if (this.firstIn) {
            this.popupVisible = true
        }
        this.getRankList_data()
        this.getSystemNews_data()
        this.getLandEevaluate_data()
        this.getLandBusinessList_data()
        this.$nextTick(function () {
            this.initScroll()
        })
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
            .home-msg-box {
                height: toRem(15);
                line-height: toRem(15);
                overflow: hidden;
                .home-msg-list {
                    .home-msg-item {
                        height: toRem(15);
                        line-height: toRem(15);
                        .home-msg-a {
                            display: inline-block;
                            height: toRem(15);
                            line-height: toRem(15);
                        }
                    }
                }
            }
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
            padding: toRem(9);
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
                border-1px-left($borderColor);
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
    .h-popup {
        width: 100%;
        border-radius: toRem(10);
        background: transparent;
        .home-get-score {
            margin: 0 auto;
            width: toRem(300);
            height: auto;
            background: $panelBg;
            border-radius: toRem(10);
            .home-get-score-title {
                position: relative;
                height: toRem(40);
                line-height: toRem(40);
                color: #aaa;
                font-size: toRem(18);
                text-align: center;
                border-1px-bottom($borderColor);
                .hg-icon {
                    position: absolute;
                    right: toRem(10);
                }
            }
            .home-get-score-content {
                padding: toRem(10);
                .hgsc-gold {
                    padding: toRem(15) 0;
                    flex-vertical-center();
                    .hgsc-golds {
                        width: 100%;
                        text-align: center;
                        font-size: toRem(40);
                        .icon {
                            margin: 0 toRem(-10);
                        }
                    }
                    .hgsc-gold-tip {
                        margin-top: toRem(12);
                        font-size: toRem(18);
                        line-height: 1;
                    }
                }
                .hgsc-btn {
                    margin-top: toRem(8);
                    .mint-button {
                        width: 100%;
                        height: toRem(48);
                        line-height: toRem(48);
                        font-size: toRem(16);
                    }
                }
            }
        }
        .home-box-open {
            position: relative;
            width: 100%;
            .home-box {
                position: relative;
                margin: 0 auto;
                text-align: center;
                width: 100%;
                .home-box-close-img {
                    position: absolute;
                    left: 50%;
                    bottom: toRem(39);
                    width: toRem(114);
                    transform: translateX(-50%);
                }
                .home-box-open-score {
                    position: absolute;
                    top: 26%;
                    left: 37%;
                    width: toRem(69);
                    visibility: hidden;
                }
                .home-box-open-img {
                    margin-bottom: toRem(39);
                    width: toRem(145);
                    visibility: hidden;
                }
                &.open {
                    .home-box-close-img {
                        visibility: hidden;
                    }
                    .home-box-open-score,
                    .home-box-open-img {
                        visibility: visible;
                    }
                }
            }
            .home-box-open-tip {
                width: 100%;
                font-size: toRem(29);
                line-height: 1;
                color: $appColor;
                text-align: center;
                font-weight: 700;
            }
        }
    }
}
</style>
