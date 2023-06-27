<template>
    <div>
        <template v-for="(item, index) in options">
            <template v-if="values.includes(item.code)">
                <el-tag
                    :key="item.dictId"
                    :disable-transitions="true"
                    :index="index"
                    :type="item.type || ''"
                >
                    {{ item.content }}
                </el-tag>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    name: 'DictTag',
    props: {
        options: {
            type: Array,
            default: null
        },
        value: {
            type: [Number, String, Array],
            default: null
        }
    },
    mounted() {
        // console.log(this.options)
    },
    computed: {
        values() {
            if (this.value !== null && typeof this.value !== 'undefined') {
                return Array.isArray(this.value) ? this.value : [String(this.value)]
            } else {
                return []
            }
        }
    }
}
</script>
<style scoped>
.el-tag + .el-tag {
    margin-left: 10px;
}
</style>
