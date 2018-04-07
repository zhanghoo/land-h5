<!--
:title-icon -> 是否显示标题左侧蓝色块, ture=显示,  默认为不显示
ps: 注意在content中的item 请加入 block-slot-item 以保持默认有短横线, 不加则请自定义区块的样式
-->
<template>
    <block-slot :title-icon="true">
        <span slot="title">最新地产公布</span>
        <span slot="more">查看更多<span class="my-icon-more"></span></span>
        <div slot="conent">
            <div class="block-slot-item">content1</div>
            <div class="block-slot-item">content2</div>
        </div>
    </block-slot>
</template>
<script>
import blockSlot from '@/components/blockSlot'
export default {
    components: { blockSlot },
}
</script>
<style lang='stylus'>
    
</style>