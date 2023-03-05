<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { fetchRecordApi, delayFetchRecordApi } from '@/api/record'
import Pagination from '@/components/pagination/Pagination.vue'

const store = useStore()
const router = useRouter()
const { t } = useI18n()
let recordList: any = ref([])
let recordPageList: any = ref([]) // 每页的历史记录数组
let recordPageSize = 8
let recordTotal = ref(0)
let recordPage = ref(1)


// 改变页数
function pageChange(p: number) {
    recordPage.value = p
}


// 跳转到详情页
function goDetail(item: any) {
    router.push({ name: 'detail', params: { id: item.recordId } })
}


onMounted(async function() {

    // 获取历史记录
    let result = await fetchRecordApi()
    
    recordList.value = result.data
    recordTotal.value = recordList.value.length

    for (let i = 0; i < Math.ceil(recordTotal.value / recordPageSize); i++ ) {
        recordPageList.value[i] = new Array()

        for (let j = 0; j < recordPageSize; j++) {
            let index = recordPageSize * i + j

            if (recordList.value[index]) {
                recordPageList.value[i].push(recordList.value[index])
            }
        }

    }
})

</script>


<template>
    <div class="banner"></div>
    

    <!-- 房屋列表模块 -->
    <div class="house-container">
        <h2 class="title">{{ t('header.records') }}</h2>

        <!-- 首页列表 -->
        <div class="record-list" v-if="recordList.length > 0" >
            <div 
                class="record-item" 
                v-for="(item, index) in recordPageList[recordPage - 1]"
                @click="goDetail(item)"
            >
                <img v-lazy="item.pictureUrl">

                <h3 class="record-title">{{ item.title }}</h3>

                <p class="record-price">￥{{ item.price }}/晚</p>
            </div>

        </div>

        <el-empty :description="t('common.noRecord')" class="empty" v-else />


        <!-- 分页器 -->
        <Pagination 
            @pageChange="pageChange"
            :total="recordTotal" :pageSize="recordPageSize"
        />
    </div>
</template>

<style lang="scss" scoped>
.banner {
    width: 100%;
    height: 500px;
    background: url('@/assets/images/home/bannerImg.jpg') no-repeat;
    background-size: cover;
}

.house-container {
    @include main-wapper;
    margin-top: 50px;

    .title {
        font-size: 22px;
    }

    .record-list {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-content: center;
        flex-wrap: wrap;
        gap: 40px 33px;
        margin: 40px 0 20px 0;


        .record-item {
            width: 250px;
            cursor: pointer;

            img {
                width: 250px;
                height: 250px;
                object-fit: cover;
                border-radius: 7px;
                overflow: hidden;
                cursor: pointer;
            }

            .record-title {
                width: 250px;
                height: 24px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-family: sans-serif;
                margin-top: 15px;
                font-size: 16px;
                font-weight: 600;
            }

            .record-price {
                margin: 5px 0;
                font-size: 14px;
            }
        }
        
        .el-pagination {
            margin: 30px auto;
            justify-content: center;
        }
    }


    .empty {
        margin-top: 30px;
    }
}
</style>