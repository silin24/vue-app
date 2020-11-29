/*
对axios进行二次封装 可以发Ajax请求
* */
/*
一个能发送ajax请求的函数
1. 统一处理请求异常
2. 异步请求成功的数据不是response, 而是response.data
3. 对post请求参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)
4. 配置请求超时的时间
5. 通过请求头携带token数据
*/

import axios from 'axios'
import qs from 'querystring'
import {Indicator} from 'mint-ui'

const instance = axios.create({
    timeout: 20000,
   // baseURL: 'http://localhost:4000' //跨域
    baseURL:'/api'

})
//请求拦截器
instance.interceptors.request.use((config)=>{

    Indicator.open()

    const data = config.data
    if (data instanceof Object) {
        const data = qs.stringify(data)
    }

    return config
})


//响应连接器
instance.interceptors.response.use(
    response => {
        Indicator.close()
        return response.data
    },
    error => {
//1. 统一处理请求异常  ,返回一个pending状态的promise
        Indicator.close()
        return new Promise(() => {})
    }
)



export default instance
