import { request } from '@/utils/request'

// 微信登录
export function wxLogin() {
    let res = request('/home/wechat/login', 'POST')
    return res
}

// 微信分享
export function wxShare(url) {
    let res = request('/home/wechat/share', 'POST', { 'url': url })
    return res
}

// 获取自定义分享朋友圈/朋友内容
export function getShareInfoDesc() {
    let res = request('/home/Wechat/getShareInfo', 'POST')
    return res
}
