<template>

  <section class="msite">
    <Header :title="address.name || '定位中'">
      <!--  <span class="header_search" slot="left">
          <i class="iconfont icon-sousuo"></i>
        </span>
        <span class="header_login" slot="right">
          <span class="header_login_text">登录|注册</span>
        </span>-->
      <template v-slot:left>
         <span class="header_search">
        <i class="iconfont icon-sousuo"></i>
      </span>
      </template>
      <template v-slot:right>
        <span class="header_login">
        <span class="header_login_text">登录|注册</span>
      </span>
      </template>

    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(category,index) in newCategory" :key="index">
            <div class="link_to_food" v-for="(item,index) in category" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com'+ item.image_url">
              </div>
              <span>{{item.title}}</span>
            </div>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList></ShopList>
  </section>

</template>

<script type="text/ecmascript-6">
  import Swiper from 'swiper'
  import _ from 'lodash'
  import 'swiper/css/swiper.min.css'
  import {mapState} from 'vuex'
  import ShopList from "../../components/ShopList/ShopList";
  export default {
    components:{
      ShopList
    },
    mounted() {
      this.$store.dispatch('getAddressAction')
      this.$store.dispatch('getCategoryAction')

    },
    computed: {
      ...mapState({
        address: state => state.address,
        category: state => state.category
      }),
      newCategory() {
        return _.chunk(this.category, 8)
      }
    },
    watch:{
      category(){
        this.$nextTick(() => {
          new Swiper('.swiper-container', {
            autoplay: true,//可选选项，自动滑动
            loop: true, // 循环模式选项
            // autoplay:true,
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  .msite //首页
    width 100%

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff

      .swiper-container
        width 100%
        height 100%

        .swiper-wrapper
          width 100%
          height 100%

          .swiper-slide
            display flex
            flex-wrap wrap

            .link_to_food
              width 25%

              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0

                img
                  display inline-block
                  width 50px
                  height 50px

              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666

        /*深度选择器*/

        /deep/ .swiper-pagination
          > span.swiper-pagination-bullet-active
            background $green


</style>
