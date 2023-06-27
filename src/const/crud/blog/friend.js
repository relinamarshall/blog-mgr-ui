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
    searchMenuSpan: 6,
    searchMenuPosition: 'left',
    column: [{
        fixed: true,
        label: '头像',
        span: 24,
        prop: 'avatar'
    }, {
        label: '名称',
        prop: 'name',
        span: 24,
        overHidden: true,
        search: true,
        searchSpan: 5,
        rules: [{
            required: true,
            message: '名称不能为空'
        }, {
            max: 32, message: '最大32个字符', trigger: 'blur'
        }]
    }, {
        label: '描述',
        prop: 'des',
        span: 24,
        type: 'textarea',
        overHidden: true,
        search: true,
        searchSpan: 5,
        rules: [{
            required: true,
            message: '描述不能为空'
        }, {
            max: 255, message: '最大255个字符', trigger: 'blur'
        }]
    }, {
        label: '站点',
        prop: 'website',
        span: 24,
        overHidden: true,
        search: true,
        searchSpan: 5,
        rules: [{
            required: true,
            message: '站点不能为空'
        }]
    }, {
        label: '访问次数',
        span: 24,
        value: 0,
        addDisplay: false,
        editDisplay: false,
        prop: 'views'
    }, {
        span: 24,
        label: '公开标记',
        prop: 'pubFlag',
        value: '0',
        type: 'radio',
        border: true,
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
        width: 160,
        hide: true,
        label: '创建时间',
        prop: 'crtTm',
        type: 'datetime',
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        editDisplay: false,
        addDisplay: false,
        span: 24
    }, {
        width: 160,
        hide: true,
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
