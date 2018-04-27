<template>
    <div id="homePage" v-infinite-scroll="getUserMoment_data" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <div class="homePage-header">
            <div class="header-user">
                <div class="user-avatar">
                    <img class="avatar-img" v-if="userinfo.avatar" :src="userinfo.avatar">
                </div>
                <div class="user-base">
                    <div class="base-wrapper">
                        <p class="user-name">{{userinfo.nick_name}}</p>
                        <mt-button class="label user-label" plain type="primary">{{userinfo.level}}</mt-button>
                    </div>
                    <div class="user-score">积分：{{userinfo.master_score}}</div>
                </div>
            </div>
        </div>
        <div class="homePage-body">
            <block-slot :title-icon="true" class="publish-newest-list">
                <span slot="title">发布的动态</span>
                <div slot="conent">
                    <momentList :json="json" :isMySelf="mySelf"></momentList>
                    <!-- 底部提示 -->
                    <div class="bottomLoad" v-if="json.length > 0">
                        <div class="loading" v-show="loading === true">加载中...</div>
                        <div class="noData" v-if="loading === 'nothing'">没有更多的内容了</div>
                    </div>
                </div>
            </block-slot>
        </div>
    </div>
</template>
<script>
import blockSlot from '@/components/blockSlot'
import momentList from '@/components/momentList'
import { mapState } from 'vuex'
import { getUserDetail } from '@/api/mine'
export default {
    name: 'homePage',
    components: { blockSlot, momentList },
    data() {
        return {
            json: [],
            userinfo: {},
            mySelf: false,
            page: 1,
            bottomLock: false,
            loading: false
        }
    },
    computed: {
        ...mapState([
            'mine'
        ])
    },
    methods: {
        getUserMoment_data() {
            // console.log(this.$route.params.userId)
            this.loading = true
            this.bottomLock = true
            let params = {
                user_id: this.$route.query.userId,
                page: this.page
            }
            getUserDetail(params).then(res => {
                // console.log(res)
                if (res && res.Data && res.Data.userstate) {
                    this.json.push(...res.Data.userstate)
                    if (!this.userinfo.nick_name) {
                        // 只需要赋值一次
                        this.userinfo = res.Data.userinfo
                    }
                    if (this.userinfo.user_id === this.mine.user_id) {
                        // 用户查看自己的主页
                        this.mySelf = true
                    }
                    this.page++
                    this.loading = false
                    this.bottomLock = false
                } else {
                    this.loading = 'nothing'
                }
            }).catch(err => {
                console.log(err)
                this.loading = false
            })
        }
    },
    mounted() {
        this.getUserMoment_data()
    }
}
</script>
<style lang='stylus'>
#homePage {
    height 100vh
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .homePage-header {
        display: flex;
        padding: toRem(20) toRem(18);
        align-items: center;
        background: $panelBg;
        margin-bottom: toRem(10);
        .header-user {
            display: flex;
            align-items: center;
            .user-avatar {
                width: toRem(60);
                height: toRem(60);
                border-radius: 100%;
                overflow: hidden;
                background: #eee;
                .avatar-img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .user-base {
                padding-left: toRem(18.5);
                .base-wrapper {
                    display: flex;
                    align-items: center;
                    margin-bottom: toRem(15);
                    .user-name {
                        color: #333;
                        margin-right: toRem(12);
                        font-size: toRem(18);
                    }
                    .user-label {
                        font-size: toRem(9);
                    }
                }
                .user-score {
                    color: #666;
                    font-size: toRem(12);
                }
            }
        }
    }
    .homePage-body {
        .block-slot-body {
            padding: 0;
        }
        .list-item {
            .item-info{
                border-1px-top(#f5f5f5)
            }
        }
    }
}
</style>
