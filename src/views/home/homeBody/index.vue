<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from '@/store'

const store = useStore()
const roomList = computed(() => store.state.roomList)

onMounted(async function () {
    await store.dispatch('getRoomList')
})

</script>

<template>
    <div class="banner"></div>

    <!-- 房屋列表模块 -->
    <div class="house-container">
        <h2 class="title">跨年特惠房源</h2>

        <p class="sub-title">AirCover 的无忧保障，只⁠在⁠爱⁠彼⁠迎</p>

        <!-- 首页列表 -->
        <div class="home-list">
            <div class="home-item" v-for="(item, index) in roomList">

                <img :src="item.pictureUrl" >


                <h3 class="home-title">{{ item.title }}</h3>

                <p class="home-price">￥{{ item.price }}/晚</p>
            </div>
        </div>

        <!-- 分页器 -->
        <!-- <el-pagination layout="prev, pager, next" :total="50" /> -->
    </div>

</template>

<style lang="scss">
.banner {
    position: absolute;
    top: 78px;
    left: 0;
    width: 100%;
    height: 500px;
    background: url('@/assets/images/home/bannerImg.jpg') no-repeat;
    background-size: cover;
    z-index: 99;
}

.house-container {
    @include main-wapper;
    margin-top: 530px;

    .title {
        font-size: 22px;
    }

    .sub-title {
        margin-top: 5px;
        font-size: 16px;
    }

    .home-list {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
        gap: 50px 33px;
        margin-top: 40px;

        .home-item {
            width: 250px;

            img {
                width: 250px;
                height: 250px;
                object-fit: cover;
                border-radius: 10px;
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

    .el-pagination {
        font-size: 16px;

    }
}
</style>