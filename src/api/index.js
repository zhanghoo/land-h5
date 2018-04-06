// import { request, instance } from '@/utils/request'
import { request } from '@/utils/request'

// 获取动态列表
export function getMomentList() {
    let res = request('/momentList', 'GET')
    return res
}

// 获取动态详情
export function getMomentDetail(id) {
    let res = request('/momentDetail', 'GET', {'id': id})
    return res
}
