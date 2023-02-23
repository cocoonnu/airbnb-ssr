<script setup lang="ts">
import { ref } from 'vue';
import commonHeader from '@/components/layout/commonHeader.vue'
import commonFooter from '@/components/layout/commonFooter.vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { fetchLanguageApi } from '@/api/index'
import { useI18n } from 'vue-i18n'


// 全局语言
const { locale: localeI18n } = useI18n()

// 首次加载语言包
const locale = ref(zhCn)
async function getLocale() {
    let result: any = await fetchLanguageApi()

    if (result.code == 200 && result.data.language == 'en') {
        locale.value = en
        localeI18n.value = 'en'
    }
}
getLocale()

</script>

<template>
    <el-config-provider :locale="locale">
        <commonHeader 
            @changeLang="(language: any) => { locale = language }" 
        />

        <commonFooter />
    </el-config-provider>
</template>

<style lang="scss" scoped></style>
