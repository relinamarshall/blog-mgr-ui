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
        span: 24,
        label: '标签名称',
        prop: 'name',
        search: true,
        searchSpan: 5,
        rules: [{
            required: true,
            message: '标签名称不能为空'
        }]
    }, {
        span: 24,
        width: 200,
        label: '标签颜色',
        prop: 'color',
        rules: [{
            required: true,
            message: '标签颜色不能为空'
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
