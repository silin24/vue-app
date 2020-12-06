import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import shop from './modules/shop'



const store = new Vuex.Store({
  modules:{
    shop
  },
  state,
  mutations,
  actions,
  getters
})

export default store
