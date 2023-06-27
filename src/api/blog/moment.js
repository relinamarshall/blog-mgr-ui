import request from '@/router/axios'

export function fetchList(query) {
    return request({
        url: '/blog/moment/page',
        method: 'get',
        params: query
    })
}

export function tagList() {
    return request({
        url: '/blog/moment/list',
        method: 'get'
    })
}

export function getObj(id) {
    return request({
        url: `/blog/moment/${id}`,
        method: 'get'
    })
}

export function addObj(obj) {
    return request({
        url: '/blog/moment',
        method: 'post',
        data: obj
    })
}

export function putObj(obj) {
    return request({
        url: '/blog/moment',
        method: 'put',
        data: obj
    })
}

export function delObj(id) {
    return request({
        url: `/blog/moment/${id}`,
        method: 'delete'
    })
}
