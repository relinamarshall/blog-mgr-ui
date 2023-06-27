import request from '@/router/axios'

export function fetchList(query) {
    return request({
        url: '/blog/category/page',
        method: 'get',
        params: query
    })
}

export function tagList() {
    return request({
        url: '/blog/category/list',
        method: 'get'
    })
}

export function getObj(id) {
    return request({
        url: `/blog/category/${id}`,
        method: 'get'
    })
}

export function addObj(obj) {
    return request({
        url: '/blog/category',
        method: 'post',
        data: obj
    })
}

export function putObj(obj) {
    return request({
        url: '/blog/category',
        method: 'put',
        data: obj
    })
}

export function delObj(id) {
    return request({
        url: `/blog/category/${id}`,
        method: 'delete'
    })
}
