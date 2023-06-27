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
                @current-change="currentChange"
                @search-change="handleFilter"
                @refresh-change="handleRefreshChange"
                @row-update="update"
                @row-save="create">
                <template #color="scope">
                    <el-tag style="width: 50px;" :color="scope.row.color"/>
                </template>
                <template #color-form="{}">
                    <el-color-picker v-model="form.color"/>
                </template>
                <template #menu-left="{}">
                    <el-button
                        v-if="permissions.blog_tag_add"
                        class="filter-item"
                        type="primary"
                        icon="el-icon-edit"
                        @click="$refs.crud.rowAdd()">添加
                    </el-button>
                </template>

                <template #menu="{row,index,size}">
                    <el-button
                        v-if="permissions.blog_tag_edit"
                        text
                        type="primary"
                        icon="el-icon-edit"
                        :size="size"
                        @click="handleUpdate(row,index)">编辑
                    </el-button>
                    <el-button
                        v-if="permissions.blog_tag_del"
                        text
                        type="primary"
                        icon="el-icon-delete"
                        :size="size"
                        @click="handleDelete(row,index)">删除
                    </el-button>
                </template>
            </avue-crud>
        </basic-container>
    </div>
</template>

<script>
import {addObj, delObj, fetchList, putObj} from '@/api/blog/tag'
import {tableOption} from '@/const/crud/blog/tag'
import {mapGetters} from 'vuex'

export default {
    name: 'TableTag',
    data() {
        return {
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
            form: {}
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
        handleUpdate(row, index) {
            this.$refs.crud.rowEdit(row, index)
        },
        handleDelete(row, index) {
            this.$confirm('是否确认删除名称为"' + row.name + '"' + '"的数据项?', '警告', {
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
            }).catch(() => {
                loading()
            })
        },
        update(row, index, done, loading) {
            putObj(this.form).then(() => {
                this.getList(this.page)
                done()
                this.$notify.success('修改成功')
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
