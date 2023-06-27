<template>
    <div class="app-container calendar-list-container">
        <basic-container>
            <avue-crud
                ref="crud"
                v-model:page="page"
                v-model="form"
                :option="tableOption"
                :data="list"
                :table-loading="listLoading"
                @on-load="getList"
                @size-change="sizeChange"
                :before-open="handleOpenBefore"
                @current-change="currentChange"
                @search-change="handleFilter"
                @refresh-change="handleRefreshChange"
                @row-update="update"
                @row-save="create">
                <template #type="scope">
                    <dict-tag :options="scope.dic" :value="scope.row.type"/>
                </template>
                <template #password-form="{}">
                    <el-input v-model="form.password"/>
                </template>
                <template #tagList="scope">
                      <span v-for="(r, index) in scope.row.tagList" :key="index">
                        <el-tag>{{ r.name }}</el-tag>&nbsp;
                      </span>
                </template>
                <template #menu-left="{}">
                    <el-button
                        v-if="permissions.blog_moment_add"
                        class="filter-item"
                        type="primary"
                        icon="el-icon-edit"
                        @click="$refs.crud.rowAdd()">添加
                    </el-button>
                </template>

                <template #menu="{row,index,size}">
                    <el-button
                        v-if="permissions.blog_moment_edit"
                        text
                        type="primary"
                        icon="el-icon-edit"
                        :size="size"
                        @click="handleEditContent(row,index)">修改内容
                    </el-button>
                    <el-button
                        v-if="permissions.blog_moment_edit"
                        text
                        type="primary"
                        icon="el-icon-edit"
                        :size="size"
                        @click="handleUpdate(row,index)">编辑信息
                    </el-button>
                    <el-button
                        v-if="permissions.blog_moment_del"
                        text
                        type="primary"
                        icon="el-icon-delete"
                        :size="size"
                        @click="handleDelete(row,index)">删除
                    </el-button>
                </template>
                <template #tagList-form>
                    <avue-select
                        v-model="tagList"
                        multiple
                        placeholder="请选择标签"
                        :dic="tagsOptions"
                        :props="tagProps"
                    ></avue-select>
                </template>
            </avue-crud>
        </basic-container>
    </div>
</template>

<script>
import {addObj, delObj, fetchList, putObj} from '@/api/blog/blog'
import {tableOption} from '@/const/crud/blog/blog'
import {mapGetters} from 'vuex'
import {tagList} from '@/api/blog/tag'

export default {
    name: 'TableMoment',
    data() {
        return {
            tagProps: {
                label: 'name',
                value: 'id'
            },
            searchForm: {},
            tableOption: tableOption,
            treeData: [],
            checkedKeys: [],
            page: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 20 // 每页显示多少条
            },
            list: [],
            listLoading: true,
            form: {},
            tagList: [],
            tagsOptions: [],
            display: false
        }
    },
    watch: {
        'form.pubType'(newValue) {
            this.tableOption.column.map(item=>{
                if (item['prop'] === 'password') {
                    item['display'] = newValue === '2'
                }
            })
            if (newValue !== '2') {
                this.form.password = ''
            }
        },
        tagList() {
            this.form.tagList = this.tagList
        }
    },
    computed: {
        ...mapGetters(['permissions'])
    },
    methods: {
        getList(page, params) {
            this.listLoading = true
            fetchList(Object.assign({current: page.currentPage, size: page.pageSize},
                params, this.searchForm)).then(response => {
                this.list = response.data.data.records
                this.page.total = response.data.data.total
                this.listLoading = false
            }).catch(() => {
                this.listLoading = false
            })
        },
        sizeChange(pageSize) {
            this.page.pageSize = pageSize
        },
        currentChange(current) {
            this.page.currentPage = current
        },
        handleRefreshChange() {
            this.getList(this.page)
        },
        handleFilter(form, done) {
            this.searchForm = form
            console.log(form)
            this.page.currentPage = 1
            this.getList(this.page, form)
            done()
        },
        handleOpenBefore(show, type) {
            window.boxType = type
            // 查询角色列表
            tagList().then(response => {
                this.tagsOptions = response.data.data
            })
            // 若是编辑、查看回显角色名称
            if (['edit', 'views'].includes(type)) {
                this.tagList = []
                for (let i = 0; i < this.form.tagList.length; i++) {
                    this.tagList[i] = this.form.tagList[i].id
                }
            } else if (type === 'add') {
                // 若是添加角色列表设置为空
                this.tagList = []
            }
            show()
        },
        handleEditContent(row, index) {
            this.$router.push({path: `/blog/blog/write`, query: {id: row.id}})
        },
        handleUpdate(row, index) {
            this.$refs.crud.rowEdit(row, index)
        },
        handleDelete(row, index) {
            this.$confirm('是否确认删除该数据项?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                return delObj(row.id)
            }).then(() => {
                this.getList(this.page)
                this.$notify.success('删除成功')
            })
        },
        create(row, done, loading) {
            addObj(this.form).then(() => {
                this.getList(this.page)
                done()
                this.$notify.success('创建成功')
                this.tagList = []
            }).catch(() => {
                loading()
            })
        },
        update(row, index, done, loading) {
            putObj(this.form).then(() => {
                this.getList(this.page)
                done()
                this.$notify.success('修改成功')
                this.tagList = []
            }).catch(() => {
                loading()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.el-dialog__wrapper {
    .el-dialog {
        width: 61% !important;

        .dialog-main-tree {
            max-height: 400px;
            overflow-y: auto;
        }
    }

    .el-form-item__label {
        width: 20% !important;
        padding-right: 20px;
    }

    .el-form-item__content {
        margin-left: 20% !important;
    }
}
</style>
