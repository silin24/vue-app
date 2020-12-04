import {
  SAVE_ADDRESS,
  SAVE_CATEGORY,
  SAVE_SHOPLIST,
  SAVE_USER,
  SAVE_TOKEN
} from './mutations-type'

export default {
[SAVE_ADDRESS](state,address){
  state.address = address
},
  [SAVE_CATEGORY](state,category){
    state.category = category
  },
  [SAVE_SHOPLIST](state,shopList){
    state.shopList = shopList
  },
  [SAVE_USER](state,user){
    state.user = user
  },
  [SAVE_TOKEN](state,token){
    state.token = token
  }
}
