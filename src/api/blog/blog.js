import request from '@/router/axios'

export function fetchList(query) {
    return request({
        url: '/blog/blog/page',
        method: 'get',
        params: query
    })
}

export function tagList() {
    return request({
        url: '/blog/blog/list',
        method: 'get'
    })
}

export function getObj(id) {
    return request({
        url: `/blog/blog/${id}`,
        method: 'get'
    })
}

export function addObj(obj) {
    return request({
        url: '/blog/blog',
        method: 'post',
        data: obj
    })
}

export function putObj(obj) {
    return request({
        url: '/blog/blog',
        method: 'put',
        data: obj
    })
}

export function delObj(id) {
    return request({
        url: `/blog/blog/${id}`,
        method: 'delete'
    })
}

export function getOtherInfo() {
    return request({
        url: `/blog/blog/other/info`,
        method: 'get'
    })
}
