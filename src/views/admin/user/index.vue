<template>
    <div class="user">
        <basic-container>
            <avue-crud
                ref="crud"
                v-model="form"
                v-model:page="page"
                :option="option"
                :table-loading="listLoading"
                :before-open="handleOpenBefore"
                :data="list"
                @on-load="getList"
                @size-change="sizeChange"
                @current-change="currentChange"
                @search-change="handleFilter"
                @refresh-change="handleRefreshChange"
                @row-update="update"
                @row-save="create">
                <template #menu-left="{}">
                    <el-button class="filter-item" type="primary" icon="el-icon-edit"
                               @click="$refs.crud.rowAdd()">添加
                    </el-button>
                </template>
                <template #username="scope">
                    <span>{{ scope.row.username }}</span>
                </template>
                <template #role="scope">
                      <span v-for="(r, index) in scope.row.roleList" :key="index">
                        <el-tag>{{ r.name }} </el-tag>&nbsp;&nbsp;
                      </span>
                </template>
                <template #lockFlag="scope">
                    <dict-tag :options="scope.dic" :value="scope.row.lockFlag"/>
                </template>
                <template #menu="scope">
                    <el-button
                        v-if="permissions.sys_user_edit"
                        text
                        type="primary"
                        icon="el-icon-edit"
                        @click="handleUpdate(scope.row, scope.index)"
                    >编辑
                    </el-button>
                    <el-button
                        v-if="permissions.sys_user_del"
                        text
                        type="primary"
                        icon="el-icon-delete"
                        @click="deletes(scope.row, scope.index)"
                    >删除
                    </el-button>
                </template>
                <template #role-form>
                    <avue-select
                        v-model="role"
                        multiple
                        placeholder="请选择角色"
                        :dic="rolesOptions"
                        :props="roleProps"
                    ></avue-select>
                </template>
            </avue-crud>
        </basic-container>
    </div>
</template>

<script>
import {addObj, delObj, fetchList, putObj} from '@/api/admin/user'
import {roleList} from '@/api/admin/role'
import {tableOption} from '@/const/crud/admin/user'
import {mapGetters} from 'vuex'

export default {
    name: 'table_user',
    data() {
        return {
            option: tableOption,
            roleProps: {
                label: 'name',
                value: 'id'
            },
            page: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 20, // 每页显示多少条,
                isAsc: false //是否倒序
            },
            query: {},
            list: [],
            listLoading: true,
            role: [],
            form: {},
            rolesOptions: []
        }
    },
    computed: {
        ...mapGetters(['permissions'])
    },
    watch: {
        role() {
            this.form.role = this.role
        }
    },
    methods: {
        getList(page, params) {
            this.listLoading = true
            fetchList(Object.assign({current: page.currentPage, size: page.pageSize}, params))
                .then(response => {
                    this.list = response.data.data.records
                    console.table(this.list)
                    this.page.total = response.data.data.total
                    this.listLoading = false
                })
        },
        getNodeData(data) {
            roleList().then(response => {
                this.rolesOptions = response.data.data
            })
        },
        sizeChange(pageSize) {
            this.page.pageSize = pageSize
        },
        currentChange(current) {
            this.page.currentPage = current
        },
        handleFilter(param, done) {
            this.query = param
            console.log(this.query)
            this.page.currentPage = 1
            this.getList(this.page, param)
            done()
        },
        handleRefreshChange() {
            this.getList(this.page)
        },
        handleOpenBefore(show, type) {
            window.boxType = type
            // 查询角色列表
            roleList().then(response => {
                this.rolesOptions = response.data.data
            })
            // 若是编辑、查看回显角色名称
            if (['edit', 'views'].includes(type)) {
                this.role = []
                for (let i = 0; i < this.form.roleList.length; i++) {
                    this.role[i] = this.form.roleList[i].id
                }
            } else if (type === 'add') {
                // 若是添加角色列表设置为空
                this.role = []
            }
            show()
        },
        handleUpdate(row, index) {
            this.$refs.crud.rowEdit(row, index)
            this.form.password = undefined
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
            console.log('this.form', this.form)
            putObj(this.form).then(() => {
                this.getList(this.page)
                done()
                this.$notify.success('修改成功')
            }).catch(() => {
                loading()
            })
        },
        deletes(row) {
            this.$confirm(
                '此操作将永久删除该用户(用户名:' + row.username + '), 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).then(() => {
                delObj(row.id).then(() => {
                    this.getList(this.page)
                    this.$notify.success('删除成功')
                }).catch(() => {
                    this.$notify.error('删除失败')
                })
            })
        }
    }
}
</script>
