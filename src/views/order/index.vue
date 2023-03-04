<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '@/store'
import { useI18n } from 'vue-i18n'
import { defineAsyncComponent } from 'vue'
import ClientOnly from '@duannx/vue-client-only'
import { fetchOrderApi } from "@/api/order/index";


const store = useStore()
const { t } = useI18n()
const orderBody = defineAsyncComponent(() => import('./components/orderBody.vue'))


// 显示与隐藏
const orderDrawer: any = computed({
    get() {
        return store.state.orderDrawer
    },
    set(newValue) {
        store.commit('fetchorderDrawer', newValue)
    }
})


// 抽屉打开的回调
async function openDrawer() {

    // 获取订单列表
    let result: any = await fetchOrderApi()
    store.commit('fetchOrderList', result.data)
}

</script>

<template>
    <client-only>
    <el-drawer v-model="orderDrawer" :with-header="false" size="430px" @open="openDrawer">

        <Suspense>
            <template v-slot:default>
                <orderBody @openDrawer="openDrawer" />
            </template>

            <template v-slot:fallback>
                <div class="loading" v-for="item in 3"><el-skeleton :rows="5" animated /></div>
            </template>
        </Suspense>

    </el-drawer>
    </client-only>
</template>

<style scoped lang="scss">
span {
    font-size: 18px;
    margin-left: 5px;
}

.loading {
    margin-top: 20px;
}
</style>