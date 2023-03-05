<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElLoading } from 'element-plus'
import Pagination from '@/components/pagination/Pagination.vue'


// 数据
const router = useRouter()
const store = useStore()
const { t } = useI18n()
const roomList = computed(() => store.state.roomList)
const roomTotal = computed(() => store.state.roomTotal)
const roomPageSize = computed(() => store.state.roomPageSize)
const city = ref('hz')
const page = ref(1)
const cityArr = [{
    cityCode: 'hz',
    cityName: '杭州'
}, {
    cityCode: 'sh',
    cityName: '上海'
}, {
    cityCode: 'nj',
    cityName: '南京'
}, {
    cityCode: 'cd',
    cityName: '成都'
}, {
    cityCode: 'cq',
    cityName: '重庆'
}, {
    cityCode: 'bj',
    cityName: '北京'
}, {
    cityCode: 'sz',
    cityName: '苏州'
}]


// 城市搜索
async function cityClick(tab: any) {
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.7)',
    })

    const { name } = tab.props

    city.value = name
    await store.dispatch('getRoomList', { pageNo: 1, cityCode: city.value })

    setTimeout(() => { loading.close() }, 500)
}


// 页数改变
async function pageChange(pageNo: any) {
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.7)',
    })

    page.value = pageNo
    await store.dispatch('getRoomList', { pageNo, cityCode: city.value })

    setTimeout(() => { loading.close() }, 500)
}


// 跳转到详情页
function goDetail(item: any) {
    router.push({ name: 'detail', params: {
            id: item.id,
            title: item.title
        }
    })
}

</script>

<template>
    <div class="banner"></div>

    <!-- 房屋列表模块 -->
    <div class="house-container">
        <h2 class="title">跨年特惠房源</h2>

        <p class="sub-title">AirCover 的无忧保障，只⁠在⁠爱⁠彼⁠迎</p>


        <!-- 城市筛选 -->
        <el-tabs 
            v-model="city"
            type="card"
            @tab-click="cityClick"
        >
            <el-tab-pane
                v-for="(item, index) in cityArr"
                :key="index"
                :label="t(`home.city['${item.cityCode}']`)"
                :name="item.cityCode"
            ></el-tab-pane>
        </el-tabs>


        <!-- 首页列表 -->
        <div class="home-list">
            <div class="home-list-container">
                <div 
                    class="home-item" 
                    v-for="(item, index) in roomList" 
                    :key="index"
                    @click="goDetail(item)"
                >
    
                    <img v-lazy="item.pictureUrl" >
    
                    <h3 class="home-title">{{ item.title }}</h3>
    
                    <p class="home-price">￥{{ item.price }}/晚</p>
                </div>
            </div>
        </div>

        <!-- 分页器 -->
        <Pagination 
            @pageChange="pageChange" 
            :total="roomTotal" :pageSize="roomPageSize"
        />
    </div>

</template>

<style lang="scss">
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

    .sub-title {
        margin-top: 5px;
        font-size: 16px;
    }

    // tab 标签样式
    .el-tabs{
        margin: 40px 0;
        .el-tabs__nav-wrap{
            padding: 0 40px;
        }
        .el-tabs__header{
            border-bottom: none;
        .el-tabs__nav{
            border: none;
            padding: 10px 0;
        }
        .el-tabs__item.is-active{
            color: #fff;
            background: #409eff;
            border-bottom-color:#409eff;
        }
        }
        .el-tabs__item{
            width: 100px;
            text-align: center;
            box-shadow: 0px 1px 2px rgb(0 0 0 / 8%);
            min-width: 120px;
            height: 48px;
            padding: 0px 7px !important;
            border: solid 0.1px #D8D8D8;
            line-height: 48px;
            box-sizing: initial;
            margin-right: 20px;
            border-radius: 4px;
            font-size: 18px;
            font-weight: normal;
        &:hover{
            box-shadow: 0px 3px 6px rgb(0 0 0 / 8%);
            color: inherit;
        }
        &:first-child{
            border-left: 1px solid #D8D8D8;
        }
        }
        .el-tabs__nav-next, .el-tabs__nav-prev{
            height: 28px;
            width: 28px;
            border: 1px solid #ccc;
            border-radius: 100%;
            top: 50%;
            margin-top: -14px;
            background: #fff;
            text-align: center;
            z-index: 10;
            line-height: 30px;
        }
    }


    .home-list {
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 60px 0 20px 0;

        .home-list-container {
            width: 930px;
            display: flex;
            justify-content: flex-start;
            align-content: center;
            flex-wrap: wrap;
            gap: 50px 90px;

            .home-item {
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

                .home-title {
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

                .home-price {
                    margin: 5px 0;
                    font-size: 14px;
                }
            }
        }

    }
}
</style>