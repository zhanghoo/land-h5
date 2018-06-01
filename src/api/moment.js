import { request, instance } from '@/utils/request'

// 动态列表
export function getMomentList({ page, uid }) {
    let res = request('/home/dynamic/lookCommentList', 'POST', { 'p': page, 'uid': uid })
    return res
}

// 动态详情
export function getMomentDetail({ cid, uid }) {
    let res = request('/home/dynamic/lookCommentDetails', 'POST', { 'cid': cid, 'uid': uid })
    return res
}

// 查看评论
export function getCommentDetails({ commentID, uid }) {
    let res = request('/home/dynamic/lookCommentDetails', 'POST', { 'cid': commentID, 'uid': uid })
    return res
}

// 评论点赞
export function postZan({ cid, uid }) {
    let res = request('/home/dynamic/commentFabulous', 'POST', { 'cid': cid, 'uid': uid })
    return res
}

// 是否显示收费勾选项
export function getCommentLevel({ uid }) {
    let res = request('/home/dynamic/commentLevel', 'POST', { 'uid': uid })
    return res
}

// 发布评论
export async function postPublish({ pid, uid, title, text, is_pay, money, images, voice_id }) {
    let params = {
        'pid': pid,
        'uid': uid,
        'title': title,
        'text': text,
        'is_pay': is_pay,
        'money': money,
        'voice_id': voice_id
    }
    // 将图片以字段形式将文件上传, form-data对数组可能解析有问题
    for (let i = 0, len = images.length; i < len; i++) {
        params[`images[${i}]`] = images[i]
    }
    let form = new FormData()
    Object.keys(params).forEach(key => {
        form.append(key, params[key])
    })
    let res = await instance.post('/home/dynamic/releaseComment', form, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res.data
}

// 发布的金额选项
export function getPublishMoneyOptions() {
    let res = request('home/dynamic/getTemplate', 'POST')
    return res
}
