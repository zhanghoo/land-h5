import { request, instance } from '@/utils/request'

// 我的页面
export function getMineInfo() {
    let res = request('/api/home/user/myPage', 'POST')
    return res
}

// 用户主页
export function getUserMoment() {
    let res = request('/api/home/system/userHomePage', 'POST')
    return res
}

// 用户主页
// 测试ID 61230468
export function getUserDetail(userid) {
    let res = request('/api/home/system/userHomePage', 'POST', { 'user_id': userid })
    return res
}

// 获取个人资料
// 测试ID 61230468
export function getUserInfo(userid) {
    let res = request('/api/home/user/UserInfo', 'POST', { 'user_id': userid })
    return res
}

// 修改个人资料
export async function postUserInfo({ userid, username, avatar }) {
    let params = { 'user_id': userid, 'nick_name': username, 'avatar': avatar }
    let form = new FormData()
    Object.keys(params).forEach(key => {
        form.append(key, params[key])
    })
    let res = await instance.post('/api/home/user/UserInfo', form, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res
}

// 参与记录
export function getEvaluateRecord(type) {
    let res = request('/api/home/user/evaluateRecord', 'POST', { type })
    return res
}

// 成交详情
export function getEvaluateDetail(record_id) {
    let res = request('/api/home/user/evaluateDetail', 'POST', { 'record_id': record_id })
    return res
}

// 大师币操作记录
export function getCoinRecord(userid) {
    let res = request('/api/home/user/coinRecord', 'POST', { 'user_id': userid })
    return res
}

// 转赠大师币
// 转赠测试id 31192016
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

// 充值
export function getAccount() {
    let res = request('/api/home/user/getAccount', 'POST')
    return res
}

// 身份验证
export async function postAuthValidate({ company, file }) {
    let params = {
        'company': company,
        'file': file
    }
    let form = new FormData()
    Object.keys(params).forEach(key => {
        form.append(key, params[key])
    })
    let res = await instance.post('/api/home/user/authValidate', form, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res.data
}

// 用户反馈
export function postFeedBack(content) {
    let res = request('/api/home/user/feedback', 'POST', { content })
    return res
}
