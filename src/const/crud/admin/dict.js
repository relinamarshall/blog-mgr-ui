export const tableOption = {
    border: true,
    index: true,
    indexLabel: '序号',
    indexWidth: 60,
    stripe: true,
    menuAlign: 'center',
    align: 'center',
    refreshBtn: false,
    showClomnuBtn: false,
    dialogWidth: '30%',
    searchMenuSpan: 6,
    searchMenuPosition: 'left',
    column: [{
        label: '编码',
        prop: 'code',
        span: 24,
        search: true,
        editDisabled: true,
        rules: [{
            required: true,
            message: '请输入字典编码',
            trigger: 'blur'
        }]
    }, {
        label: '描述',
        prop: 'des',
        span: 24,
        rules: [{
            required: true,
            message: '请输入字典描述',
            trigger: 'blur'
        }]
    }, {
        label: '字典类型',
        prop: 'sysCfgFlag',
        type: 'radio',
        span: 24,
        border: true,
        dicUrl: '/admin/dict/key/dict_type',
        props: {
            label: 'content',
            value: 'code'
        },
        rules: [{
            required: true,
            message: '请选择字典类型',
            trigger: 'blur'
        }]
    }, {
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

export const tableDictItemOption = {
    border: true,
    index: true,
    indexLabel: '序号',
    indexWidth: 60,
    stripe: true,
    menuAlign: 'center',
    align: 'center',
    refreshBtn: true,
    showClomnuBtn: false,
    dialogWidth: '30%',
    searchSize: 'mini',
    column: [{
        label: '字典',
        prop: 'dictKey',
        span: 24,
        addDisabled: true,
        editDisabled: true
    }, {
        label: '键',
        span: 24,
        prop: 'code',
        rules: [{
            required: true,
            message: '请输入值',
            trigger: 'blur'
        }]
    }, {
        label: '值',
        span: 24,
        prop: 'content',
        rules: [{
            required: true,
            message: '请输入值',
            trigger: 'blur'
        }]
    }, {
        label: '类型',
        span: 24,
        hide: true,
        prop: 'type'
    }, {
        label: '描述',
        span: 24,
        prop: 'des',
        rules: [{
            required: true,
            message: '请输入字典描述',
            trigger: 'blur'
        }]
    }]
}
