import axios from 'axios'
import qs from 'qs'


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


      return config

    }
)
//响应拦截器
instance.interceptors.response.use(

    response => response.data,
    error => {
      alert('请求失败')
      console.log(error)

      return new Promise(() => {
      })
    }
)


export default  instance
