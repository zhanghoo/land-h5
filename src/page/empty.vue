<template>
    <div id="empty"></div>
</template>
<script>
import { wxLogin } from '@/api'
export default {
    name: 'empty',
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {
        getWxLogin_data() {
            wxLogin().then(res => {
                // console.log(res)
                if (res && res.Data && res.Data.url) {
                    document.location = res.Data.url
                }
            })
        }
    },
    mounted() {
        // this.getWxLogin_data()
        // document.location = 'http://localhost:8040/#/index/home'
    }
}
</script>
<style lang='stylus'>
#empty {

}
</style>
