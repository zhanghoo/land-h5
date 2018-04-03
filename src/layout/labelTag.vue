<template>
    <span class="lable-tag">{{labelText}}</span>
</template>
<script>
export default {
    name: 'labelTag',
    props: {
        labelText: {
            type: String,
            default: '标签文本'
        }
    }
}
</script>
<style lang='stylus'>
.lable-tag {
    padding: toRem(3.5) toRem(6.5);
    color: $appColor;
    border-radius: toRem(3);
    border: 1px solid $appColor;
    font-size: toRem(9);
    line-height: 1;
    vertical-align: middle;
}
</style>
