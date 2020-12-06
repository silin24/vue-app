<template>
    <div>
        <router-view></router-view>
        <FooterGuide v-show="$route.meta.isShowFooter"></FooterGuide>
    </div>
</template>

<script type="text/ecmascript-6">
    import {SAVE_USER} from "./vuex/mutations-type";
    import FooterGuide from '@/components/FooterGuide/FooterGuide.vue'

    export default {
        components: {
            FooterGuide
        },
        async mounted() {
          let result =  await this.$API.autoLogin()
            //存入vuex
            this.$store.commit(SAVE_USER,result.data)
            console.log(result)
        }
    }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    *
        touch-action none

</style>
