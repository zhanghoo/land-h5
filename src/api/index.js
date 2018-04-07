import { request, instance } from '@/utils/request'

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

// 获取用户信息
export function getUserInfo(userid) {
    let res = request('/api/home/user/UserInfo', 'POST', { 'user_id': userid })
    return res
}

// 修改个人资料
export function postUserInfo({ userid, username, avatar }) {
    let params = { 'user_id': userid, 'nick_name': username, 'avatar': avatar }
    let form = new FormData()
    Object.keys(params).forEach(key => {
        form.append(key, params[key])
    })
    let res = instance.post('/api/home/user/UserInfo', form, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res
}

// 大师币操作记录
export function getCoinRecord(userid) {
    let res = request('/api/home/user/coinRecord', 'POST', { 'user_id': userid })
    return res
}

// 转赠大师币
export function postSendCoin({ presentUserid, presentNumber }) {
    let res = request('/api/home/user/sendCoin', 'POST', { 'user_id': presentUserid, 'num': presentNumber })
    return res
}

// 大师积分操作记录
export function getScoreRecord(userid) {
    let res = request('/api/home/user/scoreRecord', 'POST', { 'user_id': userid })
    return res
}

// 积分规则
export function getScoreRule() {
    let res = request('/api/home/user/scoreRule', 'POST')
    return res
}

// 用户反馈
export function postFeedBack(content) {
    let res = request('/api/home/user/feedback', 'POST', { content })
    return res
}
