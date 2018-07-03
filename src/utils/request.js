import axios from 'axios'
import qs from 'qs'
import { Toast, Indicator } from 'mint-ui'

// 创建axios实例
export const instance = axios.create({
    baseURL: 'http://dcds.soudi.cn/public/index.php',
    timeout: 10 * 1000
})

// request拦截器
instance.interceptors.request.use(config => {
    Indicator.open()
    return config
}, error => {
    Indicator.close()
    Promise.reject(error)
})

// respone拦截器
instance.interceptors.response.use(response => {
    Indicator.close()
    const res = response.data
    if (res && res.error) {
        return Promise.reject(res.error)
    }
    return response
}, error => {
    Indicator.close()
    // Toast({
    //     message: '请求失败',
    //     iconClass: 'my-icon-close'
    // })
    Toast({
        message: '网络故障，烦请重新操作吧^_^',
        iconClass: 'my-icon-tishi'
    })
    return Promise.reject(error)
})

export const request = async (url = '', type = 'GET', data = {}) => {
    let result
    type = type.toUpperCase()

    if (type === 'GET') {
        await instance.get(url, { params: data })
            .then(res => {
                result = res.data
            })
    } else if (type === 'POST') {
        await instance.post(url, qs.stringify(data))
            .then(res => {
                result = res.data
            })
    }
    return result
}
