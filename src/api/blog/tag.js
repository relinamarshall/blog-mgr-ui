import request from '@/router/axios'

export function fetchList(query) {
    return request({
        url: '/blog/tag/page',
        method: 'get',
        params: query
    })
}

export function tagList() {
    return request({
        url: '/blog/tag/list',
        method: 'get'
    })
}

export function getObj(id) {
    return request({
        url: `/blog/tag/${id}`,
        method: 'get'
    })
}

export function addObj(obj) {
    return request({
        url: '/blog/tag',
        method: 'post',
        data: obj
    })
}

export function putObj(obj) {
    return request({
        url: '/blog/tag',
        method: 'put',
        data: obj
    })
}

export function delObj(id) {
    return request({
        url: `/blog/tag/${id}`,
        method: 'delete'
    })
}
