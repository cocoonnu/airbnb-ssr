<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { h,getCurrentInstance } from 'vue'
const router = useRouter() // 全局 router
const route = useRoute() // 当前路由 route

const { proxy }: any = getCurrentInstance()

const open = () => {
    proxy.$message('this is a message.')
}

const openVn = () => {
    proxy.$message({
        message: h('p', null, [
            h('span', null, 'Message can be '),
            h('i', { style: 'color: teal' }, 'VNode'),
        ]),
    })   
}

</script>

<template>
    <el-button :plain="true" @click="open">Show message</el-button>
    <el-button :plain="true" @click="openVn">VNode</el-button>
    <!-- <el-button>Default</el-button>
    <router-view></router-view>
    <button @click="(router.push({path: '/hello', query: { id: 1} }))">go</button> -->
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
