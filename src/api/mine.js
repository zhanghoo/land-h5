import { request, instance } from '@/utils/request'

// 获取用户主页（自己）
export function getMineInfo(user_id) {
    let res = request('/home/user/myPage', 'POST', { 'user_id': user_id })
    return res
}

// 获取用户主页（他人）
export function getUserDetail({ user_id, page }) {
    let res = request('/home/system/userHomePage', 'POST', { 'user_id': user_id, 'p': page })
    return res
}

// 修改个人资料
export async function postUserInfo({ userid, username, phone, avatar }) {
    let params = { 'user_id': userid, 'nick_name': username, 'phone': phone, 'avatar': avatar }
    let form = new FormData()
    Object.keys(params).forEach(key => {
        form.append(key, params[key])
    })
    let res = await instance.post('/home/user/UserInfo', form, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res
}

// 参与记录
export function getEvaluateRecord(type) {
    let res = request('/home/user/evaluateRecord', 'POST', { type })
    return res
}

// 成交详情
export function getEvaluateDetail(record_id) {
    let res = request('/home/user/evaluateDetail', 'POST', { 'record_id': record_id })
    return res
}

// 大师币操作记录
export function getCoinRecord(userid) {
    let res = request('/home/user/coinRecord', 'POST', { 'user_id': userid })
    return res
}

// 转赠大师币
// 转赠测试id 31192016
export function postSendCoin({ presentUserid, presentNumber }) {
    let res = request('/home/user/sendCoin', 'POST', { 'user_id': presentUserid, 'num': presentNumber })
    return res
}

// 大师积分操作记录
export function getScoreRecord(userid) {
    let res = request('/home/user/scoreRecord', 'POST', { 'user_id': userid })
    return res
}

// 积分规则
export function getScoreRule() {
    let res = request('/home/user/scoreRule', 'POST')
    return res
}

// 充值
export function getAccount() {
    let res = request('/home/user/getAccount', 'POST')
    return res
}

// 立即充值
export function postRecharge(money, user_id) {
    let res = request('/home/Pay/charge', 'POST', { 'goods_id': money, 'user_id': user_id })
    return res
}

// 提现
export function getMoney(money) {
    let res = request('/home/User/getMoney', 'POST', { 'money': money })
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
    let res = await instance.post('/home/user/authValidate', form, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res.data
}

// 用户反馈
export function postFeedBack(content) {
    let res = request('/home/user/feedback', 'POST', { content })
    return res
}
