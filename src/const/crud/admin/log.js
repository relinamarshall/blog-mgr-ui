export const tableOption = {
    border: true,
    index: true,
    indexLabel: '序号',
    indexWidth: 60,
    stripe: true,
    menuAlign: 'center',
    align: 'center',
    addBtn: false,
    editBtn: false,
    viewBtn: true,
    searchMenuSpan: 6,
    searchMenuPosition: 'left',
    props: {
        label: 'label',
        value: 'value'
    },
    column: [{
        label: '类型',
        prop: 'type',
        type: 'select',
        dicUrl: '/admin/dict/key/log_type',
        props: {
            label: 'content',
            value: 'code'
        },
    }, {
        label: '标题',
        prop: 'title'
    }, {
        label: 'IP地址',
        prop: 'remoteAddr',
        search: true,
        searchSpan: 5,
    }, {
        label: '请求方式',
        prop: 'method'
    }, {
        label: '客户端',
        prop: 'serviceId'
    }, {
        width: 80,
        label: '请求时间',
        prop: 'time'
    }, {
        width: 200,
        label: '创建时间',
        prop: 'crtTm',
        type: 'datetime',
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        rangeSeparator: '-',
        search: true,
        searchSpan: 9,
        searchRange: true
    }, {
        width: 180,
        label: '异常日志',
        prop: 'exception',
        hide: true
    }]
}
