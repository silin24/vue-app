import {getAddress,getCategory,getShopList} from '../api/index'

import {
  SAVE_ADDRESS,
    SAVE_CATEGORY,
    SAVE_SHOPLIST,
    SAVE_USER,
    SAVE_TOKEN

} from "./mutations-type";

export default {
  async getAddressAction({commit}) {
    let result = await getAddress(40.10038, 116.36867)
    // if (result.code === 0){
    //   commit(SAVE_ADDRESS,result.data)
    // }
    !!(result.code === 0) && commit(SAVE_ADDRESS, result.data)
  },
  async getCategoryAction({commit}) {
    let result = await getCategory()
    !!(result.code === 0) && commit(SAVE_CATEGORY, result.data)
  },
  async getShopListAction({commit}) {
    let result = await getShopList(40.10038, 116.36867)
    !!(result.code === 0) && commit(SAVE_SHOPLIST, result.data)
  },
  async getUserAction({commit},user) {
    delete user.token
    commit(SAVE_USER, user)
  },
  async getTokenAction({commit},token) {
    localStorage.setItem('token_key',token)
    commit(SAVE_TOKEN, token)
  }
}
