<template>
    <div class="app-container calendar-list-container">
        <el-form :model="form" :rules="formRules" style="padding: 10px" ref="formRef" label-position="top">
            <el-form-item label="动态正文" prop="content">
                <mavon-editor style="width: 100vw;min-height: 70vh;max-height: 100vh" v-model="form.content"/>
            </el-form-item>
            <el-row type="flex" class="row-bg" justify="center">
                <el-button
                    v-if="permissions.blog_moment_add"
                    class="filter-item"
                    icon="el-icon-edit"
                    type="primary" @click="submit">保存</el-button>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getObj, putObj, addObj} from '@/api/blog/moment'

export default {
    name: 'WriteMoment',
    data() {
        return {
            form: {
                id: '',
                content: ''
            },
            formRules: {
                content: [{required: true, message: '请输入内容', trigger: 'change'}]
            }
        }
    },
    computed: {
        ...mapGetters(['permissions'])
    },
    watch: {
        $route: {
            handler() {
                if (this.$route.query.id) {
                    this.getMoment(this.$route.query.id);
                }
            },
            deep: true
        }
    },
    mounted() {
        if (this.$route.query.id) {
            this.getMoment(this.$route.query.id);
        }
    },
    methods: {
        getMoment(id) {
            getObj(id).then(res => {
                let {id, content} = res.data.data
                this.form = {
                    id, content
                }
            });
        },
        submit() {
            this.$refs.formRef.validate(valid => {
                if (valid) {
                    if (this.form.id) {
                        putObj(this.form).then(res => {
                            if (res.data.code === 0) {
                                this.$notify.success('修改成功');
                            }
                        });
                    } else {
                        addObj(this.form).then(res => {
                            if (res.data.code === 0) {
                                this.$notify.success('创建成功');
                            }
                        });
                    }
                    this.form = {}
                    this.$router.push('/blog/moment/index')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
