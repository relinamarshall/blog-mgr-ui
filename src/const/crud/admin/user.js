import {isExist} from '@/api/admin/user'

export const validateUsername = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入用户名'))
    }
    const flag = new RegExp(/^([a-z\d]+?)$/).test(value)
    if (!flag) {
        callback(new Error('用户名支持小写英文、数字'))
    }

    if (window.boxType === 'edit') {
        return callback()
    }

    isExist({username: value}).then(response => {
        const result = response.data.data
        if (result) {
            return callback(new Error('用户名已经存在'))
        } else {
            return callback()
        }
    })
}

// 设置密码校验规则
export const checkPassword = (rule, value, callback) => {
    if (window.boxType === 'edit') {
        return callback()
    }
    if (!value) {
        callback(new Error('请输入密码'))
    } else if (value.length <= 6) {
        callback(new Error('请输入6位以上密码'))
    } else {
        callback()
    }
}

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
        label: '用户名',
        prop: 'username',
        editDisabled: true,
        slot: true,
        search: true,
        searchSpan: 5,
        span: 24,
        rules: [{
            required: true, message: '请输入用户名'
        }, {
            min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'
        }, {validator: validateUsername, trigger: 'blur'}]
    }, {
        label: '密码',
        prop: 'password',
        type: 'password',
        value: '',
        hide: true,
        span: 24,
        rules: [{validator: checkPassword, trigger: 'blur'}]
    }, {
        span: 24,
        label: '角色',
        prop: 'role',
        slot: true,
        search: true,
        type: 'select',
        searchMultiple: true,
        dicUrl: '/admin/role/list',
        props: {
            label: 'name',
            value: 'id'
        },
        overHidden: true,
        rules: [{
            required: true, message: '请选择角色', trigger: 'blur'
        }]
    }, {
        label: '状态',
        prop: 'lockFlag',
        type: 'radio',
        border: true,
        span: 24,
        value: '0',
        dicUrl: '/admin/dict/key/user_lock_flag',
        props: {
            label: 'content',
            value: 'code'
        },
        rules: [{
            required: true, message: '请选择状态', trigger: 'blur'
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
