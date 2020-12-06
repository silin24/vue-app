<template>
  <div>
    <shop-header/>

    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/good" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/rating" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>

    <router-view/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {SAVE_SHOPDATA, SAVE_CARTSHOPS} from '../../vuex/mutations-type'
  import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'

  export default {
    components: {
      ShopHeader
    },
   async mounted() {
     // let data = {}
     // sessionStorage.setItem('xxx', JSON.stringify(data))
     // 解决Vuex刷新页面数据丢失问题

     // 从sessionStorage读取数据
     let shopData = JSON.parse(sessionStorage.getItem('shopData'))
     if(shopData){
       // 1. 将读取的数据存入Vuex中
       this.$store.commit(SAVE_SHOPDATA, shopData)
       // 2. 计算最新的购物车数据， food.count > 0
       let cartShops = shopData.goods.reduce((pre, good) => {
         pre.push(...good.foods.filter(food => food.count))
         return pre
       }, [])
       // 3. cartShops存入Vuex中
       this.$store.commit(SAVE_CARTSHOPS, cartShops)
     }else {
       // 分发action，发请求获取数据
       this.$store.dispatch('getShopDataAction')
     }
     // unload事件在页面确定刷新，但是还没有真正刷新的时候，     页面即将刷新之前执行
     window.addEventListener('unload', () =>{
       // 将最新的shopData存入sessionStorage
       sessionStorage.setItem('shopData', JSON.stringify(this.shopData))
     })

   },
    beforeDestroy(){

      // 将最新的shopDatas存入sessionStorage
      sessionStorage.setItem('shopData', JSON.stringify(this.shopData))
    },
    computed: {
      ...mapState({
        shopData: state => state.shop.shopData
      })
  }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>

