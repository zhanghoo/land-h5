import { request, instance } from '@/utils/request'

// 查看评论
export function getCommentDetails(commentID, userID) {
    let res = request('/api/home/dynamic/lookCommentDetails', 'POST', { 'cid': commentID, 'uid': userID })
    return res
}

// 评论点赞
export function postZan(commentID, userID) {
    let res = request('/api/home/dynamic/commentFabulous', 'POST', { 'cid': commentID, 'uid': userID })
    return res
}

// 发布评论
export function postPublish(commentID, userID, title, text, is_pay, money, images) {
    let params = {
        'cid': commentID,
        'uid': userID,
        'title': title,
        'text': text,
        'is_pay': is_pay,
        'money': money,
        'images': images
    }
    let res = request('/api/home/dynamic/commentFabulous', 'POST', params)
    return res
}