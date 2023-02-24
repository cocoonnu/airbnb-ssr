<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { reactive, ref } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { fetchLanguageApi, saveLanguageApi } from '@/api/index'
import { ElMessage } from 'element-plus'

// 全局语言
const { t, locale: localeI18n } = useI18n()

// 首次加载语言包 locale: el 语言包  localeI18n: 全局语言包
const locale = ref(zhCn)
async function getLocale() {
    let result: any = await fetchLanguageApi()

    if (result.code == 200 && result.data.language == 'en') {
        locale.value = en
        localeI18n.value = 'en'
    }
}
getLocale()


// 表单数据
const formLabelAlign = reactive({
    mobile: '',
    password: '',
})

// label 位置
const labelPosition = ref('top')


// 表单登录按钮
function submitForm() {

}


// 改变语言
const changeLang = async function () {
    let lang: any = await fetchLanguageApi()
    console.log(lang);
    

    
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

    if (lang.data.language == 'zh') {
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

</script>

<template>
<el-config-provider :locale="locale">

    <div class="changeLang" @click="changeLang"></div>

    <div class="login-container">
        <div class="login-box">
    
            <h2>{{ t('login.title') }}</h2>
            <p>{{ t('login.msg') }}</p>
    
            <el-form
                :model="formLabelAlign"
                :label-position="labelPosition"
            >
                <el-form-item :label="t('login.mobile')">
                    <el-input 
                        :placeholder="t('login.placeMobile')"
                        v-model="formLabelAlign.mobile" 
                    />
                </el-form-item>

                <el-form-item :label="t('login.password')">
                    <el-input 
                        :placeholder="t('login.placePass')"
                        v-model="formLabelAlign.password" 
                    />
                </el-form-item>

                <a class="forgot">{{ t('login.question') }}</a>

                <el-form-item>
                    <el-button class="submit" type="primary" @click="submitForm" >
                        {{ t('login.loginBtn') }}
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

.forgot {
    color: #3784ff;
    font-size: 16px;
    cursor: pointer;
}
.forgot:hover {
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