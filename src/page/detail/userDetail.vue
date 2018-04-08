<template>
    <div id="userDetail">
        <div class="userDetail-header">
            <div class="header-user">
                <div class="user-avatar">
                    <img class="avatar-img" v-if="user.avatar" :src="user.avatar">
                </div>
                <div class="user-base">
                    <div class="base-wrapper">
                        <p class="user-name">{{user.nick_name}}</p>
                        <mt-button class="label user-label" plain type="primary">地产大亨</mt-button>
                    </div>
                    <div class="user-score">积分:36547</div>
                </div>
            </div>
        </div>
        <div class="userDetail-body">
            <block-slot :title-icon="true" class="publish-newest-list">
                <span slot="title">发布的动态</span>
                <div slot="conent">
                    <momentList :json="json"></momentList>
                </div>
            </block-slot>
        </div>
    </div>
</template>
<script>
import blockSlot from '@/components/blockSlot'
import momentList from '@/components/momentList'
import { mapState } from 'vuex'
import { getUserMoment } from '@/api'
export default {
    name: 'userDetail',
    components: { blockSlot, momentList },
    data() {
        return {
            json: []
        }
    },
    computed: {
        ...mapState([
            'user'
        ])
    },
    methods: {
        getUserMoment_data() {
            getUserMoment().then(res => {
                if (res && res.Data) {
                    this.json = res.Data
                }
            })
        }
    },
    mounted() {
        this.getUserMoment_data()
    }
}
</script>
<style lang='stylus'>
#userDetail {
    .userDetail-header {
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
    .userDetail-body {
        .block-slot-body {
            padding: 0;
        }
        .list-item {
            border-1px-bottom(#e6e6e6);
            .item-info{
                border-1px-top(#f5f5f5)
            }
        }
    }
}
</style>
