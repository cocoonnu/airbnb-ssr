<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
const router = useRouter() // 全局 router
const route = useRoute() // 当前路由 route

console.log(route.query);

</script>

<template>
    <h2>hhh</h2>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
