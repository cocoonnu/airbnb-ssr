<script setup lang="ts">
import { ElLoading } from 'element-plus'


const emits = defineEmits<{
    (e: 'pageChange', num: number): void
}>()

const props = defineProps<{
    total: number,
    pageSize: number
}>()


function currentChange(p: any) {
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.7)',
    })

    emits('pageChange', p)

    setTimeout(() => { loading.close() }, 500)
}

</script>

<template>
    <el-pagination 
        :page-size="pageSize"
        :total="total" 
        layout="prev, pager, next" 
        @current-change="currentChange"
        hide-on-single-page
        next-text="下一页"
        prev-text="上一页"
    />
</template>

<style scoped>
.el-pagination {
    margin: 30px auto;
    justify-content: center;
}
</style>