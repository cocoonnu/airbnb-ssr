<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import { ElLoading } from 'element-plus'


const emit = defineEmits<{
    (e: 'roomPageChange', num: number): void
}>()

const store = useStore()
const roomTotal = computed(() => store.state.roomTotal)
const roomPageSize = computed(() => store.state.roomPageSize)


function currentChange(p: any) {
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.7)',
    })

    emit('roomPageChange', p)

    setTimeout(() => { loading.close() }, 500)
}

</script>

<template>
    <el-pagination 
        :page-size="roomPageSize"
        :total="roomTotal" 
        layout="prev, pager, next" 
        @current-change="currentChange"
        hide-on-single-page
        next-text="下一页"
        prev-text="上一页"
    />
</template>

<style scoped>
</style>