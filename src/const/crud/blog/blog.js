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
    menuWidth: '300',
    column: [{
        span: 24,
        label: '标题',
        prop: 'title',
        type: 'textarea',
        overHidden: true,
        search: true,
        searchSpan: 6,
        rules: [{
            required: true, message: '请输入标题', trigger: 'blur'
        }]
    }, {
        span: 24,
        label: '描述',
        prop: 'des',
        hide: true,
        overHidden: true,
        addDisplay: false,
        editDisplay: false
    }, {
        span: 24,
        label: '正文',
        prop: 'content',
        hide: true,
        overHidden: true,
        addDisplay: false,
        editDisplay: false
    }, {
        span: 24,
        label: '分类',
        prop: 'categoryId',
        type: 'select',
        dicUrl: '/blog/category/list',
        search: true,
        searchSpan: 6,
        props: {
            label: 'name',
            value: 'id'
        },
        rules: [{
            required: true, message: '请选择分类', trigger: 'blur'
        }]
    }, {
        span: 24,
        label: '类型',
        prop: 'type',
        type: 'select',
        dicUrl: '/admin/dict/key/blog_type',
        props: {
            label: 'content',
            value: 'code'
        },
        rules: [{
            required: true, message: '请选择文章类型', trigger: 'blur'
        }]
    }, {
        span: 24,
        label: '标签',
        prop: 'tagList',
        slot: true,
        type: 'select',
        dicUrl: '/blog/tag/list',
        overHidden: true,
        props: {
            label: 'name',
            value: 'id'
        },
        rules: [{
            required: true, message: '请选择标签', trigger: 'blur'
        }]
    }, {
        span: 24,
        label: '文章字数',
        prop: 'words',
        value: 0,
        hide: true,
        addDisplay: false,
        editDisplay: false
    }, {
        width: 120,
        label: '阅读时长(分)',
        span: 24,
        prop: 'readTm',
        value: 0,
        hide: true,
        addDisplay: false,
        editDisplay: false
    }, {
        label: '浏览次数',
        span: 24,
        prop: 'views',
        value: 0,
        hide: true,
        addDisplay: false,
        editDisplay: false
    }, {
        label: '公开类型',
        span: 24,
        prop: 'pubType',
        value: '0',
        type: 'select',
        dicUrl: '/admin/dict/key/blog_pub_type',
        props: {
            label: 'content',
            value: 'code'
        },
        rules: [{
            required: true, message: '请选择公开标记', trigger: 'blur'
        }]
    }, {
        label: '密码',
        span: 24,
        prop: 'password',
        value: '',
        hide: true
    }, {
        label: '置顶标记',
        span: 24,
        border: true,
        prop: 'topFlag',
        value: '0',
        type: 'radio',
        dicData: [{
            label: '关闭',
            value: '0'
        }, {
            label: '开启',
            value: '1'
        }],
        rules: [{
            required: true, message: '请选择置顶标记', trigger: 'blur'
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
