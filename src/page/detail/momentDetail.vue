<template>
    <div id="momentDetail">
        <template v-if="json">
            <div class="momentDetail-info">
                <img class="info-avatar" v-if="json.avatar" :src="json.avatar">
                <span class="info-name" v-if="json.name">{{json.name}}</span>
                <mt-button class="label" plain type="primary" v-if="json.label">{{json.label}}</mt-button>
                <span class="info-time" v-if="json.time">{{json.time}}</span>
            </div>
            <div class="momentDetail-zan">
                <i class="my-icon-zan" :class="{'active': json.activeZan}" @click="addZan(json)"> {{json.zan}}</i>
            </div>
            <div class="momentDetail-content">
                <div class="content-title">{{json.title}}</div>
                <div class="content-text">{{json.content}}</div>
            </div>
        </template>
    </div>
</template>
<script>
import { getMomentDetail } from '@/api'
export default {
    name: 'momentDetail',
    data() {
        return {
            json: ''
        }
    },
    methods: {
        getMomentsDetail_data() {
            let id = this.$route.query.id
            if (id) {
                getMomentDetail(id).then(res => {
                    this.json = res.data
                })
            }
        },
        addZan(item) {
            item.activeZan = !item.activeZan
            if (item.activeZan) {
                item.zan++
            } else {
                item.zan--
            }
        }
    },
    mounted() {
        this.getMomentsDetail_data()
    }
}
</script>
<style lang='stylus'>
#momentDetail {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 300;
    background: $appBg;
    padding: 0 toRem(18);
    .momentDetail-info {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: toRem(10);
        font-size: 0;
        margin: toRem(12) 0;
        .info-avatar {
            width: toRem(25);
            height: toRem(25);
            border-radius: 100%;
        }
        .info-name {
            color: $mainText;
            font-size: toRem(14);
            margin: 0 toRem(8);
        }
        .info-time {
            color: #ccc;
            font-size: toRem(12);
            margin-left: auto;
            transform: scale(0.9);
        }
    }
    .momentDetail-zan {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: toRem(14);
        .my-icon-zan {
            color: #ccc;
            font-size: toRem(12);
            transform: scale(0.9);
            &.active {
                color: $appColor;
            }
        }
    }
    .momentDetail-content {
        .content-title {
            color: #333;
            font-size: toRem(14);
            margin-bottom: toRem(10);
        }
        .content-text {
            color: #666;
            font-size: toRem(14);
            text-align: justify;
        }
    }
}
</style>
