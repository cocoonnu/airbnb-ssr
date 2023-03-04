<script lang="ts">
import { ref, onMounted } from 'vue';
import commonHeader from '@/components/layout/commonHeader.vue'
import commonFooter from '@/components/layout/commonFooter.vue'
import detailBody from '@/views/detail/components/detailBody.vue'
import ClientOnly from '@duannx/vue-client-only'
import { ElMessage, ElLoading } from 'element-plus'


import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { useI18n } from 'vue-i18n'

import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router';

export default({
    name: 'detail',

    components: { commonFooter, commonHeader, detailBody, ClientOnly },

    setup() {
        const store = useStore()
        const route = useRoute()


        // 全局语言
        const { locale: localeI18n } = useI18n()
        const locale = ref(zhCn)

        // 刷新之后判断
        if (store.state.language == 'en') {
            locale.value = en
            localeI18n.value = 'en'
        }


        onMounted(async function () {
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(255, 255, 255, 0.7)',
            })

            await store.dispatch('getRoomDetail', { id: route.params.id })

            setTimeout(() => { loading.close() }, 200)
        })

        return { locale, localeI18n }

    },

    async asyncData({ store }: any) {
        // console.log(store.state.route.params.id);
        // console.log(store.state.route);

        // await store.dispatch('getRoomDetail', { 
        //     id: store.state.route.params.id
        // })
    }

})



</script>

<template>
    <el-config-provider :locale="locale">
        <commonHeader @changeLang="(language: any) => { locale = language }" />

        <client-only>
            <detailBody />
        </client-only>
        
        <commonFooter />
    </el-config-provider>
</template>

<style lang="scss" scoped></style>
