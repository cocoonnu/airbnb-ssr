<script setup lang="ts">
import { computed } from "vue";
import { delayFetchOrderApi, deleteOrderApi, fetchOrderApi } from "@/api/order/index";
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'


const router = useRouter()
const store = useStore()
const { t } = useI18n()
let orderList: any = computed(() => store.state.orderList)


// 删除订单
async function delOrder(orderId: Number) {
    await deleteOrderApi(orderId)
    
    ElMessage({
        message: t('common.delOrder'),
        type: 'success',
        duration: 1000
    })

    // 获取订单列表
    let result: any = await fetchOrderApi()
    store.commit('fetchOrderList', result.data)

}  


// 跳转到详情页
function goDetail(item: any) {
    // 关闭订单侧边栏
    store.commit('fetchorderDrawer', false)

    // 跳转到详情页
    router.push({ name: 'detail', params: { 
        id: item.orderId,
        title: item.title
    }})
}


// 制造延迟效果
await delayFetchOrderApi()

</script>

<template>

    <div 
        class="order-container" 
        v-for="(item, index) in orderList" 
        v-if="orderList.length > 0"
        :style="{ boxShadow: 'var(--el-box-shadow)' }" 
    >
        <div class="order-img">
            <img v-lazy="item.pictureUrl" @click="goDetail(item)" >
        </div>

        <div class="order-text">
            <p class="order-title">{{ item.title }}</p>
            <p class="order-detail">￥{{ item.price }} /晚 · {{ item.personNumber }}人</p>

            <el-button 
                key="plain" type="" text bg 
                @click="delOrder(item.orderId)"
            >
                删除订单
            </el-button>
        </div>
    </div>

    <!-- 订单为空时 -->
    <el-empty :description="t('common.noOrder')" class="empty" v-else />

</template>

<style scoped lang="scss">
.order-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 150px;
    margin: 30px 0;
    border-radius: 4px;
    overflow: hidden;

    .order-img {
        width: 150px;
        height: 150px;
        padding: 5px;
        margin-left: 3px;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 4px;
            overflow: hidden;
            cursor: pointer;
        }
    }
    
    .order-text {
        position: relative;
        width: 215px;
        height: 100%;
        margin: 5px 10px 0 15px;
        padding: 5px;

        .order-title {
            width: 100%;
            height: 75px;
            font-size: 16px;
            letter-spacing: 1px;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .order-detail {
            font-size: 14px;
            margin-top: 25px;
        }

        button {
            font-size: 14px;
            position: absolute;
            bottom: 18px;
            right: 0;
        }
    }
}

.empty {
    margin-top: 100px;
}
</style>