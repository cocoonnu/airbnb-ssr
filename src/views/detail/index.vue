<script lang="ts">
import { ref, onMounted } from 'vue';
import commonHeader from '@/components/layout/commonHeader.vue'
import commonFooter from '@/components/layout/commonFooter.vue'
import detailBody from '@/views/detail/components/detailBody.vue'
import ClientOnly from '@duannx/vue-client-only'
import { ElLoading } from 'element-plus'
import { saveRecordApi } from '@/api/record/index';


import zhCn from 'element-plus/lib/locale/lang/zh-cn.js'
import en from 'element-plus/lib/locale/lang/en.js'
import { useI18n } from 'vue-i18n'

import { useStore } from '@/store'
import { useRoute } from 'vue-router';

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

            // 查询房屋详细信息
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(255, 255, 255, 0.7)',
            })

            if (route.params.id != '34') {
                await store.dispatch('getRoomDetail', { id: route.params.id })
            } else {
                await store.dispatch('getRoomDetail', { id: 11 })
            }
            

            setTimeout(() => { loading.close() }, 200)


            if (store.state.userState) {
                
                // 保存历史记录
                let roomDetail = store.state.roomDetail
                const params = {
                    recordId: route.params.id,
                    title: roomDetail.title,
                    price: roomDetail.price,
                    pictureUrl: roomDetail.imgs[0]
                }
                
                await saveRecordApi(params)
            }

        })

        return { locale, localeI18n }

    },

    async asyncData({ store, route }: any) {
        // let result = await store.dispatch('getRoomDetail', { 
        //     id: route.params.id
        // })
        
        // console.log(result)        
    }

})



</script>

<template>
    <el-config-provider :locale="locale">
        <commonHeader @changeLang="(language: any) => { locale = language }" />

        <client-only>
            <detailBody/>
        </client-only>
        
        <commonFooter />
    </el-config-provider>
</template>

<style lang="scss" scoped></style>
