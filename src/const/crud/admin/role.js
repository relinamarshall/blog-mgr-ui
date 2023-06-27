export const tableOption = {
    border: true,
    index: true,
    indexLabel: '序号',
    indexWidth: 60,
    stripe: true,
    menuAlign: 'center',
    editBtn: false,
    delBtn: false,
    searchMenuSpan: 6,
    menuWidth: 300,
    dialogWidth: '30%',
    align: 'center',
    addBtn: false,
    viewBtn: true,
    column: [{
        label: '角色名称',
        span: 24,
        prop: 'name',
        rules: [{
            required: true,
            message: '角色名称不能为空',
            trigger: 'blur'
        },
            {
                min: 3,
                max: 20,
                message: '长度在 3 到 20 个字符',
                trigger: 'blur'
            }]
    }, {
        width: 200,
        span: 24,
        label: '角色标识',
        prop: 'code',
        editDisabled: true,
        rules: [{
            required: true,
            message: '角色标识不能为空',
            trigger: 'blur'
        },
            {
                min: 3,
                max: 20,
                message: '长度在 3 到 20 个字符',
                trigger: 'blur'
            }
        ]
    }, {
        label: '角色描述',
        prop: 'des',
        overHidden: true,
        span: 24,
        rules: [{
            required: true,
            message: '角色描述不能为空',
            trigger: 'blur'
        },
            {
                min: 3,
                max: 100,
                message: '长度在 3 到 100 个字符',
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
