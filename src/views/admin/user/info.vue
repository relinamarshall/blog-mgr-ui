<template>
    <div class="app-container calendar-list-container">
        <basic-container>
            <el-tabs @tab-click="switchTab">
                <el-tab-pane label="信息管理" name="userManager"/>
                <el-tab-pane label="密码管理" name="passwordManager"/>
            </el-tabs>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form
                            v-if="switchStatus==='userManager'"
                            ref="userInfoForm"
                            :model="userInfoForm"
                            label-width="100px"
                            class="demo-ruleForm">
                            <el-form-item
                                label="头像"
                                prop="avatar">
                                <ImageUpload v-model="userInfoForm.avatar"/>
                            </el-form-item>
                            <el-form-item
                                label="用户名"
                                prop="username">
                                <el-input
                                    v-model="userInfoForm.username"
                                    type="text"
                                    disabled>
                                    <template #prefix>
                                        <i class="icon-yonghu"></i>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    type="primary"
                                    @click="submitForm('userInfoForm')">提交
                                </el-button>
                                <el-button @click="resetForm('userInfoForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                        <el-form
                            v-if="switchStatus==='passwordManager'"
                            ref="passwordForm"
                            :model="passwordForm"
                            :rules="passwordFormRules"
                            label-width="100px"
                            class="demo-ruleForm">
                            <el-form-item
                                label="原密码"
                                prop="password">
                                <el-input
                                    v-model="passwordForm.password"
                                    type="password"
                                    auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item
                                label="密码"
                                prop="newpassword1">
                                <el-input
                                    v-model="passwordForm.newpassword1"
                                    type="password"
                                    auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item
                                label="确认密码"
                                prop="newpassword2">
                                <el-input
                                    v-model="passwordForm.newpassword2"
                                    type="password"
                                    auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    type="primary"
                                    @click="submitForm('passwordForm')">提交
                                </el-button>
                                <el-button @click="resetForm('passwordForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </basic-container>
    </div>
</template>


<script>
import {mapState} from 'vuex'
import ImageUpload from '@/components/ImageUpload/index.vue'
import {editInfo} from '@/api/admin/user.js'

export default {
    components: {ImageUpload},
    data() {
        const validatePass = (rule, value, callback) => {
            if (this.passwordForm.password !== '') {
                if (value !== this.passwordForm.newpassword1) {
                    debugger
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback()
                }
            } else {
                callback()
            }
        }
        return {
            switchStatus: '',
            codeShow: false,
            userInfoForm: {
                username: '',
                avatar: ''
            },
            passwordForm: {
                password: '',
                newpassword1: '',
                newpassword2: '',
            },
            passwordFormRules: {
                password: [{required: true, min: 6, message: '原密码不能为空且不少于6位', trigger: 'change'}],
                newpassword1: [{required: false, min: 6, message: '不少于6位', trigger: 'change'}],
                newpassword2: [{required: false, validator: validatePass, trigger: 'blur'}]
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo
        })
    },
    created() {
        // 初始化表格默认值
        this.switchStatus = 'userManager'
        this.userInfoForm.username = this.userInfo.username
        this.userInfoForm.avatar = this.userInfo.avatar
    },
    methods: {
        switchTab(tab) {
            this.switchStatus = tab.paneName
        },
        submitForm(formName) {
            if (this.switchStatus === 'userManager') {
                this.$refs.smsCodeForm.validate((valid2) => {
                    if (valid2) {
                        this.edit(this.userInfoForm)
                    }
                })
            }

            if (this.switchStatus === 'passwordManager') {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.edit(this.passwordForm)
                    }
                })
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        edit(form) {
            editInfo(form).then(response => {
                if (response.data.data) {
                    // 更新Vuex个人信息
                    this.$store.dispatch('GetUserInfo')
                    this.$message.success('修改成功')
                } else {
                    this.$message.error(response.data.msg)
                }
            })
        }
    }
}
</script>
