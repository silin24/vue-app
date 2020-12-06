import axios from 'axios'
import qs from 'qs'
import router from '../router'


//生成axios的伪实例
const instance = axios.create({
  baseURL:'/api'

})


//请求拦截器
instance.interceptors.request.use(
    config => {
      //config 包含当前请求的所有信息 : method url data ......
      //可以修改post请求参数格式,默认格式是json对象格式{a:xxxx,b:yyyy},当前服务器不能处理这种格式,需要转换成url-encoding   a=xxx&b=yyy
      config.data = qs.stringify(config.data)
      //携带token的方式, 1.cookie   2.请求参数     3.请求头 authorization
     let token = localStorage.getItem('token_key')
      if (config.headers.needToken){
        if (token){
          config.headers.authorization = token
        }else {
          alert('请先登录')
        }
      }

      return config
    }
)
//响应拦截器
instance.interceptors.response.use(
    response => response.data,
    error => {
      alert('请求失败')
      console.log(error)
      if (!error.response){
        alert(error.message)
        if(router.currentRoute.path !== '/login'){
          router.replace('/login')
        }
      } else {
        if (error.response.status === 401){
          alert('token过期,重新登录')
        }else if (error.response.status === 404){
          alert('请求资源未找到')
        }else {
          alert('请求错误')
        }
      }
      //手动返回一个初始化状态的promise
      return new Promise(() => {
      })
    }
)


export default  instance
