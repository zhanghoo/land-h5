// import { request, instance } from '@/utils/request'
import { request } from '@/utils/request'

// 获取动态列表
export function getMomentList() {
    let res = request('/momentList', 'GET')
    return res
}
