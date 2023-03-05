<script lang="ts">
import { ref, onMounted } from 'vue';
import commonHeader from '@/components/layout/commonHeader.vue'
import commonFooter from '@/components/layout/commonFooter.vue'
import homeBody from './components/homeBody.vue'
import { ElLoading } from 'element-plus'

import zhCn from 'element-plus/lib/locale/lang/zh-cn.js'
import en from 'element-plus/lib/locale/lang/en.js'
import { useI18n } from 'vue-i18n'

import { useStore } from '@/store'

export default({
    name: 'home',

    components: { commonFooter, commonHeader, homeBody },

    setup() {
        const store = useStore()


        // 全局语言
        const { locale: localeI18n } = useI18n()
        const locale = ref(zhCn)

        // 刷新之后判断
        if (store.state.language == 'en') {
            locale.value = en
            localeI18n.value = 'en'
        }

        onMounted(function() {
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(255, 255, 255, 0.7)',
            })

            setTimeout(() => { loading.close() }, 500)
        })

        return { locale, localeI18n, store }
    },


    async asyncData({ store, route }: any) {
        
        // 获取房屋列表
        await store.dispatch('getRoomList', { pageNo: 1, cityCode: 'hz' })
    }

})


</script>

<template>
    <!-- <el-config-provider :locale="locale"> -->
        <commonHeader 
            @changeLang="(language: any) => { locale = language }" 
        />

        <homeBody />

        <commonFooter />
    <!-- </el-config-provider> -->
</template>

<style lang="scss" scoped></style>
