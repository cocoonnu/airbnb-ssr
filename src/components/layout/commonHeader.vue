<script setup lang="ts">
import { ref } from 'vue'
import en from 'element-plus/lib/locale/lang/en'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { saveLanguageApi } from '@/api/index'
import { userLogoutApi } from '@/api/login/index'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router';
import { useStore } from '@/store'

import ClientOnly from '@duannx/vue-client-only'


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
        router.push({ name: 'login' })
    }

    if(key == 'logout') {

        // 调用登出接口
        await userLogoutApi()

        ElMessage({
            message: '登出成功',
            type: 'success',
            duration: 1000
        })

        router.push({ name: 'login' })
    }
}

</script>

<template>
    <div class="header-common">

        <div class="logo">Airbnb Imitate</div>
     
        <client-only>
            <el-menu
                :default-active="activeIndex"
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

        
                <el-menu-item index="logout" v-if="userStatus">
                    {{ t("login.logout") }}
                </el-menu-item>

        
                <el-menu-item index="login" v-if="!userStatus">
                    {{ t("login.loginTab") }}/{{ t("login.signTab") }}
                </el-menu-item>
        
            </el-menu>
        </client-only>

    </div>

</template>

<style lang="scss">
.header-common {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 80px;

    .logo {
        width: 200px;
        height: 44px;
        text-align: center;
        line-height: 44px; 
        font-size: 22px;
        font-family: 'Varela Round', sans-serif;
        color: hsl(38, 8%, 8%);
        cursor: pointer;
    }

    .el-menu {
        height: 80px;
        align-items: center;
        margin-right: 10px;

        .el-menu-item {
            height: 80px;
            font-size: 16px;
        }
         
        // el-sub-menu字体大小强制16px
        .el-sub-menu .el-sub-menu__title {
            font-size: 16px;
        }

        // el-sub-menu图标样式
        .el-sub-menu__icon-arrow {
            display: none;
        }

        .el-sub-menu.is-active .el-sub-menu__title {
            border-bottom-color: #fff;
        }
    }
}
</style>