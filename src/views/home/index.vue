<script setup lang="ts">
import { ref } from 'vue';
import commonHeader from '@/components/layout/commonHeader.vue'
import commonFooter from '@/components/layout/commonFooter.vue'
import homeBody from './homeBody/index.vue'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { useI18n } from 'vue-i18n'

import { useStore } from '@/store'
const store = useStore()


// 全局语言
const { locale: localeI18n } = useI18n() 
const locale = ref(zhCn)

// 刷新之后判断
if (store.state.language == 'en') {
    locale.value = en
    localeI18n.value = 'en'
}


</script>

<template>
    <el-config-provider :locale="locale">
        <commonHeader 
            @changeLang="(language: any) => { locale = language }" 
        />

        <homeBody />

        <commonFooter />
    </el-config-provider>
</template>

<style lang="scss" scoped></style>
