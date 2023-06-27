import request from '@/router/axios'

export function fetchList(query) {
    return request({
        url: '/blog/friend/page',
        method: 'get',
        params: query
    })
}

export function tagList() {
    return request({
        url: '/blog/friend/list',
        method: 'get'
    })
}

export function getObj(id) {
    return request({
        url: `/blog/friend/${id}`,
        method: 'get'
    })
}

export function addObj(obj) {
    return request({
        url: '/blog/friend',
        method: 'post',
        data: obj
    })
}

export function putObj(obj) {
    return request({
        url: '/blog/friend',
        method: 'put',
        data: obj
    })
}

export function delObj(id) {
    return request({
        url: `/blog/friend/${id}`,
        method: 'delete'
    })
}
