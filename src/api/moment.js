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
export function getCommentDetails({ commentID, userID }) {
    let res = request('/home/dynamic/lookCommentDetails', 'POST', { 'cid': commentID, 'uid': userID })
    return res
}

// 评论点赞
export function postZan({ cid, uid }) {
    let res = request('/home/dynamic/commentFabulous', 'POST', { 'cid': cid, 'uid': uid })
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
        'images': images,
        'voice_id': voice_id
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
