<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { ElMessage } from 'element-plus'
import { ElLoading } from 'element-plus'
import type { FormInstance } from 'element-plus'

import { fetchLanguageApi, saveLanguageApi } from '@/api/index'
import { userSignApi, userLoginApi, userLogoutApi } from '@/api/login/index'

import { reactive, ref, onMounted } from 'vue'

// 全局语言
const { t, locale: localeI18n } = useI18n()
const locale = ref(zhCn)


// 获取全局语言
async function getLocale() {
    let result: any = await fetchLanguageApi()

    if (result.code == 200 && result.data.language == 'en') {
        locale.value = en
        localeI18n.value = 'en'
    }
}


// 表单数据
const labelPosition = ref('top')
const ruleFormRef = ref<FormInstance>() // 整个表单
const formData = reactive({
    mobile: '',
    password: '',
})


// 表单效验规则
const rules = reactive({
    mobile: [
        {
            min: 11,
            max: 11,
            required: true,
            message: '',
            trigger: 'blur'
        }
    ],
    password: [
        {
            min: 6,
            max: 15,
            required: true,
            message: '',
            trigger: 'blur'
        }
    ]
})


// 登录注册按钮
async function submitForm(formEl: FormInstance | undefined) {
    if (!formEl) return

    formEl.validate(async function(valid) {
        if(!valid) {
            ElMessage.error('请填入正确信息')
            return false
        }

        if (loginSignCheck.value == 'sign') {
            let result = await userSignApi(formData)

            if (result.code == '000001') ElMessage.error('手机号已被注册')
            if (result.code == '000004') ElMessage.error('注册失败')
            if (result.code == '000000') {
                ElMessage({
                    message: '注册成功',
                    type: 'success',
                    duration: 1000
                })
            }
        }
        
        if (loginSignCheck.value == 'login') {
            let result = await userLoginApi(formData)

            if (result.code == '000002') ElMessage.error('密码不正确')
            if (result.code == '000003') ElMessage.error('手机号不正确')
            if (result.code == '000004') ElMessage.error('登录失败')
            if (result.code == '000000') {
                ElMessage({
                    message: '登录成功',
                    type: 'success',
                    duration: 1000
                })
            }
        }

    })
}


// 切换登录和注册
let loginSignCheck = ref('login')
function loginSign() {
    if (loginSignCheck.value == 'login') loginSignCheck.value = 'sign'
    else loginSignCheck.value = 'login' 

    // 创建 mock 加载效果
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.7)',
    })

    // 加载结束
    setTimeout(() => { loading.close() }, 500)
    
    // 发送消息
    ElMessage({
        message: `切换页面成功`,
        type: 'success',
        duration: 1000
    })
}


// 改变语言
const changeLang = async function () {
    let lang: any = await fetchLanguageApi()
    
    if (lang.data.language == 'en') {
        let result: any = await saveLanguageApi('zh')
        

        if (result.code = 200) {
            locale.value = zhCn
            localeI18n.value = 'zh'

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

    if (lang.data.language == 'zh' || !lang.data) {

        let result: any = await saveLanguageApi('en')

        if (result.code = 200) {
            locale.value = en
            localeI18n.value = 'en'

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
}


onMounted(function () {
    // 获取全局语言
    getLocale()
})

</script>

<template>
<el-config-provider :locale="locale">

    <!-- 切换语言 -->
    <div class="changeLang" @click="changeLang"></div>

    <div class="login-container">
        <div class="login-box">
    
            <h2>{{ t('login.title') }}</h2>
            <p>{{ t('login.msg') }}</p>
    
            <el-form
                status-icon
                ref="ruleFormRef"
                :rules="rules"
                :model="formData"
                :label-position="labelPosition"
            >

                <!-- 手机号 -->
                <el-form-item :label="t('login.mobile')" prop="mobile">
                    <el-input 
                        :placeholder="t('login.placeMobile')"
                        v-model="formData.mobile" 
                    />
                </el-form-item>

                <!-- 密码 -->
                <el-form-item :label="t('login.password')" prop="password">
                    <el-input 
                        :placeholder="t('login.placePass')"
                        v-model="formData.password" 
                        autocomplete="off"
                        type="password"
                    />
                </el-form-item>

                <!-- 登录注册切换 -->
                <a class="question" @click="loginSign" v-if="loginSignCheck == 'login'"
                >{{ t('login.question_login') }}</a>
                <a class="question" @click="loginSign" v-if="loginSignCheck == 'sign'" 
                >{{ t('login.question_sign') }}</a>

                <!-- 按钮 -->
                <el-form-item>
                    <el-button 
                        class="submit" type="primary" @click="submitForm(ruleFormRef)" 
                        v-if="loginSignCheck == 'login'" 
                    >
                        {{ t('login.loginBtn') }}
                    </el-button>
                    <el-button 
                        class="submit" type="primary" @click="submitForm(ruleFormRef)" 
                        v-if="loginSignCheck == 'sign'" 
                    >
                        {{ t('login.signBtn') }}
                    </el-button>
                </el-form-item>

            </el-form>

        </div>
    </div>

</el-config-provider>
</template>

<style lang="scss" > 
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    /* 所有边框为0 */
    border: 0;
    outline: none;
    user-select: none;
    text-decoration: none;
    font-family: 'Varela Round', sans-serif;
}


html {
    font-size: 16px;
}

.login-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('@/assets/images/login/wave.png');
    background-size: cover;
    animation: move 10s linear alternate infinite;
}

@keyframes move {
    50% {
        background-position: 50%;
    }
}

.login-box {
    /* 所有子类盒子宽度继承：400-40-40=320 */
    /* 高度为内容大小 */
    width: 400px;
    height: min-content;
    padding: 40px;
    background-color: #fff;
    text-align: center;
    border-radius: 16px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
}

.login-box h2 {
    color: #000;
    font-size: 2.2rem;
}

.login-box p {
    font-size: 1.2rem;
    color: #404040;
    margin-top: 4px;
}

.el-form {
    /* 宽度继承父类 320px */
    text-align: left;
    margin-top: 30px;
}

.el-form-item {
    margin: 18px 0;
} 


.el-form-item .el-form-item__label {
    font-size: 16px;
    color: #101010;
}

.el-form-item .el-input {
    height: 35px;
}

.question {
    color: #3784ff;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
}
.question:hover {
    color: #124ce7;
}

.submit {
    width: 100%;
    height: 46px;
    font-size: 18px;
    color: #fff;
    border-radius: 8px;
    margin-top: 10px;
    background: linear-gradient(45deg,#124ce7,#3784ff);
    cursor: pointer;
}

.changeLang {
    position: absolute;
    width: 60px;
    height: 60px;
    top: 0px;
    right: 0px;
    background: url('@/assets/images/login/changeLang.png') no-repeat;
    background-size: cover;
    cursor: pointer;
}

</style>