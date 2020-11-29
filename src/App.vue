<template>
    <div>
        <router-view></router-view>
        <FooterGuide v-show="$route.meta.isShow"></FooterGuide>
    </div>
</template>

<script type="text/ecmascript-6">
    import FooterGuide from '@/components/FooterGuide/FooterGuide.vue'
    import {reqAddress} from "./api";

    export default {
        components: {
            FooterGuide
        },
       async mounted() {
          this.$store.dispatch('getAddress')
        }
    }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">


</style>
