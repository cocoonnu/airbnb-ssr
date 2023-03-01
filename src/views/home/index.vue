<script lang="ts">
<<<<<<< HEAD
import { ref } from 'vue';
=======
import { ref, onMounted } from 'vue';
>>>>>>> 17407da469eef09af5a37f87857599579f9bbfc6
import commonHeader from '@/components/layout/commonHeader.vue'
import commonFooter from '@/components/layout/commonFooter.vue'
import homeBody from './homeBody/index.vue'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { useI18n } from 'vue-i18n'

import { useStore } from '@/store'

<<<<<<< HEAD
export default({
    name: 'home',

    components: { commonFooter, commonHeader, homeBody },
=======
export default ({
    components: { commonHeader, commonFooter, homeBody },
>>>>>>> 17407da469eef09af5a37f87857599579f9bbfc6

    setup() {
        const store = useStore()


        // 全局语言
<<<<<<< HEAD
        const { locale: localeI18n } = useI18n()
=======
        const { locale: localeI18n } = useI18n() 
>>>>>>> 17407da469eef09af5a37f87857599579f9bbfc6
        const locale = ref(zhCn)

        // 刷新之后判断
        if (store.state.language == 'en') {
            locale.value = en
            localeI18n.value = 'en'
        }

<<<<<<< HEAD
        return { locale, localeI18n, store }
    },

    async asyncData({ store }: any) {
=======
        onMounted(async function(){
            await store.dispatch('getRoomList')
        })

        return {
            localeI18n,
            locale,
        }
    },

    async asyncData({ store, route }: any) {
>>>>>>> 17407da469eef09af5a37f87857599579f9bbfc6
        await store.dispatch('getCategoryList')
    }

})


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
