<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const activeName = ref('login')

function handleClick(e: any) {
    console.log(e);   
}

function submitForm() {

}
</script>

<template>
    <div class="login-page">

        <div class="left-part"></div>

        <div class="right-part">
            <div class="login-panel">

                <!-- tab -->
                <el-tabs 
                    v-model="activeName" 
                    class="demo-tabs" 
                    @tab-click="handleClick"
                >
                    <el-tab-pane label="登录" name="login">1</el-tab-pane>
                    <el-tab-pane label="注册" name="sign">2</el-tab-pane>
                </el-tabs>

                <!-- 表单 -->
                <el-form 
                    ref="ruleFormRef" 
                >
                    <!-- 手机号 -->
                    <el-form-item prop="mobile">
                        <el-input 
                            :placeholder="t('login.placeMobile')" 
                        ></el-input>
                    </el-form-item>

                    <!-- 密码 -->
                    <el-form-item prop="password">
                        <el-input
                            :placeholder="t('login.placePass')"
                            type="password"
                        ></el-input>
                    </el-form-item>

                    <!-- 按钮 -->
                    <el-form-item>
                        <el-button 
                            class="login-btn" 
                            type="primary" 
                            @click="submitForm"
                        >
                            立即登录
                        </el-button>
                    </el-form-item>

                </el-form>

            </div>
        </div>

    </div>
</template>

<style lang="scss">
</style>