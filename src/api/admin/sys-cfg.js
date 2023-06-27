import request from '@/router/axios'

export function fetchList(query) {
    return request({
        url: '/admin/sys/page',
        method: 'get',
        params: query
    })
}

export function addObj(obj) {
    return request({
        url: '/admin/sys',
        method: 'post',
        data: obj
    })
}

export function getObj(key) {
    return request({
        url: `/admin/sys/type/${key}`,
        method: 'get'
    })
}

export function delObj(id) {
    return request({
        url: `/admin/sys/${id}`,
        method: 'delete'
    })
}

export function putObj(obj) {
    return request({
        url: '/admin/sys',
        method: 'put',
        data: obj
    })
}

export function refreshCache() {
    return request({
        url: '/admin/sys/sync',
        method: 'put'
    })
}
