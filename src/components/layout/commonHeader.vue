<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import en from 'element-plus/lib/locale/lang/en'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { saveLanguageApi } from '@/api/index'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router';
import { useStore } from '@/store'


const store = useStore()
const router = useRouter()

// 全局语言
const { t, locale } = useI18n()


// 自定义事件
const emit = defineEmits<{

    // 修改 Element 全局语言
    (e: 'changeLang', language: any): void

}>()


// 用户登录状态
const userStatus = store.state.userState


// el-menu 活跃属性
const activeIndex = ref('orders')


// el-menu 点击函数
const handleSelect = async function(key: string) {
    if(key == 'zh') {
        let result: any = await saveLanguageApi('zh')

        if(result.code = 200) {
            // 在 App.vue 中更新语言包
            emit('changeLang', zhCn)
            locale.value = 'zh'

            // 发送消息
            ElMessage({
                message: result.data,
                type: 'success',
                duration: 1000
            })
        } else {
            ElMessage.error(result.data)
        }
    }

    if (key == 'en') {
        let result: any = await saveLanguageApi('en')

        if (result.code = 200) {
            // 在 App.vue 中更新语言包
            emit('changeLang', en)
            locale.value = 'en'

            // 发送消息
            ElMessage({
                message: result.data,
                type: 'success',
                duration: 1000
            })
        } else {
            ElMessage.error(result.data)
        }
    }

    if(key == 'login') {
        router.replace({ name: 'login' })
    }

    if(key == 'logout') {
        // 清除用户登录状态
        store.commit('changeUserState', 0)

        router.replace({ name: 'login' })
    }
}

</script>

<template>
    <div class="header-common">

        <div class="logo">Airbnb Imitate</div>

        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >
            <el-menu-item index="orders">{{ t('header.orders') }}</el-menu-item>
            <el-menu-item index="records">{{ t('header.records') }}</el-menu-item>

            <el-sub-menu index="language">
                <template #title>{{ t('header.language') }}</template>
                <el-menu-item index="zh">简体中文</el-menu-item>
                <el-menu-item index="en">English</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="avatar" v-if="userStatus">
                <template #title><div class="avatar"></div></template>

                <!-- 退出登录 -->
                <el-menu-item index="logout" >{{ t("login.logout") }}</el-menu-item>
            </el-sub-menu>

            <!-- 登录按钮 -->
            <el-menu-item index="login" v-if="!userStatus">
                {{ t("login.loginTab") }}/{{ t("login.signTab") }}
            </el-menu-item>

        </el-menu>

    </div>

</template>

<style lang="scss">
.header-common {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    position: relative;
    align-items: center;

    .logo {
        position: absolute;
        top: 17px;
        left: 15px;
        width: 200px;
        height: 44px;
        text-align: center;
        line-height: 44px; 
        font-size: 22px;
        color: hsl(38, 8%, 8%);
        z-index: 10;
        cursor: pointer;
    }

    .el-menu {
        width: inherit;
        padding: 0 25px;
        justify-content: right;
        height: 80px;
        align-items: center;

        .el-menu-item {
            height: 80px;
            font-size: 16px;

            &:last-child {
                padding-right: 0;
            }
        }
         
        .el-sub-menu .el-sub-menu__title {
            font-size: 16px!important;
        }
    }

    .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        box-shadow: rgb(235 235 235) 0px 0px 0px 2px;
        background: url('@/assets/images/layout/avatar.jpg') no-repeat;
        background-size: cover;
    }

    .el-sub-menu__icon-arrow {
        display: none;
    }
}
</style>