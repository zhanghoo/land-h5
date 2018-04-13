import { request } from '@/utils/request'

// 系统消息
export function getSystemNews() {
    let res = request('/api/home/system/radio', 'POST')
    return res
}

// 排行榜
export function getRankList() {
    let res = request('/api/home/system/rankList', 'POST')
    return res
}

// 公告列表
export function getLandBusinessList(page) {
    let res = request('/api/home/index/landBusinessList', 'POST', { 'p': page })
    return res
}

// 用户签到
export function postSign() {
    let res = request('/api/home/user/signIn', 'POST')
    return res
}
