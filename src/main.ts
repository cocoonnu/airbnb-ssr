import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import './style.css'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 全局生效 ElementPlus - Message
import { ElMessage } from 'element-plus'
app.config.globalProperties.$message = ElMessage


app.use(router)
app.use(ElementPlus)
app.mount('#app')
