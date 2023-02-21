<script setup lang="ts">
import IndexedDB from '@/utils/indexedDB'

// 创建数据库
const airbnDB = new IndexedDB('airbnDB')
airbnDB.openStore('room','id', ['hose', 'shu'])
</script>

<template>
    <h1>app</h1>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/app/index.scss";
</style>
