<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

function changeLan(lan: string) {
    locale.value = lan
}

</script>

<template>
    <button @click="changeLan('zh')">中文</button>
    <button @click="changeLan('en')">英文</button>

    <h1>{{ t('header.orders') }}</h1>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/app/index.scss";
</style>
