import { request } from '@/utils/request'

// 系统消息
export function getSystemNews() {
    let res = request('http://di.php0.jxcraft.net/public/index.php/home/system/radio', 'POST')
    return res
}

// 排行榜
export function getRankList() {
    let res = request('http://di.php0.jxcraft.net/public/index.php/home/system/rankList', 'POST')
    return res
}

// 公告列表
export function getLandBusinessList(page) {
    let res = request('http://di.php0.jxcraft.net/public/index.php/home/index/landBusinessList', 'POST', { 'p': page })
    return res
}

// 用户签到
export function postSign() {
    let res = request('http://di.php0.jxcraft.net/public/index.php/home/user/signIn', 'POST')
    return res
}

// 热门城市
export function getHotCity() {
    let res = request('http://di.php0.jxcraft.net/public/index.php/home/Index/getHotCity', 'POST')
    return res
}
