import { request } from '@/utils/request'

// 搜索框（房产地价估价）
// keyWord, cityID, type 全传0时 默认返回第一进入时所展示内容
export function getSearchDetail({ keyWord, cityID, type, page }) {
    let res = request('/home/index/landSeach', 'POST', { 'wd': keyWord, 'cid': cityID, 'type': type, 'p': page })
    return res
}

// 房产地块概况
export function getLandAbstract({ pid, uid, page }) {
    let res = request('/home/index/landDescAbstract', 'POST', { 'pid': pid, 'uid': uid, 'p': page })
    return res
}

// 房产地块详情
export function getLandDetail({ pid, uid }) {
    let res = request('/home/index/landDescDetails', 'POST', { 'pid': pid, 'uid': uid })
    return res
}

// 参与估价
export function postLandEvaluation({ pid, uid, money }) {
    let res = request('/home/index/landEvaluation', 'POST', { 'pid': pid, 'uid': uid, 'money': money })
    return res
}

// 获取全国省份数据
export function getProvince() {
    let res = request('/geograph/province', 'GET')
    return res
}

// 获取城市数据
export function getCity(provinceCode) {
    let res = request('/geograph/citys', 'GET', { 'code': provinceCode })
    return res
}

// 获取交易信息
export function getLandBusinessTransaction(bid) {
    let res = request('/home/index/landBusinessTransaction', 'POST', { 'bid': bid })
    return res
}
