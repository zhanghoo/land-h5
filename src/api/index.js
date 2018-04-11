import { request } from '@/utils/request'

// 搜索框（房产地价估价）
export function getSearchDetail({ keyWord, cityID, type }) {
    let res = request('/api/home/index/landDescDetails', 'POST', { 'wd': keyWord, 'cid': cityID, 'type': type })
    return res
}

// 房产地块概况
export function getLandAbstract({ pid, uid }) {
    let res = request('/api/home/index/landDescAbstract', 'POST', { 'pid': pid, 'uid': uid })
    return res
}

// 房产地块详情
export function getLandDetail({ pid, uid }) {
    let res = request('/api/home/index/landDescDetails', 'POST', { 'pid': pid, 'uid': uid })
    return res
}

// 获取全国省份数据
export function getProvince() {
    let res = request('/api/geograph/province', 'GET')
    return res
}

// 微信登录
export function wxLogin() {
    let res = request('/api/home/wechat/login', 'POST')
    return res
}

// 微信分享
export function wxShare(url) {
    let res = request('/api/home/wechat/share', 'POST', { 'url': url })
    return res
}

// 获取城市数据
export function getCity(provinceCode) {
    let res = request('/api/geograph/citys', 'GET', { 'code': provinceCode })
    return res
}

// 以下是模拟的数据

// 获取动态列表
export function getMomentList() {
    let res = request('http://liansixin.win/momentList', 'GET')
    return res
}

// 获取动态详情
export function getMomentDetail(id) {
    let res = request('http://liansixin.win/momentDetail', 'GET', { 'id': id })
    return res
}
