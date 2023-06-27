<template>
    <div class="app-container calendar-list-container">
        <el-form :model="form" :rules="formRules" style="padding: 10px" ref="formRef" label-position="top">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="文章标题" prop="title">
                        <el-input type="textarea" maxlength="255" show-word-limit rows="4"
                                  v-model="form.title" placeholder="请输入标题"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="8">
                    <el-form-item label="分类" prop="categoryId">
                        <el-select v-model="form.categoryId" placeholder="请选择分类（输入可添加新分类）"
                                   :allow-create="true" :filterable="true" style="width: 100%;">
                            <el-option :label="item.name" :value="item.id" v-for="item in categoryList" :key="item.id"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="类型" prop="type" style="margin-left: 10px">
                        <el-select v-model="form.type" placeholder="请选择类型"
                                   :allow-create="true" :filterable="true" style="width: 100%;">
                            <el-option :label="item.content" :value="item.code" v-for="item in typeList"
                                       :key="item.code"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="标签" prop="tagList" style="margin-left: 10px">
                        <el-select v-model="form.tagList" placeholder="请选择标签（输入可添加新标签）"
                                   :allow-create="true" :filterable="true" :multiple="true" style="width: 100%;">
                            <el-option :label="item.name" :value="item.id" v-for="item in tagList" :key="item.id"/>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="文章描述" prop="des">
                        <mavon-editor style="width: 100vw;min-height: 30vh;max-height: 40vh;" ref="mavonDes"
                                      v-model="form.des"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="文章正文" prop="content">
                        <mavon-editor style="width: 100vw;min-height: 50vh; max-height: 150vh;" ref="mavonContent"
                                      v-model="form.content"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="center">
                <el-button v-if="permissions.blog_moment_add" class="filter-item"
                           icon="el-icon-edit" type="primary" @click="submit">保存
                </el-button>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {addObj, putObj, getObj, getOtherInfo} from '@/api/blog/blog'
import {remote} from '@/api/admin/dict'

export default {
    name: 'WriteBlog',
    data() {
        return {
            categoryList: [],
            tagList: [],
            typeList: [],
            form: {
                id: '',
                title: '',
                des: '',
                type: '',
                content: '',
                categoryId: '',
                tagList: []
            },
            formRules: {
                title: [{required: true, message: '请输入标题', trigger: 'change'}],
                type: [{required: true, message: '请选择标题', trigger: 'change'}],
                categoryId: [{required: true, message: '请选择分类', trigger: 'change'}],
                tagList: [{required: true, message: '请选择标签', trigger: 'change'}],
                des: [{required: true, message: '请输入描述', trigger: 'change'}],
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
                this.initInfo()
            },
            deep: true
        }
    },
    mounted() {
        this.initInfo()
    },
    methods: {
        initInfo() {
            this.getData()
            if (this.$route.query.id) {
                this.getBlog(this.$route.query.id)
            }
        },
        getData() {
            remote('blog_type').then(r => {
                if (r.data.code === 0) {
                    this.typeList = r.data.data
                }
            })
            getOtherInfo().then(r => {
                if (r.data.code === 0) {
                    this.tagList = r.data.data.tagList
                    this.categoryList = r.data.data.categoryList
                }
            })
        },
        getBlog(id) {
            this.form = {}
            getObj(id).then(res => {
                if (res.data.code === 0) {
                    let {id, title, type, categoryId, tagIdsList, des, content} = res.data.data
                    this.form = {
                        id, title, type, categoryId, des, content,
                        'tagList': tagIdsList
                    }
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
                    this.$router.push('/blog/blog/index')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
