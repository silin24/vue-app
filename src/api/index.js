/*
包含n个接口请求函数的模块
*/

import ajax from './ajax'

// 1、根据经纬度获取位置详情
export const getAddress = (latitude,longtitude) => ajax({
  url:`/position/${latitude},${longtitude}`

})
// 2. 获取食品分类列表
export const getCategory = () => ajax({
  url:'/index_category'
})
// 3. 根据经纬度获取商铺列表
export const getShopList = (latitude,longtitude) => ajax({
  url:'/shops',
  params:{
    latitude,
    longtitude
  }
})
// 4. 发送短信验证码
export const sendCode = ({phone}) => ajax({
  url:'/sendcode',
  params:{
    phone
  }
})

//用户名登录
//export const reqPwdLogin = ({name, pwd, captcha}) => ajax.post('/login_pwd', {name, pwd, captcha})
export const usernameLogin = ({username,pwd,captcha}) => ajax({
  url:'/login_pwd',
  method:'post',
  data:{
    name:username,
    pwd,
    captcha
  }
})

//手机登录
export const phoneLogin = ({phone,code}) => ajax({
  url:'/login_sms',
  method:'post',
  data:{
    phone,
    code
  }
})
