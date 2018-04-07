<template>
    <div class="rank-top" :style="{ 'transform': boxScale }">
        <div class="ribbon-box bottom">
            <div class="ribbon-c">
                <div class="ribbon-l" :style="{ 'border-top-color': color, 'border-bottom-color': color}"></div>
                <div class="ribbon-r" :style="{ 'border-top-color': color, 'border-bottom-color': color}"></div>
            </div>
        </div>
        <div class="rt-user">
            <img class="rtu-avatar" :src="avatar">
        </div>
        <div class="rt-huangguan my-icon-huangguan" :style="{ color: color }">
            <span class="rank-no">{{rankNo}}</span>
        </div>
        <div class="ribbon-box">
            <div class="ribbon-c" :style="{ 'border-top-color': color }">
                <div class="ribbon-c-l"></div>
                <div class="ribbon-c-r"></div>
                <p class="ribbon-desc">{{desc}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'rankTop',
    props: {
        color: {
            type: String,
            default: '#C6C6C6'
        },
        avatar: {
            type: String,
            default: '/static/img/avatar.5c0bee6.jpg'
        },
        desc: {
            type: String,
            default: '地产大亨'
        },
        rankNo: {
            type: Number,
            default: 0
        },
        scale: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {

        }
    },
    computed: {
        boxScale() {
            return `scale(${this.scale})`
        }
    },
    methods: {

    },
    mounted() {

    }
}
</script>
<style lang='stylus'>
.rank-top {
    position: relative;
    width: toRem(57.5);
    height: toRem(57.5);
    .rt-user {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        overflow: hidden;
        .rtu-avatar {
            width: 100%;
            height: 100%;
        }
    }
    .rt-huangguan {
        position: absolute;
        top: 0;
        right: 0;
        transform: rotate(30deg) translateX(-25%) translateY(-50%);
        font-size: toRem(24);
        .rank-no {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-20%);
            color: #333;
            font-size: toRem(9);
            line-height: 1;
            font-weight: 700;
        }
    }
    .ribbon-box {
        position: absolute;
        bottom: toRem(-20);
        left: toRem(-2.2);
        .ribbon-c {
            position: relative;
            width: toRem(61.5);
            border-width: toRem(17) toRem(12);
            border-style: solid;
            border-color: #C6C6C6 transparent transparent transparent;
            .ribbon-c-l {
                position: absolute;
                top: toRem(-29);
                left: toRem(-12);
                border-width: toRem(6) toRem(3);
                border-style: solid;
                border-color: transparent transparent #000 transparent;
                opacity: 0.3;
            }
            .ribbon-c-r {
                position: absolute;
                top: toRem(-29);
                right: toRem(-12);
                border-width: toRem(6) toRem(3);
                border-style: solid;
                border-color: transparent transparent #000 transparent;
                opacity: 0.4;
            }
            .ribbon-l {
                position: absolute;
                top: toRem(-23);
                left: toRem(-21);
                width: toRem(17);
                border-width: toRem(8) toRem(5);
                border-style: solid;
                border-color: #C6C6C6 transparent #C6C6C6 transparent;
            }
            .ribbon-r {
                position: absolute;
                top: toRem(-23);
                right: toRem(-21);
                width: toRem(17);
                border-width: toRem(8) toRem(5);
                border-style: solid;
                border-color: #C6C6C6 transparent #C6C6C6 transparent;
            }
            .ribbon-desc {
                position: absolute;
                font-size: toRem(10);
                color: #fff;
                top: toRem(-17);
                left: toRem(-12);
                width: toRem(61.5);
                line-height: toRem(17);
                white-space: nowrap;
                text-align: center;
            }
        }
    }
}
</style>
