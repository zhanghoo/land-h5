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
