<script setup lang="ts">
import { reactive, computed, ref, getCurrentInstance, onMounted } from 'vue'
import { useStore } from '@/store'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import ClientOnly from '@duannx/vue-client-only'
import { saveOrderApi } from "@/api/order/index"
import { ElMessage } from 'element-plus'


const { t } = useI18n()
const store = useStore()
const route = useRoute()
const roomDetail = computed(() => store.state.roomDetail)
const roomDetailInfo = computed(() => store.state.roomDetail.info)
const roomDetailOwner = computed(() => store.state.roomDetail.owner)

const peopleNum = ref(1) // 订单人数


// 点击立即预定 
async function orderClick() {
    if (store.state.userState) {

        const params = {
            orderId: route.params.id,
            title: roomDetail.value.title,
            price: roomDetail.value.price,
            personNumber: peopleNum.value,
            pictureUrl: roomDetail.value.imgs[0]
        }
    
        let result = await saveOrderApi(params)
    
        if (result.code == '000000') {
            ElMessage({
                message: t('detail.reservated'),
                type: 'success',
                duration: 1000
            })
        }
    
        if (result.code == '000001') ElMessage.error(t('detail.hasOrder')) 
        if (result.code == '000004') ElMessage.error(t('detail.orderFail'))

    } else {
        ElMessage.error(t('common.placeLogin'))
    }

    
}

</script>

<template>

    <!-- 照片墙 -->
    <el-carousel
        v-if="roomDetail.imgs && roomDetail.imgs.length > 0"
        class="imgs-wall"
        height="350px"
        trigger="click"
        :interval="5000"
        indicator-position="none"
        type="card"
    >
        <el-carousel-item v-for="(item, index) in roomDetail.imgs" :key="index">
            <img v-lazy="item" />
        </el-carousel-item>
    </el-carousel>

    <div class="room-detail">
        
        <!-- 房屋详情信息 -->
        <div class="detail-part">
            <h2>{{ roomDetail.title }}</h2>

            <!-- 房屋信息 -->
            <div class="info">
                <span class="room">{{ roomDetailInfo?.room }} {{ t('detail.rooms') }}</span>
                <span class="bed">{{ roomDetailInfo?.bed }} {{ t('detail.beds') }}</span>
                <span class="toilet">{{ roomDetailInfo?.toilet }} {{ t('detail.bathrooms') }}</span>
                <span class="live-number">
                    {{ t('detail.living') }} {{ roomDetailInfo?.liveNumber }} {{ t('detail.personNumber') }}
                </span>
            </div>

            <client-only>
            <div class="tags">
                <el-tag size="small">
                    {{ roomDetailInfo?.remarks }} {{ t('detail.remarks') }}
                </el-tag>
                
                <el-tag
                    size="small"
                    class="ml-10"
                    type="danger"
                    v-if="roomDetailInfo?.metro"
                >{{ t('detail.nearSubway') }}</el-tag>

                <el-tag
                    size="small"
                    class="ml-10"
                    type="warning"
                    v-if="roomDetailInfo?.parking"
                >{{ t('detail.freeParking') }}</el-tag>

                <el-tag
                    size="small"
                    class="ml-10"
                    type="success"
                    v-if="roomDetailInfo?.luggage"
                >{{ t('detail.luggage') }}</el-tag>
            </div>       
            </client-only>


            <hr />

            <!-- 房东信息 -->
            <div class="owner-detail">
                <img :src="roomDetailOwner?.avatar" />
                <div class="info">
                    <p>{{ t('detail.landlord') }}: {{ roomDetailOwner?.name }}</p>
                    <p>
                    <span v-if="roomDetailOwner?.certify">{{ t('detail.authenticated') }}</span>
                    <span v-if="roomDetailInfo?.goodOwner">{{ t('detail.greatlandlord') }}</span>
                    </p>
                </div>
            </div>

            <!-- 基本介绍 -->
            <div class="introduce">{{ roomDetailOwner?.introduce }}</div>
        </div>


        <!-- 立即预定表单 -->
        <el-affix :offset="15">
            <div class="form-part">
                
                <p class="price">
                    <span>¥{{ roomDetail.price }}</span>
                    / {{ t('detail.night') }}
                </p>
                
                <el-form label-position="top" class="order-ruleForm">
                
                    <el-form-item :label="t('detail.personNumber')">
                        <el-select v-model="peopleNum" >
                            <el-option 
                                v-for="item in 4"
                                :label="item" 
                                :value="item" 
                            />
                        </el-select>
                    </el-form-item>

                    <el-button type="primary" class="order-btn" @click="orderClick">
                        {{ t('detail.order') }}
                    </el-button>

                </el-form>

            </div>
        </el-affix>

    </div>

</template>

<style lang="scss">
.imgs-wall {
    width: 1200px;
    padding: 50px 0px;
    margin: 0 auto;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 6px;
    }

    .el-carousel__item--card {
        border: 8px solid #fff;
        border-radius: 6px;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.2);

        // 这个是干嘛的？
        &.is-active{
            left: 50%;
            position: relative;
            transform: translateX(-50%) translateY(-10px) scale(1) !important;
        }
    }
}


.room-detail {
    width: 1048px;
    margin: 50px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;

    // 选择人数表单
    .form-part {
        flex: 1;
        padding: 24px;
        border-radius: 5px;
        border: 1px solid #e4e4e4;
        background-color: #ffffff;

        .price span {
            font-size: 28px;
        }

        .order-ruleForm {
            width: 240px;
            margin-top: 10px;
        }

        .order-btn {
            width: 100%;
            height: 40px;
            margin-top: 10px;
        }

    }


    // 用户介绍模块样式
    .detail-part {
        flex: 3;
        margin-right: 30px;
    }

    h2 {
        color: hsl(38, 8%, 8%);
        font-size: 30px;
        font-weight: 500;
        letter-spacing: 1px;
        margin-bottom: 10px;
    }

    .info {
        margin-bottom: 20px;

        span {
            margin-right: 20px;
            position: relative;
        }
    }

    .tags {
        .el-tag {
            margin: 2px 8px;
            border-radius: 12px;
            cursor: default;
        }
    }

    hr {
        background: #eee;
        margin: 20px 0;
        height: 1px;
        border: none;
    }

    .owner-detail {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;

        img {
            width: 64px;
            height: 64px;
            border-radius: 100%;
        }

        .info {
            margin-left: 10px;

            p {
                padding: 5px 0;

                &:first-child {
                    font-size: 16px;
                    font-weight: bold;

                    button {
                        padding: 2px 0;
                        font-weight: bold;
                        color: #008489;
                        min-height: initial;
                        margin: 0;
                    }
                }

                &:last-child {
                    font-size: 14px;
                    color: #666;

                    span {
                        position: relative;
                        margin-right: 10px;

                        &::before {
                            content: ".";
                            position: absolute;
                            top: -6px;
                            right: -23px;
                            font-size: 20px;
                        }

                        &:last-child {
                            &::before {
                                display: none;
                            }

                        }
                    }
                }
            }
        }
    }

    .introduce {
        letter-spacing: 2px;
        padding: 20px 16px;
        background-color: #f5f5f5;
        border-radius: 5px;
        color: #666;
        margin: 20px 0;
        line-height: 1.6;
        text-indent: 30px;
    }
}
</style>