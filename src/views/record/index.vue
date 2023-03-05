<script setup lang="ts">
import { ref } from 'vue';
import commonHeader from '@/components/layout/commonHeader.vue'
import commonFooter from '@/components/layout/commonFooter.vue'
import recordBody from './components/recordBody.vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn.js'
import en from 'element-plus/lib/locale/lang/en.js'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import ClientOnly from '@duannx/vue-client-only'



const store = useStore()
const { locale: localeI18n } = useI18n()
const locale = ref(zhCn)

// 刷新之后判断
if (store.state.language == 'en') {
    locale.value = en
    localeI18n.value = 'en'
}

</script>

<template>
    <commonHeader @changeLang="(language: any) => { locale = language }" />

    <client-only>
        <recordBody/>
    </client-only>

    <commonFooter/>
</template>

<style lang="scss" scoped></style>
