import { request, instance } from '@/utils/request'

// 查看评论
export function getCommentDetails(commentID, userID) {
    let res = request('/api/home/dynamic/lookCommentDetails', 'POST', { 'cid': commentID, 'uid': userID })
    return res
}

// 评论点赞
export function postZan({cid, uid}) {
    let res = request('/api/home/dynamic/commentFabulous', 'POST', { 'cid': cid, 'uid': uid })
    return res
}

// 发布评论
export function postPublish({pid, uid, title, text, is_pay, money, images}) {
    let params = {
        'pid': pid,
        'uid': uid,
        'title': title,
        'text': text,
        'is_pay': is_pay,
        'money': money,
        'images': images
    }
    let form = new FormData()
    Object.keys(params).forEach(key => {
        form.append(key, params[key])
    })
    let res = instance.post('/api/home/dynamic/releaseComment', form, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res
}
