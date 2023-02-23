import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 路由
import './style.css'
import router from './router'
app.use(router)


// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)


// 全局生效 ElementPlus - Message
import { ElMessage } from 'element-plus'
app.config.globalProperties.$message = ElMessage


// 语言配置
import i18n from '@/language/i18n'
app.use(i18n)

app.mount('#app')
