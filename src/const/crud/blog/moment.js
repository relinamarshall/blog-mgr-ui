export const tableOption = {
    border: true,
    index: true,
    indexLabel: '序号',
    indexWidth: 60,
    stripe: true,
    menuAlign: 'center',
    dialogWidth: '30%',
    editBtn: false,
    delBtn: false,
    align: 'center',
    addBtn: false,
    menuWidth: '300',
    searchMenuSpan: 6,
    searchMenuPosition: 'left',
    column: [{
        fixed: true,
        span: 24,
        label: '动态内容',
        prop: 'content',
        overHidden: true,
        search: true,
        searchSpan: 5,
        addDisplay: false,
        editDisplay: false
    }, {
        label: '点赞数量',
        span: 24,
        prop: 'likes',
        value: 0,
        addDisplay: false,
        editDisplay: false
    }, {
        label: '公开标记',
        span: 24,
        prop: 'pubFlag',
        value: '0',
        border: true,
        type: 'radio',
        dicData: [{
            label: '公开',
            value: '0'
        }, {
            label: '私有',
            value: '1'
        }],
        rules: [{
            required: true, message: '请选择公开标记', trigger: 'blur'
        }]
    }, {
        hide: true,
        width: 160,
        label: '创建时间',
        prop: 'crtTm',
        type: 'datetime',
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        editDisplay: false,
        addDisplay: false,
        span: 24
    }, {
        hide: true,
        width: 160,
        label: '更新时间',
        prop: 'updTm',
        type: 'datetime',
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        editDisplay: false,
        addDisplay: false,
        span: 24
    }]
}
